import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
  ]
})
export class HomeComponent implements OnInit {

  constructor(
    private miAuth: AuthService,
    private misRutas: Router
  ) { }

  ngOnInit(): void {
  }

  salir(): void{
    this.miAuth.logOut();
    this.misRutas.navigateByUrl('/login');
  }

}
