import { Component, OnInit, Input } from '@angular/core';
import { Router, Event, RouterEvent, NavigationEnd, NavigationCancel, NavigationError, NavigationStart } from '@angular/router';
import { AuthService } from './Login/auth.service';
import { slideInAnimation } from './app.animation';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [slideInAnimation]
})
export class AppComponent implements OnInit {
  title = 'Team Work';
  showLoadingIndicator = true;
  username: string;
  getLocalName: string;


  constructor(private titleService: Title, private router: Router, public authservice: AuthService) {
    router.events.subscribe((routerEvent: Event) => {
      this.checkRouterEvent(routerEvent);
    });
  }
  ngOnInit(): void {
    // used update the title bar title
    this.titleService.setTitle('Team Work');
  }
  w3_open() {
    document.getElementById("mySidebar").style.display = "block";
  }
  w3_close() {
    document.getElementById("mySidebar").style.display = "none";
  }
  logout(){
    //loging out user
    this.authservice.logOutUser();
  }

  checkRouterEvent(routerEvent: Event): void {
    if (routerEvent instanceof NavigationStart) {
      this.showLoadingIndicator = true;
    }

    if (routerEvent instanceof NavigationEnd || routerEvent instanceof NavigationError || routerEvent instanceof NavigationCancel) {
      this.showLoadingIndicator = false;
    }
  }

}
