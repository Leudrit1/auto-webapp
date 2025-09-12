import type { Express } from "express";
import { createServer, type Server } from "http";
import { setupAuth } from "./auth";
import { storage } from "./storage";
import { insertCarSchema, insertContactMessageSchema, insertSellCarRequestSchema } from "@shared/schema";

export function registerRoutes(app: Express): Server {
  setupAuth(app);

  // Car routes
  app.get("/api/cars", async (req, res) => {
    try {
      const { brand, maxPrice, minYear, maxKm } = req.query;
      const cars = await storage.getCars({
        brand: brand as string,
        maxPrice: maxPrice ? parseInt(maxPrice as string) : undefined,
        minYear: minYear ? parseInt(minYear as string) : undefined,
        maxKm: maxKm ? parseInt(maxKm as string) : undefined,
      });
      res.json(cars);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch cars" });
    }
  });

  app.get("/api/cars/:id", async (req, res) => {
    try {
      const car = await storage.getCarById(req.params.id);
      if (!car) {
        return res.status(404).json({ message: "Car not found" });
      }
      res.json(car);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch car" });
    }
  });

  app.post("/api/cars", async (req, res) => {
    if (!req.isAuthenticated() || !req.user?.isAdmin) {
      return res.status(403).json({ message: "Admin access required" });
    }

    try {
      const carData = insertCarSchema.parse(req.body);
      const car = await storage.createCar(carData);
      res.status(201).json(car);
    } catch (error) {
      res.status(400).json({ message: "Invalid car data" });
    }
  });

  app.put("/api/cars/:id", async (req, res) => {
    if (!req.isAuthenticated() || !req.user?.isAdmin) {
      return res.status(403).json({ message: "Admin access required" });
    }

    try {
      const carData = insertCarSchema.parse(req.body);
      const car = await storage.updateCar(req.params.id, carData);
      if (!car) {
        return res.status(404).json({ message: "Car not found" });
      }
      res.json(car);
    } catch (error) {
      res.status(400).json({ message: "Invalid car data" });
    }
  });

  app.delete("/api/cars/:id", async (req, res) => {
    if (!req.isAuthenticated() || !req.user?.isAdmin) {
      return res.status(403).json({ message: "Admin access required" });
    }

    try {
      const success = await storage.deleteCar(req.params.id);
      if (!success) {
        return res.status(404).json({ message: "Car not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete car" });
    }
  });

  // Contact message routes
  app.post("/api/contact", async (req, res) => {
    try {
      const messageData = insertContactMessageSchema.parse(req.body);
      const message = await storage.createContactMessage(messageData);
      res.status(201).json(message);
    } catch (error) {
      res.status(400).json({ message: "Invalid contact data" });
    }
  });

  app.get("/api/contact", async (req, res) => {
    if (!req.isAuthenticated() || !req.user?.isAdmin) {
      return res.status(403).json({ message: "Admin access required" });
    }

    try {
      const messages = await storage.getContactMessages();
      res.json(messages);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch contact messages" });
    }
  });

  // Sell car request routes
  app.post("/api/sell-car", async (req, res) => {
    try {
      const requestData = insertSellCarRequestSchema.parse(req.body);
      const request = await storage.createSellCarRequest(requestData);
      res.status(201).json(request);
    } catch (error) {
      res.status(400).json({ message: "Invalid sell car data" });
    }
  });

  app.get("/api/sell-car", async (req, res) => {
    if (!req.isAuthenticated() || !req.user?.isAdmin) {
      return res.status(403).json({ message: "Admin access required" });
    }

    try {
      const requests = await storage.getSellCarRequests();
      res.json(requests);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch sell car requests" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
