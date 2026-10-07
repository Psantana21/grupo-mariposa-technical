import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:flutter_app/models/product.dart';
import 'package:flutter_app/providers/cart_provider.dart';

void main() {
  test('Adding the same product twice increases its quantity', () {
    final container = ProviderContainer();

    addTearDown(container.dispose);

    const product = Product(
      id: 1,
      title: 'Test Product',
      description: 'Test description',
      price: 25.00,
      rating: 4.5,
      thumbnail: 'https://example.com/product.png',
    );

    container.read(cartProvider.notifier).add(product);
    container.read(cartProvider.notifier).add(product);

    final cart = container.read(cartProvider);

    expect(cart.length, 1);
    expect(cart.first.product.id, 1);
    expect(cart.first.quantity, 2);
    expect(cart.first.subtotal, 50.00);
  });
}
