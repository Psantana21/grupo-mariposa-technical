import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Product } from '../models/product';

interface ProductsResponse {
    products: Product[];
    total: number;
    skip: number;
    limit: number;
}

@Injectable({
    providedIn: 'root',
})
export class ProductService {
    private readonly http = inject(HttpClient);
    private readonly baseUrl = 'https://dummyjson.com';

    getProducts(limit = 20, skip = 0): Observable<ProductsResponse> {
        return this.http.get<ProductsResponse>(
            `${this.baseUrl}/products?limit=${limit}&skip=${skip}`,
        );
    }

    getProductById(id: number): Observable<Product> {
        return this.http.get<Product>(`${this.baseUrl}/products/${id}`);
    }

    searchProducts(query: string): Observable<ProductsResponse> {
        return this.http.get<ProductsResponse>(
            `${this.baseUrl}/products/search?q=${encodeURIComponent(query)}`,
        );
    }
}