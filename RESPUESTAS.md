
# Respuestas — Prueba técnica Flutter + Angular

## Parte 1 — Preguntas conceptuales

### Dart y Flutter

**1. ¿Qué diferencia hay entre `final` y `const` en Dart? ¿Por qué importa usar `const` en constructores de widgets?**

`final` permite asignar un valor una sola vez, pero ese valor puede calcularse durante la ejecución. `const` requiere un valor constante conocido en tiempo de compilación. En Flutter, usar constructores `const` cuando corresponde permite reutilizar instancias de widgets y evitar trabajo innecesario durante las reconstrucciones.

```dart
final currentTime = DateTime.now();
const padding = 16.0;
const Text('Products');
```

**2. Explica el null safety de Dart. ¿Cuándo usarías `?`, `!`, `??` y `late`? ¿Por qué abusar de `!` es una mala práctica?**

El null safety permite distinguir entre variables que pueden contener `null` y variables que no. Utilizo `?` para declarar valores anulables, `??` para proporcionar un valor alternativo, `!` cuando tengo certeza de que el valor no es nulo y `late` para inicializar una variable posteriormente. Abusar de `!` es peligroso porque puede provocar errores en tiempo de ejecución si el valor resulta ser `null`.

```dart
String? name;
final displayName = name ?? 'Guest';
```

**3. ¿Cuál es la diferencia entre `StatelessWidget` y `StatefulWidget`? ¿Qué aportan `ConsumerWidget` y `ConsumerStatefulWidget`?**

`StatelessWidget` representa una interfaz que no administra estado mutable local. `StatefulWidget` permite mantener estado mediante un objeto `State` y reconstruir la interfaz cuando cambia. `ConsumerWidget` agrega acceso a los providers de Riverpod mediante `WidgetRef`, mientras que `ConsumerStatefulWidget` combina ese acceso con el ciclo de vida de un widget con estado.

**4. ¿Qué es un `Future` y qué es un `Stream`? Da un caso de uso real de cada uno.**

Un `Future` representa el resultado de una operación asíncrona que termina una vez, como solicitar los detalles de un producto a una API. Un `Stream` representa una secuencia de eventos que pueden llegar a lo largo del tiempo, como cambios de conectividad o actualizaciones continuas de información.

```dart
Future<Product> getProduct(int id);
Stream<bool> connectivityChanges();
```

**5. ¿Por qué es preferible extraer un widget a una clase propia en lugar de un método `_buildAlgo()` que retorna un `Widget`?**

Extraer un widget a una clase permite definir responsabilidades claras, reutilizarlo y probarlo de manera independiente. También facilita el uso de constructores `const` y permite que Flutter trate ese elemento como un widget independiente dentro del árbol. Un método `_buildAlgo()` puede ser útil para fragmentos pequeños, pero no ofrece el mismo nivel de separación y reutilización.

### Riverpod

**6. ¿Qué problema resuelve Riverpod frente a `setState` o frente a Provider (el paquete)?**

Riverpod permite separar el estado y la lógica de negocio de los widgets, evitando depender de `setState` para compartir información entre pantallas. Frente al paquete Provider, ofrece una gestión de dependencias más flexible, sin depender de `BuildContext` para acceder a ellas. En nuestro proyecto lo usamos para manejar el catálogo, las búsquedas y el carrito de compras.

**7. Explica la diferencia entre `ref.watch`, `ref.read` y `ref.listen`. ¿Dónde es incorrecto usar `ref.read`?**

`ref.watch` observa un provider y actualiza sus dependientes cuando cambia; `ref.read` obtiene su valor actual sin suscribirse; y `ref.listen` permite reaccionar a cambios, por ejemplo mostrando un mensaje. No conviene usar `ref.read` dentro de `build()` para mostrar datos que deben actualizarse automáticamente, porque el widget no quedará suscrito a esos cambios.

**8. ¿Cuándo usarías un `Provider`, un `FutureProvider`, un `Notifier` y un `AsyncNotifier`?**

Usaría `Provider` para dependencias como un repositorio HTTP; `FutureProvider` para consultas asíncronas, como cargar productos; `Notifier` para estados modificables sin operaciones asíncronas, como nuestro carrito; y `AsyncNotifier` cuando necesito combinar operaciones asíncronas con métodos que modifican el estado, por ejemplo cargar y actualizar un perfil desde una API.

