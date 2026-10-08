
# Angular Product Catalog

A responsive product catalog built with Angular 22 as part of a technical assessment.

The application retrieves product information from the DummyJSON REST API and demonstrates component-based architecture, HTTP integration, reactive state management, client-side routing, and unit testing.

## Features

- Product catalog with images, titles, prices, and ratings
- Product search with debounce
- Product detail pages using dynamic routes
- Loading and error states
- Retry functionality for failed requests
- Responsive product grid
- Unit tests using Vitest

## Tech Stack

- Angular 22
- TypeScript
- SCSS
- Angular Signals
- Angular Router
- HttpClient
- RxJS
- Vitest

## Requirements

- Node.js and npm
- Angular CLI (optional; commands can run through npm scripts)

## Getting Started

From the repository root:

```bash
cd angular_app
npm install
npm start
```

Open http://localhost:4200/ in your browser.

## Production Build

```bash
npm run build
```

The compiled application is generated in the `dist/` directory.

## Running Tests

```bash
npm test -- --watch=false
```

The test suite covers application initialization, product components, and service configuration.

## Project Structure

```text
src/app/
├── components/
│   └── product-card/
├── models/
│   └── product.ts
├── pages/
│   ├── products/
│   └── product-detail/
├── services/
│   └── product.ts
├── app.config.ts
├── app.routes.ts
└── app.ts
```

## API Integration

The application uses the public DummyJSON API:

https://dummyjson.com

Main endpoints:

- `GET /products?limit=20&skip=0` — retrieve products
- `GET /products/:id` — retrieve product details
- `GET /products/search?q=...` — search products

HTTP requests are centralized in `ProductService`, keeping API access separate from presentation components.

## Technical Decisions

### Standalone Components

The application uses Angular standalone components to keep the architecture modular and avoid unnecessary NgModules.

### Angular Signals

Signals manage local UI state, including products, loading indicators, and error messages.

### Reactive Search

Product search uses debounce to reduce unnecessary HTTP requests while the user types.

### Routing

Angular Router handles navigation between the product catalog and individual product detail pages.

### Error Handling

API failures are represented through explicit error states, with retry actions that allow users to request the data again.

### Component Reusability

The product card is implemented as a reusable component that receives product data through an input.

## Flutter and Angular

This repository contains two implementations of a product catalog using different frameworks.

Both applications share similar architectural principles:

- Typed product models
- Dedicated API access layers
- Explicit asynchronous loading and error states
- Product listing and detail views
- Automated testing

The Flutter implementation additionally includes shopping cart functionality.

## Verification

The Angular application was validated with:

```bash
npx ng test --watch=false
ng build
```

Both commands completed successfully during development.
