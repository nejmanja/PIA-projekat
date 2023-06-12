import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faBan, faCheck, faDoorClosed, faEdit, faFileUpload, faHouseUser, faMinus, faPlus, faSave, faTrash } from '@fortawesome/free-solid-svg-icons';
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
import { NewHousingComponent } from './components/new-housing/new-housing.component';
import { HouseDrawingComponent } from './components/house-drawing/house-drawing.component';
import { WorkProposalComponent } from './components/work-proposal/work-proposal.component';
import { JobsComponent } from './components/jobs/jobs.component';
import { JobCardComponent } from './components/job-card/job-card.component';
import { AgencyProfileComponent } from './components/agency-profile/agency-profile.component';
import { WorkersComponent } from './components/workers/workers.component';
import { WorkerDetailsComponent } from './components/worker-details/worker-details.component';
import { NewWorkerComponent } from './components/new-worker/new-worker.component';
import { AgencyJobsComponent } from './components/agency-jobs/agency-jobs.component';
import { AgencyJobCardComponent } from './components/agency-job-card/agency-job-card.component';
import { AcceptJobComponent } from './components/accept-job/accept-job.component';

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
    NewHousingComponent,
    HouseDrawingComponent,
    WorkProposalComponent,
    JobsComponent,
    JobCardComponent,
    AgencyProfileComponent,
    WorkersComponent,
    WorkerDetailsComponent,
    NewWorkerComponent,
    AgencyJobsComponent,
    AgencyJobCardComponent,
    AcceptJobComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 
    constructor(library: FaIconLibrary){
        library.addIcons(faHouseUser, faEdit, faPlus, faMinus, faDoorClosed, faTrash, faFileUpload, faSave, faBan, faCheck);
    }
}
