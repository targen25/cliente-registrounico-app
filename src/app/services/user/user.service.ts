import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { UserCreateRequest, UsernamePasswordCredentials, UserResponse } from 'src/app/interfaces/user';
import { HttpService } from '../http/http.service';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userResponse: UserResponse = {
    id: 0,
    username: '',
    nombre: '',
    apellido: '',
    telefono: '',
    email: '',
    token: ''
  }
  private loginStatus = new BehaviorSubject<boolean>(this.checkLoginStatus())
  private user: BehaviorSubject<UserResponse> = new BehaviorSubject<UserResponse>(this.userResponse)

  constructor(private http: HttpService) { }

  public async signUpUsername(userCreateRequest: UserCreateRequest): Promise<UserResponse> {
    const url = environment.url + 'api/authentication/sign-up';
    return await firstValueFrom(this.http.post<UserResponse>(url, userCreateRequest)
    .pipe(
      tap((data) => {
        localStorage.setItem('ru_token', data.token);
        this.user.next(data)
        this.loginStatus.next(true);
      })

    ));
  }
  public async signInUsername(usernamePasswordCredentials: UsernamePasswordCredentials): Promise<UserResponse> {
    const url = environment.url + 'api/authentication/sign-in';
    return await firstValueFrom(this.http.post<UserResponse>(url, usernamePasswordCredentials)
      .pipe(
        tap((data) => {
          localStorage.setItem('ru_token', data.token);
          this.user.next(data)
          this.loginStatus.next(true);
        })

      ));
  }
  public async userCurrent(): Promise<UserResponse> {
    //debugger;
    const url = environment.url + 'api/user/userCurrent';
    return await firstValueFrom(this.http.get<UserResponse>(url)
      .pipe(
        tap((data) => {
          this.user.next(data)
          this.loginStatus.next(true);
        })
      ));
  }
  logout() {
    localStorage.removeItem('ru_token');
    this.loginStatus.next(false);
    this.user.next(this.userResponse);
  }
  checkLoginStatus(): boolean {
    return false;
  }
  get isLoggIn() {
    return this.loginStatus.asObservable();
  }
  get currentUser() {
    return this.user.asObservable();
  }


}
