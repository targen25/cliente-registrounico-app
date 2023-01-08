import { GastoDiarioRequest } from './../../interfaces/gasto-diario';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { GastoDiarioResponse } from '../../interfaces/gasto-diario';
import Swal from 'sweetalert2';
import { GastoDiarioService } from 'src/app/services/mef/gasto-diario.service';

@Component({
  selector: 'app-gasto-diario',
  templateUrl: './gasto-diario.component.html',
  styleUrls: ['./gasto-diario.component.scss']
})
export class GastoDiarioComponent implements OnInit {
  dataSource: GastoDiarioResponse[] | null = [];
  listaMes: any = [];
  tieneData = false;

  displayedColumns: string[] = ['anoEje', 'mesEje', 'nivelGobiernoNombre', 'sectorNombre', 'pliegoNombre', 'departamentoEjecutoraNombre', 'provinciaEjecutoraNombre', 'distritoEjecutoraNombre', 'programaPptoNombre', 'especificaDetNombre', 'montoCertificado', 'montoComprometidoAnual', 'montoGirado'];

  length: number | null | undefined = 0;
  pageSize = 10;
  pageSizeOptions: number[] = [10, 25, 50, 100];

  formBuscar = {
    pageSize: 10,
    startIndex: 0,
    totalSize: 0,
    numAnio: 0,
    numMes: 0
  }
  loading$ !: Observable<boolean | null>
  constructor(
    private gastoDiarioService : GastoDiarioService
    ) { }

  ngOnInit(): void {
    const fecha = new Date();
    //debugger;
    this.formBuscar.numAnio = Number(fecha.getFullYear().toLocaleString('es-PE').replace(',', ''));
    this.formBuscar.numMes = Number(fecha.getMonth().toLocaleString('es-PE')) + 1;
    this.llenarCombos();
  }
  validarCampos() {
    //debugger;
    let rpta = true;
    if (this.formBuscar.numAnio == 0) {
      Swal.fire('Debe ingresar el parametro AÑO')
      rpta = false;
    }
    else {
      if (this.formBuscar.numMes == 0) {
        Swal.fire('Debe ingresar el parametro MES')
        rpta = false;
      }
    }
    return rpta;
  }
  btnBuscar() {
    //debugger;    
    if (this.validarCampos()) {
      const gastoDiarioRequest: GastoDiarioRequest = {
        anoEje: this.formBuscar.numAnio,
        mesEje: this.formBuscar.numMes,
        page: 0,
        size: 10
      
      };
        this.gastoDiarioService.getGastoDiarioList(gastoDiarioRequest)
        .then((data)=>{
          this.tieneData = false;
          this.dataSource = data
          this.length = 0;
          if (data.length>0){
            this.tieneData = true;
            this.length = data[0].pageTotalSize;
          }
        })
        .catch((error)=>{
          Swal.fire('Hubo problemas con el servicio de retorno')
        })

    }

  }
  btnLimpiar() {
    
    const fecha = new Date();
    this.formBuscar.numAnio = Number(fecha.getFullYear().toLocaleString('es-PE').replace(',', ''));
    this.formBuscar.numMes = Number(fecha.getMonth().toLocaleString('es-PE')) + 1;
    this.dataSource = []
    this.length = this.dataSource.length;
    this.tieneData = false;
    

  }
  llenarCombos() {
    this.listaMes = [
      {
        codigo: 0,
        descripcion: 'Seleccionar'
      },
      {
        codigo: 1,
        descripcion: 'ENERO'
      },
      {
        codigo: 2,
        descripcion: 'FEBRERO'
      },
      {
        codigo: 3,
        descripcion: 'MARZO'
      },
      {
        codigo: 4,
        descripcion: 'ABRIL'
      },
      {
        codigo: 5,
        descripcion: 'MAYO'
      },
      {
        codigo: 6,
        descripcion: 'JUNIO'
      },
      {
        codigo: 7,
        descripcion: 'JULIO'
      },
      {
        codigo: 8,
        descripcion: 'AGOSTO'
      },
      {
        codigo: 9,
        descripcion: 'SETIEMBRE'
      },
      {
        codigo: '10',
        descripcion: 'OCTUBRE'
      },
      {
        codigo: 11,
        descripcion: 'NOVIEMBRE'
      },
      {
        codigo: 12,
        descripcion: 'DICIEMBRE'
      }
    ]
  }
  cambiarPage(e: any) {
    //debugger;
    const gastoDiarioRequest: GastoDiarioRequest = {
      anoEje: this.formBuscar.numAnio,
      mesEje: this.formBuscar.numMes,
      page: e.pageIndex,
      size: e.pageSize
    
    };
      this.gastoDiarioService.getGastoDiarioList(gastoDiarioRequest)
      .then((data)=>{
        this.tieneData = false;
        this.dataSource = data
        this.length = 0;
        if (data.length>0){
          this.tieneData = true;
          this.length = data[0].pageTotalSize;
        }
      })
      .catch((error)=>{
        Swal.fire('Hubo problemas con el servicio de retorno')
      })      

  }
  numberOnly(event: any) {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
}
