import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink,NavigationEnd } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';
import { ShareDataBtwCompService } from '../services/share-data-btw-comp.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements AfterViewInit ,OnDestroy,OnInit {

  isAuthenticated : boolean = false;
  routerEventsSubscription ?: Subscription;
  headerBottomContentSubscription ?: Subscription;
  headerBottomInnerHtml ?: number;
  isSearchBar : boolean = true;
  userData ?: any;
  isLangSelect : boolean = true;
  @Output() searchTermEmitter : EventEmitter<string> = new EventEmitter<string>();
  search ?: any;
  @ViewChildren("selectContainer") selectContainer !: QueryList<ElementRef>;
  @ViewChildren("selectDropdown") selectDropdowns !: QueryList<ElementRef>;
  @ViewChild("logoProfile") logoProfile !: ElementRef;
  @ViewChild("userNavCard") userNavCard !: ElementRef;
  @ViewChild("headerbottom") headerBottom !: ElementRef;
  currentSelectIndex : any = null;
  authServiceUserDataSubscription ?: Subscription;

  constructor(private authService : AuthService,private router : Router,private shareDataBtwCompService : ShareDataBtwCompService,private cdrf : ChangeDetectorRef){}

  handleUserData(){
    this.authServiceUserDataSubscription = this.authService.getUserData().subscribe({
      next: (resp) => {
        this.isAuthenticated = true;
        this.userData = resp["user"];
        this.authService.updateUserData(this.userData);
      },
      error: (error) => {
        this.isAuthenticated = false;
        this.authService.updateUserData({});
      }
    });
  }

  ngOnInit(): void {

    this.routerEventsSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        console.log("routing")
        console.log("routing event")
        this.handleUserData();
      }
      if (this.router.url != "/") {
        this.isSearchBar = false;
      } else {
        this.isSearchBar = true;
      }
    });
    this.headerBottomContentSubscription = this.shareDataBtwCompService.headerBottomContent$.subscribe(value =>{
      this.headerBottomInnerHtml = value;
    });

  }

  disconnect(){
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    this.router.navigateByUrl("/");
  }
  
  ngAfterViewInit(){
    
    this.selectContainer.forEach((item,index) =>{
      
      item.nativeElement.addEventListener("click", () =>{
        if( this.currentSelectIndex != null && this.currentSelectIndex != index)
          this.selectDropdowns.get(this.currentSelectIndex)!.nativeElement.classList.add("hidden");
        this.currentSelectIndex = index;
        this.selectDropdowns.get(index)!.nativeElement.classList.toggle("hidden");
      });
    });
    

    document.addEventListener("click",e =>{

      let target = e.target as HTMLElement
      // Associer au custom select que l'on a cree pour la selection de langue et la devise 
      if(!target.closest(".select-container") && this.selectDropdowns.get(this.currentSelectIndex))
        this.selectDropdowns.get(this.currentSelectIndex)!.nativeElement.classList.add("hidden");
      
      if (!target.closest("#profileDiv") && target != this.logoProfile.nativeElement)
        this.userNavCard.nativeElement.classList.add("hideUserNavCard");
    });
  
  }

  ngOnDestroy(): void {
      if(this.authServiceUserDataSubscription)
        this.authServiceUserDataSubscription?.unsubscribe();
      if(this.routerEventsSubscription)
        this.routerEventsSubscription?.unsubscribe();
      if(this.headerBottomContentSubscription)
        this.headerBottomContentSubscription.unsubscribe();
  }

  showOrHideUserNavCard(){
      if(this.userNavCard.nativeElement.classList.contains("hideUserNavCard")){
        this.userNavCard.nativeElement.classList.remove("hideUserNavCard");
    }else{
        this.userNavCard.nativeElement.classList.add("hideUserNavCard");
    }
  }

  emitSearchTerm(value : string){
    this.searchTermEmitter.emit(value);
  }
}
