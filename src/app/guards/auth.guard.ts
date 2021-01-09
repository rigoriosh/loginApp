import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private servAuth: AuthService, private miRouter: Router){}

  canActivate(
    route: ActivatedRouteSnapshot, // a que ruta se quiere ir
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      console.log('on the gard');
      if (this.servAuth.estaAutenticado()){
        return true;
      } else{
        this.miRouter.navigateByUrl('/login');
        return false;
      }
  }
  
}
