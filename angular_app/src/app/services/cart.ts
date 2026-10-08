
import { Injectable, computed, signal } from '@angular/core';
import { Product } from '../models/product';

export interface CartItem {
    product: Product;
    quantity: number;
}

@Injectable({
    providedIn: 'root',
})
export class CartService {
    private readonly cartItems = signal<CartItem[]>([]);

    readonly items = this.cartItems.asReadonly();

    readonly itemCount = computed(() =>
        this.cartItems().reduce(
            (count, item) => count + item.quantity,
            0
        )
    );

    readonly total = computed(() =>
        this.cartItems().reduce(
            (sum, item) => sum + item.product.price * item.quantity,
            0
        )
    );

    addProduct(product: Product): void {
        this.cartItems.update((items) => {
            const existing = items.find(
                (item) => item.product.id === product.id
            );

            if (existing) {
                return items.map((item) =>
                    item.product.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }

            return [...items, { product, quantity: 1 }];
        });
    }

    increaseQuantity(productId: number): void {
        this.cartItems.update((items) =>
            items.map((item) =>
                item.product.id === productId
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            )
        );
    }

    decreaseQuantity(productId: number): void {
        this.cartItems.update((items) =>
            items
                .map((item) =>
                    item.product.id === productId
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                )
                .filter((item) => item.quantity > 0)
        );
    }

    removeProduct(productId: number): void {
        this.cartItems.update((items) =>
            items.filter((item) => item.product.id !== productId)
        );
    }

    clearCart(): void {
        this.cartItems.set([]);
    }
}
