import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
// import { FlexLayoutModule } from '@angular/flex-layout';
// import {FlexLayoutServerModule} from '@angular/flex-layout/server'
import { AuthService } from '../../core/services/auth.service';
// import { ROLES } from '../../enums/roles';
import { Api, MyAssets, clientLoading , handleError } from '@client/core/utils/helpers';
import { ENDPOINTS } from '@environments/endpoints';
import { Subject, map, switchMap, takeUntil } from 'rxjs';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    // FlexLayoutModule,
    // FlexLayoutServerModule,
    ReactiveFormsModule,
    RouterLink,
    RouterLinkActive,
    MatCardModule,
    MatGridListModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatProgressBarModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit , OnDestroy {
  private readonly unsubscribe$: Subject<any> = new Subject()

  ngOnDestroy(): void {
    this.unsubscribe$.next(null)
    this.unsubscribe$.complete()
  }

  constructor(
    private authService: AuthService,
    private router: Router ,
  ) {}

  ngOnInit(): void {
    
  }
  
  isLoading = false

   async onLogin() {

    try{
      await MyAssets().isLoaded()
      
      const params = this.form.value
      const setLoader = ( value = true ) =>{
        value ? clientLoading.show() : clientLoading.close()
        this.isLoading = value
      }
      
      setLoader(true)
      // delayClient(1000).then(()=>this.router.navigateByUrl('/'))

      Api().post( ENDPOINTS.auth.login , params ).pipe(
        takeUntil(this.unsubscribe$) ,
        switchMap( (loginData : My.Object ) =>{
          return Api().get( ENDPOINTS.auth.info ).pipe(
            map( (userInfo : My.Object ) => ({ userInfo , loginData }))
          )
        }) ,
        switchMap( response =>{
          console.log(response )
          const loginData = response.loginData?.data || {} 
          const userInfo = response.userInfo?.data || {}

          return this.authService.saveAuthPersistent$({
            authToken: loginData.token ,
            loginData, userInfo
          })
        })
      ).subscribe({
        next: response =>{
          setLoader(false)
          this.router.navigateByUrl('/dashboard')
        },
        error: response => {
          handleError(response)
          setLoader(false)
        } ,
      })

    }catch(error){
      
      console.error(error)
    }
    
  }

  passwordVisibility: boolean = false;
  form: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [
      Validators.minLength(1),
      Validators.required,
    ]),
  });
}
