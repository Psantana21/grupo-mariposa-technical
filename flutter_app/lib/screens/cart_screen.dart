import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../providers/cart_provider.dart';

class CartScreen extends ConsumerWidget {
  const CartScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final cart = ref.watch(cartProvider);

    final double total = cart.fold<double>(
      0,
      (sum, item) => sum + item.subtotal,
    );

    return Scaffold(
      appBar: AppBar(
        title: const Text('Cart'),
        actions: [
          if (cart.isNotEmpty)
            IconButton(
              onPressed: () {
                ref.read(cartProvider.notifier).clear();
              },
              icon: const Icon(Icons.delete_sweep),
              tooltip: 'Clear cart',
            ),
        ],
      ),
      body: cart.isEmpty
          ? const Center(child: Text('Your cart is empty'))
          : Column(
              children: [
                Expanded(
                  child: ListView.builder(
                    itemCount: cart.length,
                    itemBuilder: (context, index) {
                      final item = cart[index];
                      final product = item.product;

                      return ListTile(
                        leading: Image.network(
                          product.thumbnail,
                          width: 60,
                          height: 60,
                          fit: BoxFit.cover,
                          errorBuilder: (context, error, stackTrace) {
                            return const SizedBox(
                              width: 60,
                              height: 60,
                              child: Icon(Icons.image_not_supported_outlined),
                            );
                          },
                        ),
                        title: Text(product.title),
                        subtitle: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text('\$${product.price.toStringAsFixed(2)}'),
                            Row(
                              mainAxisSize: MainAxisSize.min,
                              children: [
                                IconButton(
                                  onPressed: () {
                                    ref
                                        .read(cartProvider.notifier)
                                        .decrement(product);
                                  },
                                  icon: const Icon(Icons.remove),
                                  tooltip: 'Decrease quantity',
                                ),
                                Text(
                                  '${item.quantity}',
                                  style: const TextStyle(
                                    fontWeight: FontWeight.bold,
                                  ),
                                ),
                                IconButton(
                                  onPressed: () {
                                    ref
                                        .read(cartProvider.notifier)
                                        .add(product);
                                  },
                                  icon: const Icon(Icons.add),
                                  tooltip: 'Increase quantity',
                                ),
                              ],
                            ),
                          ],
                        ),
                        trailing: IconButton(
                          onPressed: () {
                            ref.read(cartProvider.notifier).remove(product);
                          },
                          icon: const Icon(Icons.delete_outline),
                          tooltip: 'Remove',
                        ),
                      );
                    },
                  ),
                ),
                SafeArea(
                  child: Padding(
                    padding: const EdgeInsets.all(16),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        const Text(
                          'Total',
                          style: TextStyle(
                            fontSize: 18,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                        Text(
                          '\$${total.toStringAsFixed(2)}',
                          style: const TextStyle(
                            fontSize: 18,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
              ],
            ),
    );
  }
}
