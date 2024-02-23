import { CurrencyPipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import Item from '../../interfaces/item';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-bill',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, CurrencyPipe, MatIcon],
  templateUrl: './bill.component.html',
  styleUrl: './bill.component.css',
})
export class BillComponent {
  @Input() data: Item | undefined;
  @Output() counterChanged: EventEmitter<number> = new EventEmitter<number>();
  setCounter(arg0: number) {
    if (this.data) {
      this.data.counter = (this.data?.counter ?? 0) + arg0;
      this.data.counter = this.data.counter < 1 ? 1 : this.data.counter;
      this.counterChanged.emit(this.data.counter);
    }
  }
}
