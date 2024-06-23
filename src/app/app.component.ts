import { Component , OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MyAssets, delayClient, isClientSide } from './core/utils/helpers';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit{
  isLoaded = false

  constructor(
    // private _renderer2: Renderer2, 
    // @Inject(DOCUMENT) private _document: Document
  ){}

  ngOnInit(): void {
    // const script = this._renderer2.createElement('script')
    // script.async = true 
    // script.type = "text/javascript";
    // script.src = '/assets/plugins/global/plugins.bundle.js';
    
    // this._document.querySelector('head')?.appendChild(script)

    if( isClientSide() ){
      MyAssets().checkExist().then(() =>{
        delayClient(1500).then(()=> this.isLoaded = true )
      })
      
      // this.router.events
      // .pipe(
      //   // takeUntil( this.unsubscribe$ )
      //   filter( event => event instanceof NavigationEnd ),
      // )
      // .subscribe({
      //   next:(event) => {
      //     this.unsubscribe$.next((new Date).getTime() + `${ event.toString() }` )
      //     // alert(1)
      //   },
      //   error: console.error,
      //   complete: console.info ,
      // });
    }
  }
}
