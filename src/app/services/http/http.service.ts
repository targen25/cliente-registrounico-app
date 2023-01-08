import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { IHttpParams } from 'src/app/interfaces/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient)
   { }

  private httpCall({ method, url, data }: IHttpParams): Observable<any> {

    if (method === 'delete' || method === 'get') { return this.http[method](url); }

    return this.http[method]<any>(url, data);
  }

  public delete<T>(url: string): Observable<T> {
    return this.httpCall({ method: 'delete', url, data: false});
  }

  public get<T>(url: string): Observable<T> {
    return this.httpCall({ method: 'get', url, data: false});
  }

  public post<T>(url: string, data: any): Observable<T> {
    return this.httpCall({ method: 'post', url, data});
  }

  public put<T>(url: string, data: any): Observable<T> {
    return this.httpCall({ method: 'put', url, data});
  }  
}
