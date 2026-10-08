
import { TestBed } from '@angular/core/testing';

import { CartService } from './cart';
import { Product } from '../models/product';

describe('CartService', () => {
    let service: CartService;

    const product: Product = {
        id: 1,
        title: 'Test Product',
        description: 'Product for testing',
        price: 25,
        rating: 4.5,
        thumbnail: 'https://example.com/product.jpg',
    };

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(CartService);
    });

    it('should start with an empty cart', () => {
        expect(service.items()).toEqual([]);
        expect(service.itemCount()).toBe(0);
        expect(service.total()).toBe(0);
    });

    it('should add a product', () => {
        service.addProduct(product);

        expect(service.items().length).toBe(1);
        expect(service.itemCount()).toBe(1);
        expect(service.total()).toBe(25);
    });

    it('should increase the quantity of an existing product', () => {
        service.addProduct(product);
        service.addProduct(product);

        expect(service.items().length).toBe(1);
        expect(service.itemCount()).toBe(2);
        expect(service.total()).toBe(50);
    });

    it('should decrease product quantity', () => {
        service.addProduct(product);
        service.increaseQuantity(product.id);
        service.decreaseQuantity(product.id);

        expect(service.itemCount()).toBe(1);
        expect(service.total()).toBe(25);
    });

    it('should remove a product', () => {
        service.addProduct(product);
        service.removeProduct(product.id);

        expect(service.items()).toEqual([]);
        expect(service.total()).toBe(0);
    });

    it('should clear the cart', () => {
        service.addProduct(product);
        service.clearCart();

        expect(service.itemCount()).toBe(0);
        expect(service.total()).toBe(0);
    });
});