**9. ¿Qué hace el modificador `autoDispose` y qué problema evita? ¿Y `family`?**

`autoDispose` permite liberar el estado de un provider cuando deja de tener consumidores, evitando conservar recursos o datos innecesarios. `family` permite crear instancias de un provider según un parámetro. En nuestro proyecto utilizamos `FutureProvider.family` para consultar los detalles de cada producto mediante su ID.

**10. ¿Cómo manejas los estados de carga, error y datos con `AsyncValue`? Escribe un ejemplo con `.when` o pattern matching.**

`AsyncValue` representa los estados de carga, error y datos de una operación asíncrona. Riverpod permite utilizar `.when()` para mostrar una interfaz distinta según el resultado. Por ejemplo:

```dart
final products = ref.watch(productsProvider);

return products.when(
  loading: () => const CircularProgressIndicator(),
  error: (error, stack) => Text('Error: $error'),
  data: (items) => Text('${items.length} productos'),
);
```

**11. ¿Cómo sobrescribirías un provider en un test para inyectar un repositorio falso?**

Utilizaría `ProviderContainer` con `overrides` y `overrideWith` para sustituir el repositorio real por uno falso durante la prueba. Así puedo controlar las respuestas sin depender de internet ni de la API externa.

```dart
final container = ProviderContainer(
  overrides: [
    productRepositoryProvider.overrideWith(
      (ref) => fakeRepository,
    ),
  ],
);
```

Esto permite probar los providers de forma aislada y reproducible.

### Angular

**12. ¿Qué diferencia hay entre un componente standalone y uno declarado en un `NgModule`?**

Un componente standalone declara directamente sus dependencias mediante `imports`, sin necesidad de pertenecer a un `NgModule`. Un componente tradicional debe declararse dentro de un módulo. En nuestro proyecto usamos componentes standalone, como `Products`, `ProductDetail` y `ProductCard`, porque permiten organizar las dependencias de forma más directa.

**13. Explica la diferencia entre un Observable (RxJS) y un Signal. ¿Cuándo preferirías cada uno?**

Un `Observable` representa un flujo de valores a lo largo del tiempo y permite aplicar operadores como `debounceTime` y `switchMap`. Un `Signal` mantiene un valor actual y permite que Angular reaccione cuando cambia. En nuestra aplicación usamos Observables para las peticiones HTTP y la búsqueda, mientras que los Signals almacenan productos y estados de carga o error.

**14. ¿Para qué sirven `@Input()` / `input()` y `@Output()` / `output()`? ¿Cómo se comunican dos componentes hermanos?**

`@Input()` e `input()` permiten que un componente reciba datos de su padre; `@Output()` y `output()` permiten emitir eventos hacia él. En nuestro proyecto, `ProductCard` recibe un producto mediante `input.required<Product>()`. Dos componentes hermanos pueden comunicarse a través de su componente padre o mediante un servicio compartido.

**15. ¿Qué es la inyección de dependencias en Angular y para qué sirve `providedIn: 'root'`?**

La inyección de dependencias permite que Angular proporcione servicios a los componentes sin que estos tengan que crearlos manualmente. `providedIn: 'root'` registra un servicio en el inyector principal de la aplicación, normalmente como una instancia compartida. En nuestro proyecto usamos `inject(ProductService)` para acceder a las operaciones de la API y `inject(CartService)` para administrar el carrito.

### Angular — Suscripciones

**16. ¿Por qué hay que preocuparse por las suscripciones a Observables? Menciona dos formas de evitar fugas de memoria.**

Las suscripciones a Observables que permanecen activas pueden consumir memoria y ejecutar operaciones después de que un componente haya sido destruido. Para evitarlo, podemos utilizar `takeUntilDestroyed()` para cancelar automáticamente la suscripción o el `async` pipe en el template, que administra su ciclo de vida. En nuestro catálogo Angular utilizamos `takeUntilDestroyed()` en la búsqueda de productos.

### Código limpio y buenas prácticas

**17. Explica con tus palabras el principio de responsabilidad única (SRP) y cómo lo aplicarías en una app Flutter.**

