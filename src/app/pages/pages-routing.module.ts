import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guards/auth/auth.guard';
import { UnauthGuard } from '../guards/unauth/unauth.guard';

const routes: Routes = [
  {
    path:'login',
    loadChildren:()=>import('./login/login.module').then(m=>m.LoginModule),
    canActivate: [UnauthGuard] //se mostrará este o no este loqueado(check=true)
  },  
  {
    path:'registration',
    loadChildren:()=>import('./registration/registration.module').then(m=>m.RegistrationModule),
    canActivate: [UnauthGuard]
  },  
  {
    path:'gasto-diario',
    loadChildren:()=>import('./gasto-diario/gasto-diario.module').then(m=>m.GastoDiarioModule),
    canActivate: [AuthGuard]//solo se verá cuando esta loqueado, cuando tiene una sesión activa (check=true)
  },  
  {
    path:'welcome',
    loadChildren:()=>import('./welcome/welcome.module').then(m=>m.WelcomeModule),
    canActivate: [AuthGuard]
  },
  {
    path:'404',
    loadChildren:()=>import('./not-found/not-found.module').then(m=>m.NotFoundModule)
  },  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
