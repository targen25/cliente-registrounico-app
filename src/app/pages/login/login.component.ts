import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsernamePasswordCredentials } from '../../interfaces/user';
import { UserService } from 'src/app/services/user/user.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  

  constructor(
    private userService : UserService,
    private router: Router,
    )
   { }

  ngOnInit(): void {
  }
  
  loginUsuario(form: NgForm): void {
    //debugger;
    const userLoginRequest : UsernamePasswordCredentials = {
        username: form.value.user,
        password: form.value.password
      };
      this.userService.signInUsername(userLoginRequest)
      .then(()=>{
        //debugger;
        this.router.navigate(['/']);
      })
      .catch((error)=>{
        Swal.fire('Hubo problemas con el servicio de login')
      })
  
    }  

}
