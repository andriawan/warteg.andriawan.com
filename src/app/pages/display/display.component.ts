import { Component } from '@angular/core';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';
import { MatGridListModule } from '@angular/material/grid-list';
import { MenuComponent } from '../../component/menu/menu.component';
import Item from '../../interfaces/item';
import data from '../../sample/items';
import { BillComponent } from '../../component/bill/bill.component';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-display',
  standalone: true,
  imports: [MatGridListModule, MenuComponent, BillComponent, CurrencyPipe],
  templateUrl: './display.component.html',
  styleUrl: './display.component.css',
})
export class DisplayComponent {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  data: Item[] = data;
  selectedMenu: Item[] = [];
  total: number = 0;

  setSelectedItem(menu: Item | undefined) {
    if (menu) {
      const index: number = this.selectedMenu.findIndex(
        data => data.id === menu.id
      );
      index < 0
        ? this.selectedMenu.push({ ...menu, counter: 1 })
        : this.selectedMenu.splice(index, 1);
      this.calculateTotal();
    }
  }

  calculateTotal() {
    this.total = this.selectedMenu
      .map(item => item.price * (item?.counter ?? 1))
      .reduce((prev, curr) => prev + curr, 0);
  }

  logout() {
    this.authService.logout().subscribe(() => {
      this.router.navigateByUrl('/login');
    });
  }
}
