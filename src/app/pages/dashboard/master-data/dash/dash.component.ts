import { Component, afterNextRender } from '@angular/core'; 
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '@client/core/services/auth.service';

@Component({
  selector: 'app-dash',
  standalone: true,
  imports: [
    MatIconModule, 
  ],
  templateUrl: './dash.component.html',
  styleUrl: './dash.component.css'
})
export class DashComponent {

  userName: string = 'No Name'

  constructor(
    private readonly authService: AuthService ,
  ){

    this.userName = this.authService.currentUser.userInfo.name || this.userName

    afterNextRender(()=>{
      // this.unsubscribe$.next( (new Date()).getTime() )

      // alert(1)
    })
  }
}
