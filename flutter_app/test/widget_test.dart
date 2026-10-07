import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_test/flutter_test.dart';

import 'package:flutter_app/models/product.dart';
import 'package:flutter_app/providers/cart_provider.dart';
import 'package:flutter_app/screens/cart_screen.dart';

void main() {
  testWidgets('Cart quantity increases when plus button is tapped', (
    WidgetTester tester,
  ) async {
    final container = ProviderContainer();

    addTearDown(container.dispose);

    const product = Product(
      id: 1,
      title: 'Test Product',
      description: 'Test description',
      price: 25.00,
      rating: 4.5,
      thumbnail: '',
    );

    container.read(cartProvider.notifier).add(product);

    await tester.pumpWidget(
      UncontrolledProviderScope(
        container: container,
        child: const MaterialApp(home: CartScreen()),
      ),
    );

    expect(find.text('Test Product'), findsOneWidget);
    expect(find.text('1'), findsOneWidget);
    expect(find.text('\$25.00'), findsNWidgets(2));

    await tester.tap(find.byIcon(Icons.add));
    await tester.pump();

    expect(find.text('2'), findsOneWidget);
    expect(find.text('\$50.00'), findsOneWidget);
  });
}
