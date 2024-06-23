import {
  Component,
  OnInit,
  Signal,
  TransferState,
  WritableSignal,
  computed,
  makeStateKey,
  signal,
} from '@angular/core';
import { AuthService } from '@client/core/services/auth.service';
import { Router } from '@angular/router';
import { MatGridListModule } from '@angular/material/grid-list';
import { MenuComponent } from '@client/component/menu/menu.component';
import Item from '@client/interfaces/item';
// import data from '@client/sample/items';
import { BillComponent } from '@client/component/bill/bill.component';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import {
  MatBottomSheet,
  MatBottomSheetModule,
} from '@angular/material/bottom-sheet';
import { OrderComponent } from '@client/component/bottomsheet/order/order.component';
import { Api, isClientSide, isServerSide } from '@client/core/utils/helpers';
import { Observer, Subject, takeUntil } from 'rxjs';
import { ENDPOINTS } from '@environments/endpoints';

const dataStateKey = makeStateKey<Item[] | undefined>('data-items-warteg')

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
export class DisplayComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private bottomSheet: MatBottomSheet,
    private router: Router,
    private readonly transferState: TransferState ,
  ) {}

  unsubscribe$ = new Subject<any>()
  ngOnInit(): void {
    const subscriberHandler: Partial<Observer<My.ResponseApi<Item[]>>> = {
      next: response => {
        if(response.data){
          this.data = signal(response.data)
          this.transferState.set( dataStateKey , response.data )
        }
      },
      error: console.error
    }

    if( isServerSide() ){
      this.getItems$().subscribe(subscriberHandler)

    }else if( isClientSide() ){
      const dataSourceFromState = this.transferState.get( dataStateKey , undefined )
      if( dataSourceFromState )
        this.data = signal(dataSourceFromState)
      else
        this.getItems$().subscribe(subscriberHandler)
    }
  }

  private getItems$(){
    return Api().get<My.ResponseApi<Item[]>>( ENDPOINTS.item ).pipe(
      takeUntil(this.unsubscribe$)
    )
  }

  data: WritableSignal<Item[]> = signal([]);
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
    this.authService.logout$().subscribe(() => {
      this.router.navigateByUrl('/login');
    });
  }
}
