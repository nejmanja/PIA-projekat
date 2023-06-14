import { NgModule, inject } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
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
import { AgencyJobDetailsComponent } from './components/agency-job-details/agency-job-details.component';
import { UsersComponent } from './components/users/users.component';
import { RegistrationRequestsComponent } from './components/registration-requests/registration-requests.component';
import { WorkplaceRequestsComponent } from './components/workplace-requests/workplace-requests.component';
import { AdminJobsComponent } from './components/admin-jobs/admin-jobs.component';
import { AdminJobDetailsComponent } from './components/admin-job-details/admin-job-details.component';

// only if regular user
const isUser = (next, state) => {
  const router = inject(Router);
  const user = JSON.parse(sessionStorage.getItem('user'));
  // not logged in
  if (user == null) {
    // redirect to login page
    router.navigateByUrl('/login');
    return false;
  } else {
    switch (user.type) {
      case 0: // user
        return true;
        break;
      case 1: //agency
        router.navigateByUrl('/workers');
        return false;
        break;
      case -1: //admin
        router.navigateByUrl('/users');
        return false;
        break;
      default:
        return false;
    }
  }
};
const isUserOrNone = (next, state) => {
  const router = inject(Router);
  const user = JSON.parse(sessionStorage.getItem('user'));
  // not logged in
  if (user == null) {
    return true;
  } else {
    switch (user.type) {
      case 0: // user
        return true;
        break;
      case 1: //agency
        router.navigateByUrl('/workers');
        return false;
        break;
      case -1: //admin
        router.navigateByUrl('/users');
        return false;
        break;
      default:
        return false;
    }
  }
};
const isUserOrAgency = (next, state) => {
  const router = inject(Router);
  const user = JSON.parse(sessionStorage.getItem('user'));
  // not logged in
  if (user == null) {
    // redirect to login page
    router.navigateByUrl('/login');
    return false;
  } else {
    switch (user.type) {
      case 0: // user
        return true;
        break;
      case 1: //agency
        return true;
        break;
      case -1: //admin
        router.navigateByUrl('/users');
        return false;
        break;
      default:
        return false;
    }
  }
};
const isAgency = (next, state) => {
  const router = inject(Router);
  const user = JSON.parse(sessionStorage.getItem('user'));
  // not logged in
  if (user == null) {
    // redirect to login page
    router.navigateByUrl('/login');
    return false;
  } else {
    switch (user.type) {
      case 0: // user
        router.navigateByUrl('');
        return false;
        break;
      case 1: //agency
        return true;
        break;
      case -1: //admin
        router.navigateByUrl('/users');
        return false;
        break;
      default:
        return false;
    }
  }
};
const isAdmin = (next, state) => {
  const router = inject(Router);
  const user = JSON.parse(sessionStorage.getItem('user'));
  // not logged in
  if (user == null) {
    // redirect to login page
    router.navigateByUrl('/login');
    return false;
  } else {
    switch (user.type) {
      case 0: // user
        router.navigateByUrl('');
        return false;
        break;
      case 1: //agency
        router.navigateByUrl('/workers');
        return false;
        break;
      case -1: //admin
        return true;
        break;
      default:
        return false;
    }
  }
};

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
    path: '',
    component: HomeComponent,
    canActivate: [isUserOrNone],
  },
  {
    path: 'agency/:username',
    component: AgencyComponent,
    canActivate: [isUserOrNone],
  },
  {
    path: 'changePassword',
    component: ChangePasswordComponent,
    canActivate: [isUserOrAgency],
  },
  {
    path: 'proposal/:agencyUsername',
    component: WorkProposalComponent,
    canActivate: [isUser],
  },
  {
    path: 'userJobs',
    component: JobsComponent,
    canActivate: [isUser],
  },
  {
    path: 'job/:id',
    component: JobDetailsComponent,
    canActivate: [isUser],
  },
  {
    path: 'userProfile',
    component: UserProfileComponent,
    canActivate: [isUser],
  },
  {
    path: 'housing',
    component: HousingListComponent,
    canActivate: [isUser],
  },
  {
    path: 'housing/addHousing',
    component: NewHousingComponent,
    canActivate: [isUser],
  },
  {
    path: 'housing/:id',
    component: HousingComponent,
    canActivate: [isUser],
  },
  {
    path: 'agencyProfile',
    component: AgencyProfileComponent,
    canActivate: [isAgency],
  },
  {
    path: 'workers',
    component: WorkersComponent,
    canActivate: [isAgency],
  },
  {
    path: 'agencyJobs',
    component: AgencyJobsComponent,
    canActivate: [isAgency],
  },
  {
    path: 'agencyJob/:id',
    component: AgencyJobDetailsComponent,
    canActivate: [isAgency],
  },
  {
    path: 'acceptJob/:id',
    component: AcceptJobComponent,
    canActivate: [isAgency],
  },
  {
    path: 'users',
    component: UsersComponent,
    canActivate: [isAdmin],
  },
  {
    path: 'addUser',
    component: RegisterComponent,
    canActivate: [isAdmin],
    data: {type: 0}
  },
  {
    path: 'addAgency',
    component: RegisterComponent,
    canActivate: [isAdmin],
    data: {type: 1}
  },
  {
    path: 'editAgency/:username',
    component: AgencyProfileComponent,
    canActivate: [isAdmin],
  },
  {
    path: 'editUser/:username',
    component: UserProfileComponent,
    canActivate: [isAdmin],
  },
  {
    path: 'registerRequests',
    component: RegistrationRequestsComponent,
    canActivate: [isAdmin],
  },
  {
    path: 'workplaceRequests',
    component: WorkplaceRequestsComponent,
    canActivate: [isAdmin],
  },
  {
    path: 'editWorkers/:username',
    component: WorkersComponent,
    canActivate: [isAdmin],
  },
  {
    path: 'adminJobs',
    component: AdminJobsComponent,
    canActivate: [isAdmin],
  },
  {
    path: 'adminJob/:id',
    component: AdminJobDetailsComponent,
    canActivate: [isAdmin],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
