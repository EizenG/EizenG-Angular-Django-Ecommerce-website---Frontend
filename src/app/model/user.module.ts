// Nous retrouvons tous les champs necessaires a l'inscription
export interface User {
    "first_name" : string ;
    "last_name"  : string ;
    "email": string ;
    "birth_date" : string;
    'password1': string | null;
    'password2': string ;
}
