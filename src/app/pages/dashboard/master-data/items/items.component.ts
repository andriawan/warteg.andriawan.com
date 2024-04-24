import { CurrencyPipe } from '@angular/common';
import { Component, OnDestroy, OnInit, TransferState, makeStateKey } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatNoDataRow, MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Api, isClientSide, isServerSide } from '@client/core/utils/helpers';
import { ENDPOINTS } from '@environments/endpoints';
import { Observer, Subject, takeUntil } from 'rxjs';

const dataStateKey = makeStateKey<Item[] | undefined>('data-items-warteg')

@Component({
  selector: 'app-items',
  standalone: true,
  imports: [
    MatCardModule ,
    MatTableModule,
    MatNoDataRow,
    CurrencyPipe,
  ],
  templateUrl: './items.component.html',
  styleUrl: './items.component.css'
})
export class ItemsComponent implements OnInit , OnDestroy {

  unsubscribe$ = new Subject<any>()
  
  displayedColumns: string[] = ['id', 'name', 'image_url', 'description'];
  dataSource = new MatTableDataSource(ELEMENT_DATA)

  constructor(
    private readonly transferState: TransferState ,
  ){}

  ngOnInit(): void {
    
    const subscriberHandler: Partial<Observer<My.ResponseApi<Item[]>>> = {
      next: response => {
        if(response.data){
          this.dataSource = new MatTableDataSource(response.data)
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
        this.dataSource = new MatTableDataSource( dataSourceFromState )
      else
        this.getItems$().subscribe(subscriberHandler)
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(null)
    this.unsubscribe$.complete()
  }

  private getItems$(){
    return Api().get<My.ResponseApi<Item[]>>( ENDPOINTS.item ).pipe(
      takeUntil(this.unsubscribe$)
    )
  }

}


const ELEMENT_DATA: Item[] = [
  // { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  // { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  // { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  // { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  // { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  // { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  // { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  // { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  // { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  // { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];

interface Item{
  id: number;
  name: string;
  description: string;
  image_url: string;
}

interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}