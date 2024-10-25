import { HttpInterceptorFn } from '@angular/common/http';

export const addTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem("access");
  // Le middleware d'authentification jwt verifie les tokens avant meme
  // que les permissions soient verifier ce qui pose probleme pour ce endpoint
  // par exemeple http://127.0.0.1:8000/apiv1/users/register/, pour l'instant
  // ajoutons cette condition req.url != "http://127.0.0.1:8000/apiv1/users/register/"
  // Nous ferons si le temps nous le permet un travail plus propre en creant
  // custom middleware
  if(token  &&  req.url != "http://127.0.0.1:8000/apiv1/users/register/" && req.url != "http://127.0.0.1:8000/apiv1/products/" ){
    req = req.clone({headers : req.headers.set("Authorization",`Bearer ${token}`)});
  }
  return next(req);
};
