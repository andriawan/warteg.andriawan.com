import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import Item from '../../interfaces/item';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, CurrencyPipe],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',
})
export class MenuComponent {
  @Input({ required: true }) data: Item | undefined;
  @Input() indexItem: number = 0;
  @Output() selectedItem: EventEmitter<Item> = new EventEmitter<Item>();

  toggleSelectionItem() {
    if (this.data) {
      this.data.index = this.indexItem;
      this.data.selected = !this.data.selected;
      this.selectedItem.emit(this.data);
    }
  }
}
