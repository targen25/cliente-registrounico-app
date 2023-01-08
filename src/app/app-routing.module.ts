import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [ 
  {
    path: '',
    children: [
      {
        path: 'pages',
        loadChildren: () => import('./pages/pages.module').then(m=>m.PagesModule)
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'pages/welcome'
      }
    ]
  },
   {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'pages/login'
  },  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