El principio de responsabilidad única establece que cada clase debe tener una responsabilidad principal y una razón clara para cambiar. En nuestra aplicación Flutter, `ProductRepository` se encarga de consultar la API, los providers administran el estado y los widgets presentan la información. Esta separación facilita mantener, modificar y probar el código.

**18. ¿Por qué separar la app en capas (presentación, dominio, datos)? ¿Qué va en cada una?**

Separar la aplicación en capas permite organizar responsabilidades y reducir el acoplamiento. La presentación contiene pantallas, widgets y estados de interfaz; el dominio define modelos y reglas de negocio; y la capa de datos se encarga de las consultas HTTP y repositorios. Esto facilita cambiar una fuente de datos sin reescribir toda la interfaz.

**19. ¿Qué diferencia hay entre una prueba unitaria, una de widget y una de integración?**

Una prueba unitaria verifica una función o clase de forma aislada, como las operaciones del carrito. Una prueba de widget comprueba el comportamiento visual e interactivo de un componente Flutter. Una prueba de integración valida cómo trabajan juntas varias partes de la aplicación, por ejemplo, buscar un producto, abrir sus detalles y agregarlo al carrito.

**20. Menciona tres convenciones que sigues al hacer commits y abrir un pull request.**

Primero, utilizo mensajes de commit descriptivos, como `feat: complete Flutter product catalog`. Segundo, procuro que cada commit agrupe cambios relacionados y verifico las pruebas antes de subirlos. Tercero, al abrir un pull request, describo qué se modificó, cómo se probó y cualquier limitación conocida para facilitar la revisión.

## Parte 4 — Code Review

### Fragmento A — Flutter / Riverpod

### Problemas identificados y correcciones

**1. Petición HTTP dentro de `build()`.** El código ejecuta `http.get()` dentro del método `build()`, que puede llamarse muchas veces. Esto puede generar peticiones repetidas, afectar el rendimiento y provocar comportamientos inesperados. La consulta debe realizarse mediante un repositorio y un `FutureProvider`, fuera de la construcción de la interfaz.

**2. Uso de `setState()` para manejar datos de negocio.** La pantalla almacena productos y el estado de carga directamente en el widget. Esto mezcla la presentación con la lógica de obtención de datos. Utilizaría Riverpod para manejar los estados de carga, error y datos, dejando al widget la responsabilidad de mostrarlos.

**3. Estado del carrito mal definido.** El fragmento utiliza `StateProvider<List<Map>>`, sin tipos específicos para los productos ni sus cantidades. Además, modifica directamente la lista mediante `.add()`, lo que puede impedir que Riverpod detecte correctamente el cambio. Lo reemplazaría por un `NotifierProvider` con modelos tipados e inmutables, creando una lista nueva en cada actualización.

**4. Uso incorrecto de `ref.read()` para mostrar el carrito.** `ref.read()` obtiene el valor actual, pero no suscribe el widget a futuros cambios. Por eso, el contador del carrito podría no actualizarse al agregar productos. En `build()` utilizaría `ref.watch()` para que la interfaz se reconstruya cuando cambie el estado.

**5. Falta de manejo de errores y liberación de recursos.** El código no comprueba el resultado HTTP ni maneja fallos de red. Tampoco administra explícitamente el ciclo de vida del cliente HTTP. Separaría estas responsabilidades en un repositorio inyectado, con manejo de errores y liberación del cliente al destruirse su proveedor.

**6. Tipado débil y responsabilidades mezcladas.** El uso de `List`, `Map` y datos dinámicos dificulta detectar errores y mantener el código. Definiría modelos como `Product` y `CartItem`, y separaría repositorio, providers y widgets para facilitar las pruebas y el mantenimiento.

**7. Código de depuración y construcción poco eficiente.** El `print('agregado')` no aporta una funcionalidad real y debería eliminarse. También conviene utilizar widgets pequeños, constructores `const` cuando corresponda y `ListView.builder` para construir listas de productos de manera eficiente.

### Código corregido — Flutter / Riverpod

La solución separa las consultas HTTP, la gestión del carrito y la interfaz. Se utilizan modelos tipados, providers de Riverpod y actualizaciones inmutables.

**1. Modelo y repositorio**

