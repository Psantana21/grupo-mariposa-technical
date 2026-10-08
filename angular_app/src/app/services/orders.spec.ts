
import { TestBed } from '@angular/core/testing';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { OrdersService } from './orders';
import { OrdersResponse } from '../models/order';

describe('OrdersService', () => {
  let service: OrdersService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        OrdersService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });

    service = TestBed.inject(OrdersService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should request orders from DummyJSON', () => {
    const mockResponse: OrdersResponse = {
      carts: [],
      total: 0,
      skip: 0,
      limit: 30,
    };

    service.getOrders().subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const request = httpMock.expectOne(
      'https://dummyjson.com/carts'
    );

    expect(request.request.method).toBe('GET');

    request.flush(mockResponse);
  });
});
