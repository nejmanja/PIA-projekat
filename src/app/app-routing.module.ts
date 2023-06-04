import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
    {path: "", component: HomeComponent},
    {path: "login", component: LoginComponent, data: {'admin': false}},
    {path: "adminLogin", component: LoginComponent, data: {'admin': true}},
    {path: "register", component: RegisterComponent},
    {path: "registerSuccess", component: LoginComponent, data: {'admin': false, 'fromReg': true}},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
