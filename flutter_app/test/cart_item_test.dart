import 'package:flutter_test/flutter_test.dart';
import 'package:flutter_app/models/cart_item.dart';
import 'package:flutter_app/models/product.dart';

void main() {
  test('CartItem calculates subtotal correctly', () {
    const product = Product(
      id: 1,
      title: 'Test Product',
      description: 'Test description',
      price: 25.00,
      rating: 4.5,
      thumbnail: 'https://example.com/product.png',
    );

    const cartItem = CartItem(product: product, quantity: 3);

    expect(cartItem.quantity, 3);
    expect(cartItem.subtotal, 75.00);
  });
}
