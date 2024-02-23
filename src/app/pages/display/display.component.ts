import { Component } from '@angular/core';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';
import { MatGridListModule } from '@angular/material/grid-list';
import { MenuComponent } from '../../component/menu/menu.component';
import Item from '../../interfaces/item';
import data from '../../sample/items';

@Component({
  selector: 'app-display',
  standalone: true,
  imports: [MatGridListModule, MenuComponent],
  templateUrl: './display.component.html',
  styleUrl: './display.component.css',
})
export class DisplayComponent {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  data: Item[] = data;

  logout() {
    this.authService.logout().subscribe(() => {
      this.router.navigateByUrl('/login');
    });
  }
}
