import { MaterialModule } from './../../material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GastoDiarioRoutingModule } from './gasto-diario-routing.module';
import { GastoDiarioComponent } from './gasto-diario.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    GastoDiarioComponent
  ],
  imports: [
    CommonModule,
    GastoDiarioRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
  ]
})
export class GastoDiarioModule { }
