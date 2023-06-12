import { NgModule, inject } from '@angular/core';
import {
  Router,
  RouterModule,
  Routes,
} from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { LogoutComponent } from './components/logout/logout.component';
import { AgencyComponent } from './components/agency/agency.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { HousingListComponent } from './components/housing-list/housing-list.component';
import { HousingComponent } from './components/housing/housing.component';
import { NewHousingComponent } from './components/new-housing/new-housing.component';
import { WorkProposalComponent } from './components/work-proposal/work-proposal.component';
import { JobsComponent } from './components/jobs/jobs.component';
import { AgencyProfileComponent } from './components/agency-profile/agency-profile.component';
import { WorkersComponent } from './components/workers/workers.component';
import { AgencyJobsComponent } from './components/agency-jobs/agency-jobs.component';
import { AcceptJobComponent } from './components/accept-job/accept-job.component';
import { JobDetailsComponent } from './components/job-details/job-details.component';

const alreadyLoggedIn = (next, state) => {
  const router = inject(Router);
  if (sessionStorage.getItem('user') == null) return true;
  else {
    router.navigateByUrl('');
    return false;
  }
};
const notLoggedIn = (next, state) => {
  const router = inject(Router);
  if (sessionStorage.getItem('user') != null) return true;
  else {
    router.navigateByUrl('/login');
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
  {
    path: 'adminLogin',
    component: LoginComponent,
    data: { admin: true },
    canActivate: [alreadyLoggedIn],
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [alreadyLoggedIn],
  },
  {
    path: 'registerSuccess',
    component: LoginComponent,
    data: { admin: false, fromReg: true },
    canActivate: [alreadyLoggedIn],
  },
  {
    path: 'logout',
    component: LogoutComponent,
    canActivate: [notLoggedIn],
  },
  {
    path: 'changePassword',
    component: ChangePasswordComponent,
    canActivate: [notLoggedIn],
  },
  {
    path: 'agency/:username',
    component: AgencyComponent,
  },
  {
    path: 'proposal/:agencyUsername',
    component: WorkProposalComponent,
    canActivate: [notLoggedIn]
  },
  {
    path: 'userJobs',
    component: JobsComponent,
    canActivate: [notLoggedIn]
  },
  {
    path: 'job/:id',
    component: JobDetailsComponent,
    canActivate: [notLoggedIn]
  },
  {
    path: 'userProfile',
    component: UserProfileComponent,
    canActivate: [notLoggedIn],
  },
  {
    path: 'housing',
    component: HousingListComponent,
    canActivate: [notLoggedIn],
  },
  {
    path: 'housing/addHousing',
    component: NewHousingComponent,
    canActivate: [notLoggedIn],
  },
  {
    path: 'housing/:id',
    component: HousingComponent,
    canActivate: [notLoggedIn],
  },
  {
    path: 'agencyProfile',
    component: AgencyProfileComponent,
    canActivate: [notLoggedIn],
  },
  {
    path: 'workers',
    component: WorkersComponent,
    canActivate: [notLoggedIn],
  },
  {
    path: 'agencyJobs',
    component: AgencyJobsComponent,
    canActivate: [notLoggedIn],
  },
  {
    path: 'acceptJob/:id',
    component: AcceptJobComponent,
    canActivate: [notLoggedIn],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
