import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    menuVisible: boolean = false;

    toggleMenu(){
        this.menuVisible = !this.menuVisible;
    }

    constructor(private router: Router){
        router.events.subscribe((val) => {
            // on every route change, update whether the user is logged in
            if(val instanceof NavigationEnd){
                this.userType = JSON.parse(sessionStorage.getItem('user'))?.type;
                this.menuVisible = false;
            }
        });
    }
    userType: number;
}
