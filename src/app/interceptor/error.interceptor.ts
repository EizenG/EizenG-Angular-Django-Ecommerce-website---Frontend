import { HttpClient, HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { ShareDataBtwCompService } from '../services/share-data-btw-comp.service';
import { AuthService } from '../services/auth.service';


let shareDataService = new ShareDataBtwCompService();

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) =>{
        let errorMessage = 'Unknown error!';
    
        if (error.error instanceof ErrorEvent) {
          // Client-side errors
          errorMessage = `Error: ${error.error.message}`;
        
        } else {
          // Server-side errors
          errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
          if( error.status == 400){
            if (error.error && error.error.errors) {
              errorMessage = Object.values(error.error.errors).flat().join('; ');
            } else {
              errorMessage = 'Bad Request';
            }

          }else if (error.status == 401){
            errorMessage = "unauthorized";
          }else if(error.status == 404){
            errorMessage = "notFound";
          }
        }
        return throwError(() => new Error(errorMessage));
    })
  );
};
