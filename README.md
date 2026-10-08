# Grupo Mariposa — Technical Assessment

Technical assessment developed with **Flutter, Riverpod, Angular, and TypeScript**.

## Project Structure

| Path | Description |
|---|---|
| `RESPUESTAS.md` | Part 1: Technical questions and Part 4: Code review |
| `flutter_app/` | Part 2: Flutter product catalog |
| `angular_app/` | Part 3: Angular orders dashboard |

## Part 1 — Technical Questions

Answers to 20 questions covering Dart, Flutter, Riverpod, Angular, architecture, and clean code.

See [RESPUESTAS.md](RESPUESTAS.md).

## Part 2 — Flutter + Riverpod

Product catalog using the DummyJSON API.

Features include product listing, debounced search, product details, loading and error states, and a local shopping cart with quantity management.

**Run locally:**

```bash
cd flutter_app
flutter pub get
flutter run
```

**Run tests:**

```bash
flutter analyze
flutter test
```

## Part 3 — Angular Orders Dashboard

Angular standalone application using TypeScript and the DummyJSON Carts API.

Features include order listing, filtering, order details, reusable components, typed HTTP services, and loading/error handling.

The application also includes a product catalog and shopping cart as additional functionality.

**Run locally:**

```bash
cd angular_app
npm install
npm start
```

Open `http://localhost:4200/orders` to access the orders dashboard.

**Run tests:**

```bash
npm run build
npx ng test --watch=false
```

## Part 4 — Code Review

Analysis of Flutter and Angular code snippets, including identified issues, explanations, and corrected implementations.

See [RESPUESTAS.md](RESPUESTAS.md).

## Architecture

The Flutter application uses Riverpod for state management and separates UI, business state, and data access.

The Angular application separates container and presentational components, uses typed services for API communication, and follows a reactive approach to UI updates.

Both applications emphasize separation of concerns, testability, and maintainability.

## Demo Data

The applications consume public sample data from [DummyJSON](https://dummyjson.com/).

Orders shown in the Angular dashboard are simulated records used for demonstration purposes. No real purchases or customer transactions are involved.
