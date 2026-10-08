
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrderCard } from './order-card';
import { Order } from '../../models/order';

describe('OrderCard', () => {
  let component: OrderCard;
  let fixture: ComponentFixture<OrderCard>;

  const mockOrder: Order = {
    id: 1,
    userId: 10,
    products: [],
    total: 150,
    discountedTotal: 135,
    totalProducts: 0,
    totalQuantity: 0,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderCard],
    }).compileComponents();

    fixture = TestBed.createComponent(OrderCard);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('order', mockOrder);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit the order ID when viewing details', () => {
    let emittedId: number | undefined;

    component.viewDetails.subscribe((id) => {
      emittedId = id;
    });

    const button: HTMLButtonElement =
      fixture.nativeElement.querySelector('button');

    button.click();

    expect(emittedId).toBe(1);
  });
});
