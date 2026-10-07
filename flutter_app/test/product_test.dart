import 'package:flutter_test/flutter_test.dart';
import 'package:flutter_app/models/product.dart';

void main() {
  test('Product.fromJson creates a Product correctly', () {
    final json = <String, dynamic>{
      'id': 1,
      'title': 'Test Product',
      'description': 'Test description',
      'price': 29.99,
      'rating': 4.5,
      'thumbnail': 'https://example.com/product.png',
    };

    final product = Product.fromJson(json);

    expect(product.id, 1);
    expect(product.title, 'Test Product');
    expect(product.description, 'Test description');
    expect(product.price, 29.99);
    expect(product.rating, 4.5);
    expect(product.thumbnail, 'https://example.com/product.png');
  });
}
