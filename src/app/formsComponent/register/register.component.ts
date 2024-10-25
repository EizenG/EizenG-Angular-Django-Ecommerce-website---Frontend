import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { ShareDataBtwCompService } from '../../services/share-data-btw-comp.service';
import { Router } from '@angular/router';
import { FormBuilder,Validators,ReactiveFormsModule } from '@angular/forms';
import { CommonModule, NgFor } from '@angular/common';
import { ErrorService } from '../../services/error.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './register.component.html',
  styleUrls:['./register.component.css','../commonStyle.css']
})
export class RegisterComponent implements AfterViewInit,OnDestroy {
  
  registerForm = this.formBuilder.group({
    firstName : ['',[Validators.required,Validators.maxLength(50)]],
    lastName : ['',[Validators.required,Validators.maxLength(50)]],
    birthDate : ['',Validators.required],
    email : ['',[Validators.email,Validators.required]]
  });

  errorSubscription ?: Subscription ;
  errorMessage ?: string[];
  
  constructor(private shareDataBtwComp : ShareDataBtwCompService, private router : Router,private formBuilder : FormBuilder
    ,private errorService : ErrorService,private crf : ChangeDetectorRef){}

  ngAfterViewInit(): void {
    this.shareDataBtwComp.updateIsLoginFormBoolean(false);
    this.errorSubscription = this.errorService.errorBehaviorSubject$.subscribe((value : string) =>{
      this.errorMessage = value.split(";");
      this.crf.detectChanges();
    });
  }

  setCookie(cname : string, cvalue : any, exmin : number) {
    const d = new Date();
    d.setTime(d.getTime() + (exmin*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }

  navigateToRegisterNext(cookieDuration : number = 30){
    this.setCookie("first_name",this.registerForm.value["firstName"],cookieDuration);
    this.setCookie("last_name",this.registerForm.value["lastName"],cookieDuration);
    this.setCookie("email",this.registerForm.value["email"],cookieDuration);
    this.setCookie("birth_date",this.registerForm.value["birthDate"],cookieDuration);
    this.errorService.updateErrorMessage("");
    this.router.navigateByUrl("/signInRegister/register/next");
  }

  ngOnDestroy(): void {
      this.errorSubscription?.unsubscribe();
  }

}
