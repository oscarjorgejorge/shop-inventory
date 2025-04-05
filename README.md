# Shop Inventory API

A RESTful API for managing shop inventory, built with NestJS and Prisma.

## Features

- Catalog management
- Product management with soft delete capability
- Swagger API documentation
- Database ORM with Prisma
- Standardized error handling

## Installation

1. Clone the repository

2. Install dependencies:

   ```
   npm install
   ```

3. Create a `.env` file in the root directory:

   ```
   PORT=3000
   ```

4. Set up the database

   ```bash
   # Create and apply migrations
   npx prisma migrate dev --name init

   # Generate Prisma client
   npx prisma generate
   ```

   Note: Skip `npx prisma init` as the prisma folder already exists in the project.

## Prisma Studio

This will open Prisma Studio in your browser:

```bash
npx prisma studio
```

This opens a visual database browser at http://localhost:5555

### Swagger UI

The API is documented using Swagger. To access the Swagger UI:

1. Start the application:

   ```bash
   npm run start:dev
   ```

2. Open your browser and navigate to:
   http://localhost:3000/api
