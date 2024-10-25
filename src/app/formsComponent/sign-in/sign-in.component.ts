import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { ShareDataBtwCompService } from '../../services/share-data-btw-comp.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,],
  templateUrl: './sign-in.component.html',
  styleUrls : ['./sign-in.component.css','../commonStyle.css']
})
export class SignInComponent implements AfterViewInit,OnDestroy {
  @ViewChild("eyeBtn") eyeBtn ?: ElementRef;
  @ViewChild("passwordInput") passwordInput ?: ElementRef;
  signInForm = this.fb.group({
    "email" : ['',[Validators.required,Validators.email]],
    "password" : ['',Validators.required]
  });
  hasLoginError : boolean = false;
  unauthorizedError ?: boolean;
  loginSubscription ?: Subscription;
  unauthorizedErrorSubscription ?: Subscription;
  
  constructor(private shareDataBtwComp : ShareDataBtwCompService, private fb : FormBuilder,
    private authService : AuthService,private router : Router,private cdrf : ChangeDetectorRef){}

  ngAfterViewInit(): void {
    this.shareDataBtwComp.updateIsLoginFormBoolean(true);
    this.unauthorizedErrorSubscription = this.shareDataBtwComp.unauthorizedError$.subscribe(
      (value : boolean)=>{
        this.unauthorizedError = value;
        this.cdrf.detectChanges();
      }
    )
  }

  showOrHidePassword(){
    if(this.passwordInput?.nativeElement.type == "password" && this.eyeBtn?.nativeElement){
      this.passwordInput.nativeElement.type = "text";
      this.eyeBtn.nativeElement.src = "../../../assets/images/eye-slash-regular.svg";
    }else if(this.passwordInput?.nativeElement.type == "text" && this.eyeBtn?.nativeElement){
      this.passwordInput.nativeElement.type = "password";
      this.eyeBtn.nativeElement.src = "../../../assets/images/eye-regular.svg";
    }
  }

  submit(){
    let user = {
      email : this.signInForm.value['email'],
      password : this.signInForm.value['password']
    }
    this.loginSubscription = this.authService.signIn(user).subscribe({
      next : (resp : any) =>{
        localStorage.setItem("access",resp["access"]);
        localStorage.setItem("refresh",resp["refresh"]);
        this.shareDataBtwComp.updateUnauthorizedError(false);
        this.router.navigateByUrl("/");
        this.hasLoginError = false;
      },
      error : (error) =>{
        this.hasLoginError = true;
      }
    });
  }

  ngOnDestroy(): void {
      this.loginSubscription?.unsubscribe();
      this.unauthorizedErrorSubscription?.unsubscribe();
  }

}
