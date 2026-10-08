
import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { Product } from '../../models/product';
import { ProductService } from '../../services/product';
import { CartService } from '../../services/cart';

@Component({
  selector: 'app-product-detail',
  imports: [RouterLink],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.scss',
})
export class ProductDetail implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly productService = inject(ProductService);
  private readonly cartService = inject(CartService);

  readonly product = signal<Product | null>(null);
  readonly loading = signal(true);
  readonly error = signal<string | null>(null);

  private productId = 0;

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (!Number.isInteger(id) || id <= 0) {
      this.loading.set(false);
      this.error.set('Invalid product ID.');
      return;
    }

    this.productId = id;
    this.loadProduct();
  }

  loadProduct(): void {
    this.loading.set(true);
    this.error.set(null);
    this.product.set(null);

    this.productService.getProductById(this.productId).subscribe({
      next: (response) => {
        this.product.set(response);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Unable to load product details.');
        this.loading.set(false);
      },
    });
  }

  addToCart(): void {
    const selectedProduct = this.product();

    if (selectedProduct) {
      this.cartService.addProduct(selectedProduct);
    }
  }
}