```dart
import 'dart:convert';
import 'package:http/http.dart' as http;

class Product {
  final int id;
  final String title;
  final double price;

  const Product({
    required this.id,
    required this.title,
    required this.price,
  });

  factory Product.fromJson(Map<String, dynamic> json) {
    return Product(
      id: json['id'] as int,
      title: json['title'] as String,
      price: (json['price'] as num).toDouble(),
    );
  }
}

class ProductRepository {
  final http.Client client;

  ProductRepository(this.client);

  Future<List<Product>> getProducts() async {
    final response = await client.get(
      Uri.parse('https://dummyjson.com/products?limit=20&skip=0'),
    );

    if (response.statusCode != 200) {
      throw Exception('Error al cargar productos');
    }

    final body = jsonDecode(response.body) as Map<String, dynamic>;
    final products = body['products'] as List<dynamic>;

    return products
        .map((item) => Product.fromJson(item as Map<String, dynamic>))
        .toList();
  }
}
```

**2. Providers y estado del carrito**

```dart
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:http/http.dart' as http;

final httpClientProvider = Provider<http.Client>((ref) {
  final client = http.Client();
  ref.onDispose(client.close);
  return client;
});

final productRepositoryProvider = Provider<ProductRepository>((ref) {
  return ProductRepository(ref.watch(httpClientProvider));
});

final productsProvider = FutureProvider<List<Product>>((ref) {
  return ref.watch(productRepositoryProvider).getProducts();
});

class CartNotifier extends Notifier<List<Product>> {
  @override
  List<Product> build() => [];

  void add(Product product) {
    state = [...state, product];
  }
}

final cartProvider = NotifierProvider<CartNotifier, List<Product>>(
  CartNotifier.new,
);
```

**3. Pantalla corregida**

```dart
class ProductsScreen extends ConsumerWidget {
  const ProductsScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final productsAsync = ref.watch(productsProvider);
    final cart = ref.watch(cartProvider);

    return Scaffold(
      appBar: AppBar(
        title: Text('Productos (${cart.length})'),
      ),
      body: productsAsync.when(
        loading: () => const Center(
          child: CircularProgressIndicator(),
        ),
        error: (error, stackTrace) => Center(
          child: ElevatedButton(
            onPressed: () => ref.invalidate(productsProvider),
            child: const Text('Reintentar'),
          ),
        ),
        data: (products) => ListView.builder(
          itemCount: products.length,
          itemBuilder: (context, index) {
            final product = products[index];

            return ListTile(
              title: Text(product.title),
              subtitle: Text('\$${product.price}'),
              onTap: () {
                ref.read(cartProvider.notifier).add(product);
              },
            );
          },
        ),
      ),
    );
  }
}
```

Esta refactorización evita las peticiones HTTP dentro de `build()`, elimina el uso de `setState()` para datos de negocio y permite que Riverpod actualice automáticamente el contador del carrito. Además, incorpora modelos tipados, manejo de errores, reintento y separación de responsabilidades.

En una implementación completa, el carrito utilizaría un modelo `CartItem` con cantidades, como el desarrollado en la aplicación entregada.

### Fragmento B — Angular

#### Problemas identificados y correcciones

**1. Uso de `any` en los datos.** El componente declara `orders: any` y utiliza `r: any` en la respuesta HTTP. Esto elimina las ventajas del tipado de TypeScript y dificulta detectar errores. Definiría interfaces para representar los pedidos, productos y la respuesta de la API.

**2. Peticiones HTTP directamente desde el componente.** El componente inyecta `HttpClient` y realiza la consulta dentro de `ngOnInit()`. Esto mezcla responsabilidades de presentación y acceso a datos. Extraería la comunicación HTTP a un servicio `OrdersService` con `providedIn: 'root'`.

**3. Uso innecesario de `setInterval()`.** El código consulta la API cada cinco segundos sin que el enunciado exija actualizaciones automáticas. Esto genera tráfico innecesario y puede producir solicitudes simultáneas si alguna tarda demasiado. Para este panel utilizaría una consulta inicial y una acción explícita para actualizar los datos.

**4. Falta de limpieza del intervalo.** `setInterval()` continúa ejecutándose hasta que se cancela mediante `clearInterval()`. Como el fragmento no lo cancela en `ngOnDestroy()`, puede seguir generando peticiones después de destruir el componente.

