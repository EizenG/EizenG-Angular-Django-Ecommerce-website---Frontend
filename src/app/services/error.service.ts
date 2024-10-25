import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor() { }

  errorBehaviorSuject = new BehaviorSubject('');
  errorBehaviorSubject$ = this.errorBehaviorSuject.asObservable();

  updateErrorMessage(value : string){
    this.errorBehaviorSuject.next(value);
  }

}
