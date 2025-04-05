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
   `npm install`

3. Set up the database
   `npx prisma init`
   `npx prisma migrate dev --name init`
   `npx prisma generate`

## Prisma Studio

This will open Prisma Studio in your browser
`npx prisma studio`

### Swagger UI

The API is documented using Swagger. To access the Swagger UI:

1. Start the application:
   `npm run start:dev`

2. Open your browser and navigate to:
   http://localhost:3000/api
