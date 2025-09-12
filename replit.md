# Overview

This is a car dealership web application called "RI automobile gmbh" built with React and Express. The application serves as a comprehensive platform for a Swiss car dealership, featuring a public-facing website where visitors can browse cars, contact the business, and submit car sale requests. It includes an admin panel for managing inventory and viewing customer inquiries.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture

The frontend is built with React and TypeScript, using Vite as the build tool and bundler. The application follows a component-based architecture with:

- **Routing**: Uses Wouter for client-side routing
- **State Management**: TanStack React Query for server state management and React Context for authentication
- **UI Framework**: shadcn/ui components built on top of Radix UI primitives
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **Form Handling**: React Hook Form with Zod for validation

The frontend is organized into sections:
- Pages (home, admin, auth, 404)
- Components (layout, sections, UI components)
- Hooks (authentication, mobile detection, toast notifications)
- Utilities (query client, protected routes)

## Backend Architecture

The backend uses Express.js with TypeScript and follows a RESTful API pattern:

- **Authentication**: Passport.js with local strategy using session-based authentication
- **Session Management**: Express sessions with configurable storage (memory store for development)
- **API Routes**: RESTful endpoints for cars, contact messages, sell car requests, and user management
- **Middleware**: Custom logging, error handling, and authentication middleware
- **Development Setup**: Vite integration for hot module replacement in development

## Data Storage

The application uses Drizzle ORM with PostgreSQL:

- **Database**: PostgreSQL with Neon Database (@neondatabase/serverless)
- **ORM**: Drizzle ORM for type-safe database operations
- **Schema**: Centralized schema definitions with Zod validation
- **Migrations**: Drizzle Kit for database migrations

Database entities include:
- Users (with admin roles)
- Cars (inventory management)
- Contact messages
- Sell car requests

## External Dependencies

### Core Framework Dependencies
- **React Ecosystem**: React 18+ with TypeScript, React DOM, TanStack React Query
- **Backend Framework**: Express.js with TypeScript support
- **Build Tools**: Vite with React plugin, esbuild for production builds

### UI and Styling
- **Component Library**: Radix UI primitives (@radix-ui/*)
- **Styling**: Tailwind CSS with PostCSS and Autoprefixer
- **Icons**: Lucide React icons
- **Fonts**: Google Fonts (Inter, custom fonts via CDN)

### Database and ORM
- **Database**: Neon Database (PostgreSQL-compatible)
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Validation**: Zod schema validation integrated with Drizzle

### Authentication and Session Management
- **Authentication**: Passport.js with local strategy
- **Session Storage**: Express session with connect-pg-simple for PostgreSQL storage
- **Password Hashing**: Node.js crypto module with scrypt

### Development and Deployment
- **Development**: Replit-specific plugins for error handling and cartographer
- **Process Management**: tsx for TypeScript execution
- **Type Checking**: TypeScript with strict configuration

### Utility Libraries
- **Date Handling**: date-fns for date manipulation
- **Class Management**: clsx and class-variance-authority for conditional classes
- **Form Handling**: React Hook Form with Hookform resolvers
- **Carousel**: Embla Carousel React for image slideshows