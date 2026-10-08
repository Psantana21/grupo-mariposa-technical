
import {
  Component,
  DestroyRef,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Subject, of } from 'rxjs';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  map,
  startWith,
  switchMap,
  tap,
} from 'rxjs/operators';

import { Product } from '../../models/product';
import { ProductService } from '../../services/product';
import { ProductCard } from '../../components/product-card/product-card';

@Component({
  selector: 'app-products',
  imports: [ProductCard],
  templateUrl: './products.html',
  styleUrl: './products.scss',
})
export class Products implements OnInit {
  private readonly productService = inject(ProductService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly searchSubject = new Subject<string>();

  readonly products = signal<Product[]>([]);
  readonly loading = signal(true);
  readonly error = signal<string | null>(null);
  readonly searchQuery = signal('');

  ngOnInit(): void {
    this.searchSubject
      .pipe(
        startWith(''),
        debounceTime(300),
        distinctUntilChanged(),
        tap(() => {
          this.loading.set(true);
          this.error.set(null);
        }),
        switchMap((query) => {
          const request = query.trim()
            ? this.productService.searchProducts(query.trim())
            : this.productService.getProducts(20, 0);

          return request.pipe(
            map((response) => ({
              products: response.products,
              error: null as string | null,
            })),
            catchError(() =>
              of({
                products: [] as Product[],
                error: 'Unable to load products.',
              }),
            ),
          );
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((result) => {
        this.products.set(result.products);
        this.error.set(result.error);
        this.loading.set(false);
      });
  }

  onSearch(query: string): void {
    this.searchQuery.set(query);
    this.searchSubject.next(query);
  }

  loadProducts(): void {
    const query = this.searchQuery().trim();

    this.loading.set(true);
    this.error.set(null);

    const request = query
      ? this.productService.searchProducts(query)
      : this.productService.getProducts(20, 0);

    request.subscribe({
      next: (response) => {
        this.products.set(response.products);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Unable to load products.');
        this.loading.set(false);
      },
    });
  }
}
