import { Routes } from '@angular/router';
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { LogInLogOutComponent } from './log-in-log-out/log-in-log-out.component';
import { SignInComponent } from './formsComponent/sign-in/sign-in.component';
import { RegisterComponent } from './formsComponent/register/register.component';
import { RegisterNextComponent } from './formsComponent/register-next/register-next.component';
import { PanierComponent } from './panier/panier.component';
import { ValidationComponent } from './validation/validation.component';
import { UserParamsComponent } from './user-params/user-params.component';
import { ProfileComponent } from './profile/profile.component';

export const routes: Routes = [
    {path:"",component:ProductsListComponent},
    {path :"producDetail/:asin",component:ProductDetailComponent},
    {path :"signInRegister",component:LogInLogOutComponent,
     children:[
        {path:"signIn",component:SignInComponent},
        {path:"register",component:RegisterComponent},
        {path:"register/next",component:RegisterNextComponent}
     ]
    },
    {path:"user/panier",component:PanierComponent},
    {path:"user/panier/validation",component:ValidationComponent},
    {path: "user/params", component: UserParamsComponent },
    { path: "user/profile", component: ProfileComponent },
    {path:"**",component : ProductsListComponent},
];
