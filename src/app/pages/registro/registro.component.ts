import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
import { Router} from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styles: [
  ]
})
export class RegistroComponent implements OnInit {

  usuario: UsuarioModel;
  recordarme = false;

  constructor(private myService: AuthService, private rutas: Router) {
    this.usuario = new UsuarioModel();
  }

  ngOnInit(): void {
    if (localStorage.getItem('email')) {
      this.usuario.email = localStorage.getItem('email') + '';
    }
  }

  onSubmit(form: NgForm): void{
    if (this.recordarme) {
      localStorage.setItem('email', this.usuario.email);
    }
    if (form.invalid){return; }
    Swal.showLoading();
    this.myService.registrarNuevoUsuario(this.usuario).subscribe( (resp: object) => {
      console.log(resp);
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Your work has been saved',
        showConfirmButton: false,
        timer: 1500
      });
      setTimeout(() => {
        this.rutas.navigateByUrl('/home');
      }, 1000);
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