**5. Suscripciones sin una estrategia clara de limpieza.** Cada ejecución del intervalo crea una nueva suscripción. Aunque las peticiones HTTP normales suelen completarse automáticamente, el diseño puede generar solicitudes pendientes y complicar el control del ciclo de vida. Utilizaría `takeUntilDestroyed()` cuando corresponda, o `toSignal()` para integrar un Observable con el estado del componente.

**6. Ausencia de estados de carga y error.** El componente no informa al usuario cuando está cargando ni cuando falla la consulta. Incorporaría estados explícitos de `loading`, `error` y `data`, además de un botón para reintentar.

**7. Acceso incorrecto a la estructura de la respuesta.** El código asigna `r.carts` a `orders`, pero no define el contrato de respuesta. La API devuelve un objeto con una propiedad `carts`, por lo que conviene representarlo mediante una interfaz y tipar también los elementos del arreglo.

**8. Falta de separación entre componente contenedor y presentacional.** El componente obtiene los datos y los muestra directamente. Separaría `OrdersPageComponent`, responsable de consultar y administrar el estado, de `OrderCardComponent`, responsable de recibir un pedido mediante `input()` y emitir acciones mediante `output()`.

**9. Plantilla con sintaxis antigua.** El fragmento utiliza `*ngFor`. Aunque sigue siendo válido, en una aplicación moderna de Angular utilizaría `@for` con `track` para identificar los elementos y optimizar las actualizaciones del DOM.

#### Código corregido — Angular

La solución separa el acceso a datos de la presentación, utiliza interfaces tipadas y elimina las peticiones periódicas innecesarias.

**1. Interfaces de datos — `order.model.ts`**

```typescript
export interface OrderProduct {
  id: number;
  title: string;
  quantity: number;
  price: number;
  total: number;
}

export interface Order {
  id: number;
  userId: number;
  products: OrderProduct[];
  total: number;
  totalProducts: number;
  totalQuantity: number;
}

export interface OrdersResponse {
  carts: Order[];
  total: number;
  skip: number;
  limit: number;
}
```

**2. Servicio HTTP — `orders.service.ts`**

```typescript
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OrdersResponse } from './order.model';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'https://dummyjson.com/carts';

  getOrders(): Observable<OrdersResponse> {
    return this.http.get<OrdersResponse>(this.apiUrl);
  }
}

**3. Componente contenedor — `orders-page.component.ts`**

```typescript
import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { OrdersService } from './orders.service';
import { Order } from './order.model';

@Component({
  selector: 'app-orders-page',
  standalone: true,
  template: `
    <h1>Panel de pedidos</h1>

    @if (loading()) {
      <p>Cargando pedidos...</p>
    } @else if (error()) {
      <p>{{ error() }}</p>
      <button (click)="loadOrders()">Reintentar</button>
    } @else {
      @for (order of orders(); track order.id) {
        <p>Pedido #{{ order.id }} — Total: {{ order.total }}</p>
      } @empty {
        <p>No hay pedidos disponibles.</p>
      }
    }
  `,
})
export class OrdersPageComponent implements OnInit {
  private readonly ordersService = inject(OrdersService);
  private readonly destroyRef = inject(DestroyRef);

  readonly orders = signal<Order[]>([]);
  readonly loading = signal(true);
  readonly error = signal<string | null>(null);

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.loading.set(true);
    this.error.set(null);

    this.ordersService
      .getOrders()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (response) => {
          this.orders.set(response.carts);
          this.loading.set(false);
        },
        error: () => {
          this.error.set('No se pudieron cargar los pedidos.');
          this.loading.set(false);
        },
      });
  }
}
```

**Justificación de la solución**

Esta implementación elimina las solicitudes HTTP periódicas y separa la comunicación con la API de la lógica de presentación. El servicio utiliza interfaces tipadas para evitar `any`, mientras que el componente administra los estados de carga, error y datos mediante Signals.

Además, `takeUntilDestroyed()` permite cancelar la suscripción cuando se destruye el componente, y el botón de reintento ofrece una forma de recuperar la información si ocurre un error. Para una aplicación más grande, la visualización de cada pedido podría extraerse a un componente `OrderCardComponent` reutilizable.