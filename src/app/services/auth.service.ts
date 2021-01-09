import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioModel } from '../models/usuario.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = 'https://identitytoolkit.googleapis.com/v1/accounts';
  private API_KEY = 'AIzaSyDxUfmfcCyBkIVVI-RZBzusVLEJRtFovKI';
  endPointToCreateNewUsers = `${this.url}:signUp?key=${this.API_KEY}`;
  endPointToLogin = `${this.url}:signInWithPassword?key=${this.API_KEY}`;
  userToken = '';
   constructor(private myHttp: HttpClient) {
     this.leerToken();
   }

   logOut(): void{
     localStorage.removeItem('token');
   }
   logIn(usuario: UsuarioModel): any{
    const authData = {
      ...usuario, // agrega toda la data del objeto usuario
      returnSecureToken: true
    };
    return this.myHttp.post(this.endPointToLogin, authData)
    .pipe(map((resp: any) => {
      console.log('ingreso en el map del rxjs');
      this.guardarToken(resp.idToken);
      return resp;
    }));
   }

   registrarNuevoUsuario(usuario: UsuarioModel): any{
     const authData = {
       ...usuario, // agrega toda la data del objeto usuario
       returnSecureToken: true
     };
     return this.myHttp.post(this.endPointToCreateNewUsers, authData)
             .pipe(map((resp: any) => {
               console.log('ingreso en el map del rxjs');
               this.guardarToken(resp.idToken);
               return resp;
             }));
   }

   private guardarToken(idToken: string): void{
     this.userToken = idToken;
     localStorage.setItem('token', idToken);
     const hoy: Date = new Date();
     hoy.setSeconds(3600);
     localStorage.setItem('expira', hoy.getTime().toString());
   }

   leerToken(): void{
     if (localStorage.getItem('token')){
       this.userToken = localStorage.getItem('token') + '';
     }else{
      this.userToken = '';
     }
   }

   estaAutenticado(): boolean{
     if (this.userToken.length < 2) {
       console.log(5);
       return false;
     }

     const expira = Number(localStorage.getItem('expira'));
     const expiraDate = new Date();
     expiraDate.setTime(expira);
     const horaActual = new Date();
     if (expiraDate > horaActual) {
       console.log(6);
       return true;
     } else {
      console.log(7);
      return false;
     }
   }
}
