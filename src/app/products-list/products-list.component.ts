import { CommonModule, } from '@angular/common';
import { Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren, viewChild } from '@angular/core';
import { ProductsService} from '../services/products.service';
import { ShareDataBtwCompService } from '../services/share-data-btw-comp.service';
import {RouterLink } from '@angular/router';
import { StarsPipe } from '../customPipe/stars.pipe';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [CommonModule,RouterLink,StarsPipe],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.css'
})
export class ProductsListComponent implements OnInit ,OnDestroy{
  products :any; // Contient les donnees des differents produits
  i : number = 0; // Incremente ou decremente selon qu'on appuie sur previous ou next. Nous permet de controler quand est-ce qu'il faudra defiler les numeros ou bien non.
  transformStep : number = 0; // le pas de translation du contenu de productBtnContainer
  @ViewChild("productBtnContainer") productBtnContainer ?: ElementRef;
  @ViewChildren("productBtnPage") productPageBtnList ?: QueryList<ElementRef>;
  @ViewChild("firstBtnChangePage", {read : ElementRef}) currentProductPageBtn !: any;
  @ViewChild("mainFirstDiv") mainFirstDiv ?: ElementRef;
  @ViewChildren("productCards") productCards ?: QueryList<ElementRef>;
  num_pages !: number[];
  hideNotFoundSvg : boolean = true;
  currentCategory : number  = 0;
  productSubscription : any
  searchTermSubscription : any;
  currentSearchTerm ?: string;
  categories = ["Tous les produits","Ordinateur et ordinateur portable","Accessoires informatiques","Téléphone intelligent",
                "Casque d'écoute", "Accessoires mobiles","Console de jeu","Appareil Photo et Photo","TV & électroménager"
                ,"Montres & accessoires","GPS et Navigation","Technologie chauffable"];

  constructor(private productsService : ProductsService,private shareDataBtwCompService : ShareDataBtwCompService){
    this.get_products();
  }
  originalOrder = () => 0;

  get_products(page : number | null = null,category : number | null = null) : any{
    this.productSubscription = this.productsService.get_products(page,category)
    .subscribe({
      next: (data : any) => {
        this.products = data["products"];
        this.num_pages = [...Array(data["num_pages"]).keys()].map(value => value + 1);

      },
      error: (e) => alert("Oups erreur!!! Veuillez reessayer...")
    });
    
  }

  private scrollTop(){
    if(document.documentElement.clientWidth <= 1036){
      window.scrollTo({top: (this.mainFirstDiv?.nativeElement.offsetHeight + Number(this.getCookie("headerHeight")) + 40), behavior: 'smooth'});
    }else{
        window.scrollTo({top: 0, behavior: 'smooth'});
    }
  }
  changeProductPage(e:any){
    if(!e.target.classList.contains("currentProductPageBtn")){
      e.target.classList.add("currentProductPageBtn");
      if(this.currentProductPageBtn.nativeElement){
        this.currentProductPageBtn.nativeElement.classList.remove("currentProductPageBtn");
        this.currentProductPageBtn = this.currentProductPageBtn.nativeElement;
      }else
        this.currentProductPageBtn.classList.remove("currentProductPageBtn");
      this.currentProductPageBtn = e.target;
      let page : number = Number(this.currentProductPageBtn.textContent);
      this.productSubscription.unsubscribe();
      this.get_products(page,null);
      this.scrollTop();
    }
  }

  seePreviousBtnPage(){
    if(Math.abs(this.i) < (this.productBtnContainer?.nativeElement.children.length / 2) && this.productBtnContainer!.nativeElement.children.length > 3 ){
      this.transformStep -= 38;
      this.i -= 1;
      this.productBtnContainer!.nativeElement.style.transform = `translateX(${this.transformStep}px)`;
    }
  }

  seeNextBtnPage(){
    if( this.i < 0 && this.productBtnContainer!.nativeElement.children.length > 3){
      this.i += 1;
      this.transformStep += 38;
      this.productBtnContainer!.nativeElement.style.transform = `translateX(${this.transformStep}px)`;
  }
  }

  getCookie(cname : string) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  changeProductCategory(e : any){
    e.stopPropagation();
    let num_cat = Number(e.target.dataset.category);
    if(this.currentCategory != num_cat){
      this.currentCategory = num_cat;
      this.productSubscription.unsubscribe();
      this.get_products(null,this.currentCategory);
      this.transformStep = 0;
      this.i = 0;
      this.scrollTop();
    }
    
  }

  userSearchProduct(search : string){
    this.currentSearchTerm = search.toLocaleLowerCase();
    if(this.products){
      
      let count : number = 0; //Compte le nombre de carte produit avec la classe hide
      let nativeProductCardsElement  = this.productCards?.map((elt) => elt.nativeElement);
      nativeProductCardsElement?.forEach(card =>{
        let productTitle : string = card.querySelector("h4").textContent.slice(0,-3);
        for(let product of this.products){
          if(product["title"].includes(productTitle)){
            productTitle = product["title"];
            break;
          }
        }
        productTitle = productTitle.toLocaleLowerCase();
        let isVisible = productTitle.includes(this.currentSearchTerm ?? "");
        card.classList.toggle("hide",!isVisible);
        if(card.classList.contains("hide")){
          count++;
        }else{
            count--;
        }
      });
      
      if( count == nativeProductCardsElement?.length){
        this.hideNotFoundSvg = false;
      }else{
        this.hideNotFoundSvg = true;
      }
  }
}

  ngOnInit(): void {
      this.searchTermSubscription = this.shareDataBtwCompService.currentSearchTerm$.subscribe(term => this.userSearchProduct(term));
      this.shareDataBtwCompService.updateHeaderBottomContent(0);
  }

  ngOnDestroy(): void {
    this.searchTermSubscription.unsubscribe();
    this.productSubscription.unsubscribe();
  }
 
}
