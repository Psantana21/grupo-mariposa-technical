
import { Routes } from '@angular/router';

import { Orders } from './pages/orders/orders';

import { Products } from './pages/products/products';
import { ProductDetail } from './pages/product-detail/product-detail';
import { Cart } from './pages/cart/cart';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'products',
        pathMatch: 'full',
    },
    {
        path: 'products',
        component: Products,
    },
    {
        path: 'products/:id',
        component: ProductDetail,
    },
    {
        path: 'cart',
        component: Cart,
    },
    {
        path: 'orders',
        component: Orders,
    },
    {
        path: '**',
        redirectTo: 'products',
    },
];
