
import { Component, computed, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { Order } from '../../models/order';
import { OrdersService } from '../../services/orders';
import { OrderCard } from '../../components/order-card/order-card';

@Component({
  selector: 'app-orders',
  imports: [OrderCard],
  templateUrl: './orders.html',
  styleUrl: './orders.scss',
})
export class Orders implements OnInit {
  private readonly ordersService = inject(OrdersService);
  private readonly destroyRef = inject(DestroyRef);

  readonly orders = signal<Order[]>([]);
  readonly loading = signal(true);
  readonly error = signal<string | null>(null);

  readonly selectedOrder = signal<Order | null>(null);

  onViewDetails(orderId: number): void {

    const order = this.orders().find((item) => item.id === orderId);

    this.selectedOrder.set(order ?? null);
  }

  closeDetails(): void {
    this.selectedOrder.set(null);
  }

  readonly filter = signal('');

  readonly filteredOrders = computed(() => {
    const query = this.filter().trim().toLowerCase();

    if (!query) {
      return this.orders();
    }

    return this.orders().filter((order) => {
      return (
        order.userId.toString().includes(query) ||
        order.total.toString().includes(query)
      );
    });
  });

  onFilterChange(value: string): void {
    this.filter.set(value);
  }

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
