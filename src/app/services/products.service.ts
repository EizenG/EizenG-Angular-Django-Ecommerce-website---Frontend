import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

const baseUrl = "http://127.0.0.1:8000/apiv1";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http : HttpClient) { }

  get_products(page : number | null = null,category : number | null = null) : Observable<any>{
    let queryParams = null;
    if(page && category)
      queryParams = {page : page,category : category};
    else if (page)
      queryParams = {page : page};
    else if (category)
      queryParams = {category : category};

    if( queryParams)
      return this.http.get(`${baseUrl}/products/`,{params:queryParams})
    else
      return this.http.get(`${baseUrl}/products/`)
  }

  get_product(asin : string | null){
    return this.http.get(`${baseUrl}/products/${asin}/`)
  }

  addProductToCart(asin : string,quantity : number){
    return this.http.post(`${baseUrl}/addToCart/`,{"asin" : asin,"quantity" : quantity})
  }
}

