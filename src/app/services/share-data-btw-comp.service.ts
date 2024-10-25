import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ShareDataBtwCompService {

  constructor() { }

  headerBottomContent = new BehaviorSubject(0);
  headerBottomContent$ = this.headerBottomContent.asObservable();

  updateHeaderBottomContent(num : number){
    this.headerBottomContent.next(num);
  }

  searchTerm = new BehaviorSubject("");
  currentSearchTerm$ = this.searchTerm.asObservable();

  formType = new BehaviorSubject(true); // est utilise pour mettre a jour le boolean isLoginForm dans
  // log in log out component dans le but de modifier le style dependant du formulaire afficher
  currentFormType$ = this.formType.asObservable();

  unauthorizedError = new BehaviorSubject(false);
  unauthorizedError$ = this.unauthorizedError.asObservable();

  updateIsLoginFormBoolean(isLoginForm : boolean){
    this.formType.next(isLoginForm);
  }
  updateSearchTerm(searchTerm : string){
    this.searchTerm.next(searchTerm);
  }

  updateUnauthorizedError(value : boolean){
    this.unauthorizedError.next(value);
  }

}
