import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faDoorClosed, faEdit, faHouseUser, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AgencyCardComponent } from './components/agency-card/agency-card.component';
import { LogoutComponent } from './components/logout/logout.component';
import { AgencyComponent } from './components/agency/agency.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { HousingListComponent } from './components/housing-list/housing-list.component';
import { HousingCardComponent } from './components/housing-card/housing-card.component';
import { HousingComponent } from './components/housing/housing.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    AgencyCardComponent,
    LogoutComponent,
    AgencyComponent,
    ChangePasswordComponent,
    UserProfileComponent,
    HousingListComponent,
    HousingCardComponent,
    HousingComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 
    constructor(library: FaIconLibrary){
        library.addIcons(faHouseUser, faEdit, faPlus, faMinus, faDoorClosed);
    }
}
