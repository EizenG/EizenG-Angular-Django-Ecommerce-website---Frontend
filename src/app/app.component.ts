import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { ShareDataBtwCompService } from './services/share-data-btw-comp.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet,NavbarComponent,FooterComponent,ProductsListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements AfterViewInit {
  title = 'shop';
  @ViewChild("main",{read:ElementRef}) mainContent !: ElementRef;
  @ViewChild("footer",{read:ElementRef}) footer !: ElementRef;
  @ViewChild("header",{read:ElementRef}) header !: ElementRef;

  constructor(private shareDataBtwCompService : ShareDataBtwCompService){}
  
  ngAfterViewInit(){
    const footerHeight = this.footer.nativeElement.offsetHeight;
    const headerHeight = this.header.nativeElement.offsetHeight;
    this.mainContent.nativeElement.style.minHeight = `${window.innerHeight - footerHeight - headerHeight}px`;
    this.setMainContentMinHeight();
    window.addEventListener('resize', this.setMainContentMinHeight.bind(this));
  }

  public setMainContentMinHeight() {
    
    document.cookie = `headerHeight=${this.header.nativeElement.offsetHeight};path=/`;
    if (this.footer && this.header && this.mainContent) {
      const footerHeight = this.footer.nativeElement.offsetHeight;
      const headerHeight = this.header.nativeElement.offsetHeight;
      this.mainContent.nativeElement.style.minHeight = `${window.innerHeight - footerHeight - headerHeight}px`;
    }
  }

  captureSearchTerm(searchTerm:string){
    this.shareDataBtwCompService.updateSearchTerm(searchTerm);
  }

}
