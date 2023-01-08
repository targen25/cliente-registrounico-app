import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserCreateRequest } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user/user.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  constructor(
    private userService : UserService,
    private router: Router
    ) 
  { }

  ngOnInit(): void {
  }
  registrarUsuario(form: NgForm) {
    if(form.valid) {     
      const userCreateRequest : UserCreateRequest =  {
          nombre: form.value.nombre,
          apellido: form.value.apellidos,
          telefono: form.value.telefono,
          username: form.value.username,
          email: form.value.email,
          password: form.value.password
        }
        this.userService.signUpUsername(userCreateRequest)
        .then(()=>{
          //debugger;
          this.router.navigate(['/']);
        })
        .catch((error)=>{
          Swal.fire('Hubo problemas con el servicio de registración')
        })
        
    }

  }
}
