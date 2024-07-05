import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';

@Component({
  selector: 'app-order-qrcode',
  standalone: true,
  imports: [
    MatDialogTitle, 
    MatDialogContent, 
    MatDialogActions, 
    MatDialogClose, 
    MatButtonModule ,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './order-qrcode.component.html',
  styleUrl: './order-qrcode.component.css'
})
export class OrderQrcodeComponent {
  
  constructor(
    @Inject(MAT_DIALOG_DATA) readonly data : OrderCompleteData
  ){}
}

type OrderCompleteData = {
  qrcode_url: string ,
  code: string ,
}