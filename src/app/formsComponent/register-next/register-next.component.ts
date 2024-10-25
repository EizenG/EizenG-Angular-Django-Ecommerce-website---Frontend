import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { User } from '../../model/user.module';
import { Router } from '@angular/router';
import { ShareDataBtwCompService } from '../../services/share-data-btw-comp.service';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';
import { ErrorService } from '../../services/error.service';

@Component({
  selector: 'app-register-next',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './register-next.component.html',
  styleUrls : ['./register-next.component.css','../commonStyle.css']
})
export class RegisterNextComponent implements AfterViewInit,OnDestroy {

  ruleInputChecked : boolean = false;
  registerNextForm = this.fb.group({
    password1 : ['',[Validators.required,Validators.minLength(8)]],
    password2 : ['',[Validators.required,Validators.minLength(8)]]
  });
  @ViewChild("alertContainer") alertContainer ?: ElementRef<HTMLDivElement>;
  authSuBscriber ?: Subscription;

  constructor(private fb : FormBuilder, private router : Router,private shareDataBtwComp : ShareDataBtwCompService,private authService : AuthService
    ,private errorService : ErrorService){}

  ngAfterViewInit(): void {
    this.shareDataBtwComp.updateIsLoginFormBoolean(false);
  }

  showOrHidePassword(event : MouseEvent){
    
    let eyeBtn = (event.target as HTMLImageElement);
    let passwordInput = (eyeBtn.previousElementSibling as HTMLInputElement);
    if(passwordInput?.type == "password"){
      passwordInput.type = "text";
      eyeBtn.src = "../../../assets/images/eye-slash-regular.svg";
    }else if(passwordInput?.type == "text"){
      passwordInput.type = "password";
      eyeBtn.src = "../../../assets/images/eye-regular.svg";
    }
    
  }

  passwordError(value : string) : boolean{
    if(this.registerNextForm.get(`password${value}`)?.invalid && (this.registerNextForm.get(`password${value}`)?.touched || this.registerNextForm.get(`password${value}`)?.dirty)){
      return true;
    }

    return false;
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

  register() : void{
    if(this.registerNextForm.valid){
      
      if(this.registerNextForm.value['password1'] != this.registerNextForm.value['password2']){
        this.alertContainer!.nativeElement.innerHTML += `
        <div class="alert alert-danger alert-dismissible fade show" role="alert">
          <strong>Les mots de passe que vous avez saisis ne correspondent pas.</strong>
          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
        `;
      }else{
        let newUser : User ={
          first_name: this.getCookie('first_name'),
          last_name: this.getCookie('last_name'),
          email: this.getCookie('email'),
          birth_date: this.getCookie('birth_date'),
          password1: this.registerNextForm.value['password1']?this.registerNextForm.value['password1']:"",
          password2: this.registerNextForm.value["password2"] ? this.registerNextForm.value["password2"] : ""
        }
        if(!(newUser.birth_date && newUser.email && newUser.first_name && newUser.last_name)){
          alert("Un ou plusieurs des champs sont manquants!");
          this.router.navigateByUrl("/signInRegister/register");
        }else{
          this.authSuBscriber = this.authService.register(newUser).subscribe({
            next : (resp) =>{
              localStorage.setItem("access",resp["access"]);
              localStorage.setItem("refresh",resp["refresh"]);
              this.router.navigateByUrl("/");
            },
            error :(error : Error) =>{
              this.errorService.updateErrorMessage(error.message);
              this.router.navigateByUrl("/signInRegister/register");
            }
          });
        }
      }
    }
    
  }

  ngOnDestroy(): void {
      this.authSuBscriber?.unsubscribe();
  }
}
