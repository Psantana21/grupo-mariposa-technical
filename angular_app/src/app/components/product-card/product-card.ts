
import { Component, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Product } from '../../models/product';
import { CartService } from '../../services/cart';

@Component({
  selector: 'app-product-card',
  imports: [RouterLink],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss',
})
export class ProductCard {
  readonly product = input.required<Product>();

  private readonly cartService = inject(CartService);

  addToCart(): void {
    this.cartService.addProduct(this.product());
  }
}
