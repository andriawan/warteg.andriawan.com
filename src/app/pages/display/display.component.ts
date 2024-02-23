import {
  Component,
  Signal,
  WritableSignal,
  computed,
  signal,
} from '@angular/core';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';
import { MatGridListModule } from '@angular/material/grid-list';
import { MenuComponent } from '../../component/menu/menu.component';
import Item from '../../interfaces/item';
import data from '../../sample/items';
import { BillComponent } from '../../component/bill/bill.component';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import {
  MatBottomSheet,
  MatBottomSheetModule,
} from '@angular/material/bottom-sheet';
import { OrderComponent } from '../../component/bottomsheet/order/order.component';

@Component({
  selector: 'app-display',
  standalone: true,
  imports: [
    MatGridListModule,
    MenuComponent,
    BillComponent,
    CommonModule,
    MatBottomSheetModule,
    CurrencyPipe,
    MatButtonModule,
  ],
  templateUrl: './display.component.html',
  styleUrl: './display.component.css',
})
export class DisplayComponent {
  constructor(
    private authService: AuthService,
    private bottomSheet: MatBottomSheet,
    private router: Router
  ) {}

  data: WritableSignal<Item[]> = signal(data);
  selectedMenu: WritableSignal<Item[]> = signal([]);
  grandTotal: Signal<number> = computed(() => {
    return this.selectedMenu()
      .map(item => item.price * (item?.counter ?? 1))
      .reduce((prev, curr) => prev + curr, 0);
  });

  totalCount: Signal<number> = computed(() => {
    return this.selectedMenu()
      .map(item => item?.counter ?? 1)
      .reduce((prev, curr) => prev + curr, 0);
  });

  totalPrice: Signal<number> = computed(() => {
    return this.selectedMenu()
      .map(item => item.price)
      .reduce((prev, curr) => prev + curr, 0);
  });

  setSelectedItem(menu: Item) {
    let index: number = -1;
    index = this.selectedMenu().findIndex(data => data.id === menu.id);
    const item: Item[] = [...this.selectedMenu()];
    if (index < 0) {
      item.push({ ...menu, counter: 1 });
    } else {
      item.splice(index, 1);
    }
    this.selectedMenu.update(() => item);
  }

  updateItem(item: Item) {
    const newData = [...this.selectedMenu()];
    const updatedData = newData.find(itemData => itemData.id === item.id);
    if (updatedData) {
      updatedData.counter = item.counter;
      this.selectedMenu.set(newData);
    }
  }

  confirmOrder() {
    this.bottomSheet.open(OrderComponent, {
      data: {
        item: this.selectedMenu,
        count: this.totalCount,
        total: this.grandTotal,
      },
    });
  }

  logout() {
    this.authService.logout().subscribe(() => {
      this.router.navigateByUrl('/login');
    });
  }
}
