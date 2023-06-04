import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    constructor(private router: Router){
        router.events.subscribe((val) => {
            // on every route change, update whether the user is logged in
            if(val instanceof NavigationEnd){
                this.userExists = sessionStorage.getItem('user') != null;
            }
        });
    }
    userExists: boolean;
}
