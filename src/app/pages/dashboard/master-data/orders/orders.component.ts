import { CurrencyPipe } from '@angular/common';
import { Component, DestroyRef, ElementRef, OnInit, TemplateRef, ViewChild, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatNoDataRow, MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Api, MyAssets, clientLoading, handleError, isClientSide } from '@client/core/utils/helpers';
import { ENDPOINTS } from '@environments/endpoints';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [
    MatCardModule ,
    MatTableModule,
    MatNoDataRow,
    CurrencyPipe,
    MatIconModule,

    MatDialogTitle, 
    MatDialogContent, 
    MatDialogActions, 
    MatDialogClose, 
    // MatButtonModule ,
  ],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export default class OrdersComponent implements OnInit {

  displayedColumns: string[] = ['code', 'total_price', 'image_url', 'description'];
  dataSource = new MatTableDataSource<IOrder>([])

  dataModal = signal<IOrder | undefined>(undefined)

  constructor(
    private readonly destroyRef$: DestroyRef ,
    private readonly dialogContext: MatDialog ,
  ){}

  ngOnInit(): void {
    if(isClientSide()){
      MyAssets().isLoaded().then(()=> this.getListOrder() ).catch(console.error)
    }
  }

  getListOrder(){
    clientLoading.show()

    Api().get<My.ResponseApi<IOrder[]>>( ENDPOINTS.order.main ).pipe(
      takeUntilDestroyed(this.destroyRef$)
    ).subscribe({
      next: response =>{
        const dataSource = response.data || []
        dataSource.forEach(val =>{
          val.image_url = `${val.file_path}/${val.file_name}`
        })

        this.dataSource = new MatTableDataSource(dataSource)
        // console.info(response)
        clientLoading.close()
      },
      error: response =>{
        handleError(response)
        clientLoading.close()
      },
    })
  }

  @ViewChild('viewModal') private viewModal?: TemplateRef<HTMLElement>

  eventClickViewDetail( data: IOrder ){
    // console.log(data)

    if(this.viewModal){
      this.dataModal.set(data)
      this.dialogContext.open(this.viewModal)
    }
  }

  getAmountForDetail( detail: My.Object[] , detailValidID: number | string ){
    const found = detail.find( val => val.item_id === detailValidID )
    return found?.amount || 0
  }
}

interface IOrder {
  file_path: string;
  file_name: string;
  image_url: string;
  total_price: number;
  code: string;
  data:{
    detail: My.Object[],
    detailValid: My.Object[] ,
  },
}
