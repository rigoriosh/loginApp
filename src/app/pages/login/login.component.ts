import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
import { Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  usuario = new UsuarioModel();
  recordarme = false;

  constructor(private myService: AuthService, private rutas: Router) { }

  ngOnInit(): void {
    if (localStorage.getItem('email')) {
      this.rutas.navigateByUrl('/home');
    }
  }

  login(form: NgForm): void{
    if (form.invalid){return; }
    Swal.fire({
      title: 'Hi',
      text: 'Wait please'
    });
    Swal.showLoading();
    this.myService.logIn(this.usuario).subscribe( (resp: object) => {
      console.log(resp);
      Swal.close();
      setTimeout(() => {
        this.rutas.navigateByUrl('/home');
      }, 1000);
      if (this.recordarme) {
        localStorage.setItem('email', this.usuario.email);
      }
    }, (err: any) => {
      console.log();
      Swal.fire(
      {
        icon: 'error',
        title: 'Oops...',
        text: err.error.error.message,
        footer: '<a href>Why do I have this issue?</a>'
      });
    });
  }

}
