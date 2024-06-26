import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderQrcodeComponent } from './order-qrcode.component';

describe('OrderQrcodeComponent', () => {
  let component: OrderQrcodeComponent;
  let fixture: ComponentFixture<OrderQrcodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderQrcodeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OrderQrcodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
