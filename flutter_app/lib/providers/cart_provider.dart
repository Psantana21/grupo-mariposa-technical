import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../models/cart_item.dart';
import '../models/product.dart';

class CartNotifier extends Notifier<List<CartItem>> {
  @override
  List<CartItem> build() => <CartItem>[];

  void add(Product product) {
    final int index = state.indexWhere(
      (CartItem item) => item.product.id == product.id,
    );

    if (index == -1) {
      state = <CartItem>[...state, CartItem(product: product, quantity: 1)];
      return;
    }

    final List<CartItem> updatedCart = <CartItem>[...state];
    final CartItem currentItem = updatedCart[index];

    updatedCart[index] = currentItem.copyWith(
      quantity: currentItem.quantity + 1,
    );

    state = updatedCart;
  }

  void decrement(Product product) {
    final int index = state.indexWhere(
      (CartItem item) => item.product.id == product.id,
    );

    if (index == -1) {
      return;
    }

    final CartItem currentItem = state[index];

    if (currentItem.quantity == 1) {
      remove(product);
      return;
    }

    final List<CartItem> updatedCart = <CartItem>[...state];

    updatedCart[index] = currentItem.copyWith(
      quantity: currentItem.quantity - 1,
    );

    state = updatedCart;
  }

  void remove(Product product) {
    state = state
        .where((CartItem item) => item.product.id != product.id)
        .toList();
  }

  void clear() {
    state = <CartItem>[];
  }
}

final cartProvider = NotifierProvider<CartNotifier, List<CartItem>>(
  CartNotifier.new,
);
