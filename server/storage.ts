import { type User, type InsertUser, type Car, type InsertCar, type ContactMessage, type InsertContactMessage, type SellCarRequest, type InsertSellCarRequest } from "@shared/schema";
import { randomUUID } from "crypto";
import session from "express-session";
import createMemoryStore from "memorystore";
import { scrypt, randomBytes } from "crypto";
import { promisify } from "util";

const MemoryStore = createMemoryStore(session);
const scryptAsync = promisify(scrypt);

async function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const buf = (await scryptAsync(password, salt, 64)) as Buffer;
  return `${buf.toString("hex")}.${salt}`;
}

interface CarFilters {
  brand?: string;
  maxPrice?: number;
  minYear?: number;
  maxKm?: number;
}

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getCars(filters?: CarFilters): Promise<Car[]>;
  getCarById(id: string): Promise<Car | undefined>;
  createCar(car: InsertCar): Promise<Car>;
  updateCar(id: string, car: InsertCar): Promise<Car | undefined>;
  deleteCar(id: string): Promise<boolean>;
  
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
  getContactMessages(): Promise<ContactMessage[]>;
  
  createSellCarRequest(request: InsertSellCarRequest): Promise<SellCarRequest>;
  getSellCarRequests(): Promise<SellCarRequest[]>;
  
  sessionStore: session.Store;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private cars: Map<string, Car>;
  private contactMessages: Map<string, ContactMessage>;
  private sellCarRequests: Map<string, SellCarRequest>;
  public sessionStore: session.Store;

  constructor() {
    this.users = new Map();
    this.cars = new Map();
    this.contactMessages = new Map();
    this.sellCarRequests = new Map();
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000,
    });

    // Initialize data
    this.initialize();
  }

  private async initialize() {
    // Create default admin user with proper scrypt hash
    await this.createDefaultAdminUser();

    // Add sample cars
    this.addSampleCars();
  }

  private addSampleCars() {
    const sampleCars: (InsertCar & { id: string, createdAt: Date })[] = [
      {
        id: randomUUID(),
        brand: "BMW",
        model: "530i xDrive",
        year: 2022,
        price: 89500,
        mileage: 45000,
        transmission: "Automatik",
        fuel: "Benzin",
        imageUrl: "https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=500",
        description: "Luxuriöse BMW Limousine in ausgezeichnetem Zustand",
        createdAt: new Date(),
      },
      {
        id: randomUUID(),
        brand: "Mercedes-Benz",
        model: "GLC 300",
        year: 2021,
        price: 67900,
        mileage: 32000,
        transmission: "Automatik",
        fuel: "Benzin",
        imageUrl: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=500",
        description: "Eleganter Mercedes SUV mit Premium-Ausstattung",
        createdAt: new Date(),
      },
      {
        id: randomUUID(),
        brand: "Audi",
        model: "A4 Avant",
        year: 2023,
        price: 52900,
        mileage: 12000,
        transmission: "Automatik",
        fuel: "Diesel",
        imageUrl: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=500",
        description: "Sportlicher Audi Kombi mit modernster Technologie",
        createdAt: new Date(),
      },
      {
        id: randomUUID(),
        brand: "Porsche",
        model: "911 Carrera",
        year: 2022,
        price: 145000,
        mileage: 8500,
        transmission: "Manuell",
        fuel: "Benzin",
        imageUrl: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=500",
        description: "Legendärer Porsche Sportwagen in perfektem Zustand",
        createdAt: new Date(),
      },
    ];

    sampleCars.forEach(car => {
      const carWithProperTypes: Car = {
        ...car,
        description: car.description || null
      };
      this.cars.set(car.id, carWithProperTypes);
    });
  }

  private async createDefaultAdminUser() {
    const adminId = randomUUID();
    const hashedPassword = await hashPassword("admin123");
    const adminUser: User = {
      id: adminId,
      username: "admin",
      password: hashedPassword,
      isAdmin: true,
    };
    this.users.set(adminId, adminUser);
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id, isAdmin: false };
    this.users.set(id, user);
    return user;
  }

  async getCars(filters?: CarFilters): Promise<Car[]> {
    let cars = Array.from(this.cars.values());

    if (filters) {
      if (filters.brand) {
        cars = cars.filter(car => car.brand.toLowerCase().includes(filters.brand!.toLowerCase()));
      }
      if (filters.maxPrice) {
        cars = cars.filter(car => car.price <= filters.maxPrice!);
      }
      if (filters.minYear) {
        cars = cars.filter(car => car.year >= filters.minYear!);
      }
      if (filters.maxKm) {
        cars = cars.filter(car => car.mileage <= filters.maxKm!);
      }
    }

    return cars.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async getCarById(id: string): Promise<Car | undefined> {
    return this.cars.get(id);
  }

  async createCar(insertCar: InsertCar): Promise<Car> {
    const id = randomUUID();
    const car: Car = { ...insertCar, id, createdAt: new Date(), description: insertCar.description || null };
    this.cars.set(id, car);
    return car;
  }

  async updateCar(id: string, insertCar: InsertCar): Promise<Car | undefined> {
    const existingCar = this.cars.get(id);
    if (!existingCar) return undefined;

    const updatedCar: Car = { ...insertCar, id, createdAt: existingCar.createdAt, description: insertCar.description || null };
    this.cars.set(id, updatedCar);
    return updatedCar;
  }

  async deleteCar(id: string): Promise<boolean> {
    return this.cars.delete(id);
  }

  async createContactMessage(insertMessage: InsertContactMessage): Promise<ContactMessage> {
    const id = randomUUID();
    const message: ContactMessage = { ...insertMessage, id, createdAt: new Date(), phone: insertMessage.phone || null };
    this.contactMessages.set(id, message);
    return message;
  }

  async getContactMessages(): Promise<ContactMessage[]> {
    return Array.from(this.contactMessages.values())
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async createSellCarRequest(insertRequest: InsertSellCarRequest): Promise<SellCarRequest> {
    const id = randomUUID();
    const request: SellCarRequest = { ...insertRequest, id, createdAt: new Date(), phone: insertRequest.phone || null, description: insertRequest.description || null, desiredPrice: insertRequest.desiredPrice || null };
    this.sellCarRequests.set(id, request);
    return request;
  }

  async getSellCarRequests(): Promise<SellCarRequest[]> {
    return Array.from(this.sellCarRequests.values())
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }
}

export const storage = new MemStorage();
