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
   }

   leerToken(): void{
     if (localStorage.getItem('token')){
       this.userToken = localStorage.getItem('token') + '';
     }else{
      this.userToken = '';
     }
   }
}
