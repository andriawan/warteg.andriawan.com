import { Component, Inject, Signal, WritableSignal } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import Item from '../../../interfaces/item';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [MatListModule, MatDividerModule, MatButtonModule, CurrencyPipe],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css',
})
export class OrderComponent {
  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA)
    public data: {
      item: WritableSignal<Item[]>;
      count: Signal<number>;
      total: Signal<number>;
    }
  ) {}
}
