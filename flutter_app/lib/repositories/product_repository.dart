import 'dart:convert';

import 'package:http/http.dart' as http;

import '../models/product.dart';

class ProductRepository {
  ProductRepository(this.client);

  final http.Client client;

  static const String _baseUrl = 'https://dummyjson.com';

  Future<List<Product>> getProducts() async {
    final response = await client.get(
      Uri.parse('$_baseUrl/products?limit=20&skip=0'),
    );

    if (response.statusCode != 200) {
      throw Exception('Failed to load products');
    }

    final data = jsonDecode(response.body) as Map<String, dynamic>;
    final products = data['products'] as List<dynamic>;

    return products
        .map((product) => Product.fromJson(product as Map<String, dynamic>))
        .toList();
  }

  Future<Product> getProductById(int id) async {
    final response = await client.get(Uri.parse('$_baseUrl/products/$id'));

    if (response.statusCode != 200) {
      throw Exception('Failed to load product');
    }

    final data = jsonDecode(response.body) as Map<String, dynamic>;

    return Product.fromJson(data);
  }

  Future<List<Product>> searchProducts(String query) async {
    final response = await client.get(
      Uri.parse(
        '$_baseUrl/products/search?q=${Uri.encodeQueryComponent(query)}',
      ),
    );

    if (response.statusCode != 200) {
      throw Exception('Failed to search products');
    }

    final data = jsonDecode(response.body) as Map<String, dynamic>;
    final products = data['products'] as List<dynamic>;

    return products
        .map((product) => Product.fromJson(product as Map<String, dynamic>))
        .toList();
  }
}
