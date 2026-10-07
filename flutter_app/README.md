# Flutter Product Catalog

Flutter implementation of the Grupo Mariposa technical assessment.

The application consumes the DummyJSON Products API and provides product listing, search, product details, and a global shopping cart. Riverpod is used for application state management, while HTTP access is isolated behind a repository.

## Features

- Product catalog with image, title, price, and rating
- Product search with debounce
- Loading, error, retry, and empty states
- Product detail loaded by product ID
- Global shopping cart
- Add and remove products
- Increase and decrease product quantity
- Dynamic cart total and item count
- Reusable cart action across screens
- Unit and widget tests

## Architecture

The project separates responsibilities into the following layers:

```text
lib/
├── models/
│   ├── product.dart
│   └── cart_item.dart
├── providers/
│   ├── cart_provider.dart
│   ├── product_provider.dart
│   └── search_provider.dart
├── repositories/
│   └── product_repository.dart
├── screens/
│   ├── cart_screen.dart
│   ├── product_detail_screen.dart
│   └── product_screen.dart
├── widgets/
│   └── cart_action.dart
└── main.dart
```

### Models

`Product` and `CartItem` are immutable models.

`Product.fromJson` was implemented manually because the model is small and the mapping is straightforward. This keeps the assessment simple and avoids introducing code generation dependencies that would provide little benefit for the current scope.

### Repository

`ProductRepository` is responsible for communication with the DummyJSON API.

HTTP calls are kept outside the UI layer, which makes responsibilities clearer and allows the repository/client to be replaced or mocked during testing.

Main endpoints used:

```text
GET /products?limit=20&skip=0
GET /products/search?q={query}
GET /products/{id}
```

### State Management

Riverpod is used for business and asynchronous state.

The UI watches providers to render state and reads notifiers from user interaction callbacks.

The product detail uses a parameterized provider so that the screen receives only a product ID and the corresponding product is loaded through the repository.

The cart state is immutable. Quantity changes create updated state instead of mutating the existing collection.

### Search

Search requests are debounced before calling the API. This prevents sending a request for every keystroke while the user is typing.

### Cart

The cart supports:

- Adding products
- Removing products
- Increasing quantity
- Decreasing quantity
- Clearing the cart
- Calculating the total
- Displaying the total item count

`CartAction` is a reusable widget responsible for displaying the cart icon and current item count across product screens.

## Testing

The project includes unit tests for model and cart behavior, together with a widget test for UI interaction.

Run all tests with:

```bash
flutter test
```

Run static analysis with:

```bash
flutter analyze
```

## Running the Project

Install dependencies:

```bash
flutter pub get
```

Run the application:

```bash
flutter run
```

For Chrome:

```bash
flutter run -d chrome
```

## Technical Decisions

The implementation intentionally favors a small and explicit architecture over unnecessary abstraction.

Business state is handled with Riverpod, network communication is isolated in the repository, and widgets focus on presentation and user interaction.

The goal is to keep the code easy to understand, test, maintain, and extend.

## Flutter and Angular Parallels

The two implementations follow similar architectural ideas even though the frameworks use different tools.

- Flutter models correspond to TypeScript interfaces or models.
- `ProductRepository` has a similar responsibility to an Angular service that communicates with an API.
- Riverpod providers manage shared and asynchronous state, while Angular can use services and RxJS for similar responsibilities.
- Flutter widgets and Angular components both focus primarily on presentation and user interaction.
- Separating API access from UI code improves testability and maintainability in both implementations.