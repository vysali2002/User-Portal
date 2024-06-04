import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { authGuard } from './guards/auth.guard';

const routes: Routes =
 [{ path: 'users',canActivate:[authGuard] ,loadChildren: () => import('./modules/users/users.module').then(m =>
   m.UsersModule) },
   {path:'',component:LoginComponent },
   {path:'dashboard',component:HomeComponent , canActivate:[authGuard]}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
