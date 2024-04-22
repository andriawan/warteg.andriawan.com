import { MediaMatcher } from '@angular/cdk/layout';
import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { Subject , takeUntil } from 'rxjs';

import { SpinnerService } from '@client/core/services/spinner.service';
import { AuthService } from '@client/core/services/auth.service';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AsyncPipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { environment } from '@environments/environment';
// import { MaterialUiModule } from '@client/core/modules/material-ui.module';

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [ 
    RouterOutlet,
    RouterLink ,
    
    // OnLy import required module without Shared Module -> MaterialUiModule
    MatIconModule,
    MatMenuModule,
    MatSidenavModule,
    MatProgressBarModule,
    MatListModule,
    MatToolbarModule,
    MatButtonModule,
    MatBadgeModule,
    AsyncPipe ,

    //Test Layout using SharedMaterialUIModule = bloated lib, unused module loaded
    // MaterialUiModule ,
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
  encapsulation: ViewEncapsulation.None ,
})
export class LayoutComponent implements AfterViewInit , OnInit , OnDestroy {

  private readonly unsubscribe$: Subject<any> = new Subject()

  ngOnDestroy(): void {
    this.unsubscribe$.next(null)
    this.unsubscribe$.complete()
  }

  private _mobileQueryListener: () => void;
  mobileQuery: MediaQueryList;
  showSpinner: boolean = false;
  userName: string = "No Name";
  isAdmin: boolean = false;
  appName: string = ''

  // private autoLogoutSubscription: Subscription = new Subscription;

  ngOnInit():void{

  }

  constructor(
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly media: MediaMatcher,
    public readonly spinnerService: SpinnerService,
    private readonly authService: AuthService,
    private readonly router: Router,
    // private authGuard: AuthGuard
  )
    {

    this.mobileQuery = this.media.matchMedia('(max-width: 1000px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.userName = this.authService.currentUser.userInfo.name || this.userName
    this.appName = environment.appName
    // tslint:disable-next-line: deprecation
    // this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngAfterViewInit(): void {
    this.changeDetectorRef.detectChanges();
  }

  eventClickLogout( e: MouseEvent ){
    e.preventDefault()

    this.authService.logout$().pipe(takeUntil(this.unsubscribe$)).subscribe(()=>{
      this.router.navigateByUrl('/')
    })
  }

}
