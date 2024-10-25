import {ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { ProductsService } from '../services/products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ShareDataBtwCompService } from '../services/share-data-btw-comp.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent implements OnDestroy,OnInit {
  productDataSubscription : any;
  quantity : number = 1;
  productData : any = {};
  categories = ["Tous les produits","Ordinateur et ordinateur portable","Accessoires informatiques","Téléphone intelligent",
                "Casque d'écoute", "Accessoires mobiles","Console de jeu","Appareil Photo et Photo","TV & électroménager"
                ,"Montres & accessoires","GPS et Navigation","Technologie chauffable"];
  hideNotFoundSvg : boolean = true;
  @ViewChild("usermsg") userMsg !: ElementRef;
  
  constructor(private productsService : ProductsService,private route : ActivatedRoute, private shareDateBtwComp : ShareDataBtwCompService, private router : Router){
    this.productDataSubscription = this.productsService.get_product(this.route.snapshot.paramMap.get('asin')).subscribe({
      next: (data : any) => {
        this.productData = data;
        if(data["Errormessage"]){
          this.hideNotFoundSvg = false;
        }
      },
      error: (e) => alert("Oups erreur!!! Veuillez reessayer...")
  });

  }

  changeQuantity(event : any,value : number){
    if(Math.abs(value) == 1){
      if(value < 0 && this.quantity > 1){
        this.quantity = this.quantity + value;
      }else if(value > 0 && this.quantity < 1000){
        this.quantity += value;
      }
    }
  }

  addToCart(){
    this.productsService.addProductToCart(this.productData["asin"], this.quantity).subscribe(
      {
        next : (resp)=>{ 
          this.userMsg.nativeElement.innerHTML += `
            <div class="alert alert-success alert-dismissible fade show" role="alert">
              <strong>Le produit a ete ajoute au panier!</strong>
              <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
          `;
        },
        error : (error)=> {
          if(error.message == "unauthorized"){
            this.router.navigateByUrl("/signInRegister/signIn");
            this.shareDateBtwComp.updateUnauthorizedError(true);
          }else if(error.message = "notFound"){
            this.router.navigateByUrl("/");
            alert("Le produit n'est pas trouve, veuillez passer par le home.")
          }
        }
      }
    )
  }
  
  ngOnDestroy(): void {
      this.productDataSubscription.unsubscribe();
  }
  ngOnInit(): void {
      this.shareDateBtwComp.updateHeaderBottomContent(2);
  }
}
