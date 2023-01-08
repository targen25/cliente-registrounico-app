import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserResponse } from './interfaces/user';
import Swal from 'sweetalert2';
import { UserService } from './services/user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'cliente-registrounico-app';
  showSpinner = false;
  user$! : Observable<UserResponse>;
  isAuthorized$!: Observable<boolean>;  

  constructor(
    private router: Router,
    private userService : UserService
    ){}  
    ngOnInit(){
      //debugger;
      this.isAuthorized$ = this.userService.isLoggIn;
      this.user$ = this.userService.currentUser;
      const token = localStorage.getItem('ru_token');
      if (token){
        this.userService.userCurrent()
        .then(()=>{
  
        })
        .catch((error)=>{
          Swal.fire('Hubo problema con el servicio consultado')
        });
      }


 
    }

    onSignOut() : void {
      this.userService.logout();

      this.router.navigate(['/pages/login']);
    }       
}
