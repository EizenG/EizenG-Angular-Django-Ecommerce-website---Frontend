import {ChangeDetectorRef, Component, ElementRef, OnDestroy, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';
import { NgOptimizedImage, SlicePipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ShareDataBtwCompService } from '../services/share-data-btw-comp.service';

@Component({
  selector: 'app-panier',
  standalone: true,
  imports: [SlicePipe, RouterLink, NgOptimizedImage],
  templateUrl: './panier.component.html',
  styleUrl: './panier.component.css'
})
export class PanierComponent implements OnDestroy {

  panierProducts: any;
  getUserPanierSubscription !: Subscription;
  updateUserPanierSubscription !: Subscription;
  deleteProductFromUserPanierSubscription !: Subscription;
  @ViewChild("userMessage") userMessage?: ElementRef;
  isAuthenticated ?: boolean;
  @ViewChild("main") main?: ElementRef;
  AllProducttotal : number = 0;
  taxe : number = 0;
  frais : number = 0;
  totalWithAllCharge ?: number = 0;
  @ViewChildren("productTotalPrice") productTotalPriceSpans?: QueryList<ElementRef>;
  @ViewChildren("produit") divWithClassProduit?: QueryList<ElementRef<HTMLDivElement>>;

  constructor(private authService: AuthService, private router: Router, private cdrf: ChangeDetectorRef,private sdbcompService : ShareDataBtwCompService) {
    
    this.getUserPanierSubscription = this.authService.getUserPanier().subscribe({
      next: (resp) => {
        this.isAuthenticated = true;
        this.panierProducts = resp["products"];
        if(this.panierProducts){
          for(let product of this.panierProducts){
            this.AllProducttotal += product.price * product.quantity;
            this.frais = Number((this.AllProducttotal * 0.05).toFixed(2));
            this.taxe = Number((this.AllProducttotal * 0.07).toFixed(2));
            this.totalWithAllCharge = Number((this.AllProducttotal + this.frais + this.taxe).toFixed(2));
          }
        }
      },
      error: (error) => {
        this.isAuthenticated = false;
        this.panierProducts = [];
      }
    });

    this.sdbcompService.updateHeaderBottomContent(1);

  }

  // fonction permettant le calcul du total, frais, taxes, total avec tous les charges.
  calculateTotal() {
    this.cdrf.detectChanges();
    let totalWithoutCharge = 0;
    this.productTotalPriceSpans?.forEach(span => {
      totalWithoutCharge += Number(span.nativeElement.textContent.slice(0, -2));
    });

    totalWithoutCharge = Number(totalWithoutCharge.toFixed(2));
    this.AllProducttotal = totalWithoutCharge;
    this.frais = Number((totalWithoutCharge * 0.05).toFixed(2));
    this.taxe = Number((totalWithoutCharge * 0.07).toFixed(2));

    this.totalWithAllCharge = Number((totalWithoutCharge * 0.05 + totalWithoutCharge * 0.07 + totalWithoutCharge).toFixed(2));
  }

  moins(quantity: HTMLSpanElement, compteur: HTMLDivElement) {
    let priceSpan = compteur.previousElementSibling;
    if (Number(quantity.textContent) > 1)
      quantity.textContent = `${Number(quantity.textContent) - 1}`;

    let newTotal = (Number(priceSpan?.textContent?.slice(0, -2)) * Number(quantity.textContent)).toFixed(2);
    compteur.nextElementSibling!.innerHTML = `${newTotal} <span>$</span>`;

    this.calculateTotal();
  }

  plus(quantity: any, compteur: HTMLDivElement) {
    let priceSpan = compteur.previousElementSibling;
    if (Number(quantity.textContent) <= 999)
      quantity.textContent = `${Number(quantity.textContent) + 1}`;

    let newTotal = (Number(priceSpan?.textContent?.slice(0, -2)) * Number(quantity.textContent)).toFixed(2);
    compteur.nextElementSibling!.innerHTML = `${newTotal} <span>$</span>`;

    this.calculateTotal();
  }

  goToHome() {
    let data: string = "";
    this.divWithClassProduit?.forEach((div) => {
      let productAsin = Array.from(div.nativeElement.classList).filter((value, index) => {
        return !value.includes('produit');
      })[0];
      let quantity = Number(div.nativeElement.nextElementSibling?.nextElementSibling?.children[1].textContent);
      if (data)
        data += `/${productAsin};${quantity}`;
      else
        data += `${productAsin};${quantity}`;
    });
    this.updateUserPanierSubscription = this.authService.updateUserPanier(data).subscribe({
      next: (res) => {

      },
      error: (err) => {
        alert("Something gone wrong...!");
      }
    });
    this.router.navigateByUrl("/");
  }

  removeProduct(asin: string) {
    this.panierProducts = this.panierProducts.filter((value: any, index: number) => {
      return !value["asin"].includes(asin)
    });
    this.deleteProductFromUserPanierSubscription = this.authService.deleteProductFromUserPanier(asin).subscribe({
      next: resp => {
        //  nothing to do here
      },
      error: err => {
        alert("Something gone wrong...!");
      }
    });
    this.calculateTotal();
  }

  validateOrder() {
    // Cette fonctionalite necessitant de gerer le paiement , n'a pas ete developpee
    this.router.navigateByUrl("/user/panier/validation");
  }

  ngOnDestroy(): void {
    this.getUserPanierSubscription.unsubscribe();
    if(this.updateUserPanierSubscription)
      this.updateUserPanierSubscription.unsubscribe();
    if (this.deleteProductFromUserPanierSubscription)
      this.deleteProductFromUserPanierSubscription.unsubscribe();

  }

}
