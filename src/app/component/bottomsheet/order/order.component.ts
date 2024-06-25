import { Component, DestroyRef, Inject, Signal, WritableSignal } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import Item from '@client/interfaces/item';
import { CurrencyPipe } from '@angular/common';
import { Api, MyAssets, clientLoading, handleError } from '@client/core/utils/helpers';
import { concat, filter } from 'rxjs';
import { ENDPOINTS } from '@environments/endpoints';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatDialog } from '@angular/material/dialog';
import { OrderQrcodeComponent } from '@client/component/dialog/order-qrcode/order-qrcode.component';

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

      closeSheet: ()=>void;
    },

    private readonly destroyRef$: DestroyRef,
    private readonly dialogContext: MatDialog,
  ) {}

  eventClickConfirmOrder( e: MouseEvent ){
    e.preventDefault()

    MyAssets().isLoaded().then(()=>this.__eventClickConfirmOrder()).catch(console.error)
  }

  private __eventClickConfirmOrder(){
    clientLoading.show()
    
    let params = {
      items: this.data.item().map(val =>({
        item_id: val.id ,
        amount: val.counter ,
      })) ,
    }
    
    concat(
      Api().post<My.ResponseApi>( ENDPOINTS.order.main , {} ) ,
      Api().patch<My.ResponseApi>( ENDPOINTS.order.main , params ) ,
    ).pipe(
      takeUntilDestroyed(this.destroyRef$),
      filter( response => response.data.qrcode_url )
    ).subscribe({
      next: response => {
        // console.info('CHECK INI',response)

        this.dialogContext.open(OrderQrcodeComponent,{ data: response.data })
        this.data.closeSheet()
        clientLoading.close()
      },
      error: response => {
        handleError(response)
        clientLoading.close()
      }
    })
    
  }
}
