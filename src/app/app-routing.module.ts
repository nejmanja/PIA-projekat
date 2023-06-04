import { NgModule, inject } from '@angular/core';
import {
  CanActivate,
  CanActivateFn,
  Router,
  RouterModule,
  Routes,
  UrlTree,
} from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { LogoutComponent } from './components/logout/logout.component';
import { AgencyComponent } from './components/agency/agency.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';

const alreadyLoggedIn = (next, state) => {
  const router = inject(Router);
  if (sessionStorage.getItem('user') == null) return true;
  else {
    router.navigateByUrl('');
    return false;
  }
};

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'login',
    component: LoginComponent,
    data: { admin: false },
    canActivate: [alreadyLoggedIn],
  },
  { path: 'adminLogin', component: LoginComponent, data: { admin: true }, canActivate: [alreadyLoggedIn] },
  { path: 'register', component: RegisterComponent, canActivate: [alreadyLoggedIn] },
  {
    path: 'registerSuccess',
    component: LoginComponent,
    data: { admin: false, fromReg: true },
    canActivate: [alreadyLoggedIn]
  },
  {
    path: 'logout',
    component: LogoutComponent
  },
  {
    path: 'agency/:username',
    component: AgencyComponent
  },
  {
    path: 'changePassword',
    component: ChangePasswordComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
