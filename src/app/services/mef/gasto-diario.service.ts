import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { environment } from 'src/environments/environment';
import { GastoDiarioRequest, GastoDiarioResponse } from 'src/app/interfaces/gasto-diario';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GastoDiarioService {

  constructor(private http: HttpService) { }
  
  public async getGastoDiarioList(gastoDiarioRequest: GastoDiarioRequest): Promise<GastoDiarioResponse[]> {

    const url = environment.url + 'gateway/mef/gastoDiarioPorAnioMes/'+gastoDiarioRequest.anoEje+'/'+gastoDiarioRequest.mesEje+'/'+gastoDiarioRequest.page+'/'+gastoDiarioRequest.size;
    return  await firstValueFrom(this.http.get<GastoDiarioResponse[]>(url));
  }  
}
