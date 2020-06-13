import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styles: []
})
export class UserComponent implements OnInit {
  title = 'angular-material-tab-router';  
  navLinks: any[];
  activeLinkIndex = -1; 
  constructor(private router: Router) { this.navLinks = [
    {
        label: 'Login',
        link: '/user/login',
        index: 0
    }, {
        label: 'SignUp',
        link: '/register-user/register-user',
        index: 1
    }, 
];}

  ngOnInit() { this.router.events.subscribe((res) => {
    this.activeLinkIndex = this.navLinks.indexOf(this.navLinks.find(tab => tab.link === '.' + this.router.url));
    });
  }

}
