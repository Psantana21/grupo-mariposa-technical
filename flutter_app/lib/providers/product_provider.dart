import 'search_provider.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:http/http.dart' as http;

import '../models/product.dart';
import '../repositories/product_repository.dart';

final httpClientProvider = Provider<http.Client>((ref) {
  final client = http.Client();

  ref.onDispose(client.close);

  return client;
});

final productRepositoryProvider = Provider<ProductRepository>((ref) {
  final client = ref.watch(httpClientProvider);

  return ProductRepository(client);
});

final productsProvider = FutureProvider<List<Product>>((ref) async {
  final repository = ref.watch(productRepositoryProvider);

  return repository.getProducts();
});

final searchedProductsProvider = FutureProvider<List<Product>>((ref) async {
  final query = ref.watch(searchQueryProvider).trim();

  if (query.isEmpty) {
    return ref.watch(productRepositoryProvider).getProducts();
  }

  await Future<void>.delayed(const Duration(milliseconds: 500));

  if (query != ref.read(searchQueryProvider).trim()) {
    return [];
  }

  final repository = ref.watch(productRepositoryProvider);

  return repository.searchProducts(query);
});

final productDetailProvider = FutureProvider.family<Product, int>((
  ref,
  id,
) async {
  final repository = ref.watch(productRepositoryProvider);

  return repository.getProductById(id);
});
