import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  links = [
    { title: 'Hem', icon: 'house', route: 'home' },
    { title: 'Mina ärenden', icon: 'real_estate_agent', route: 'cases' },
    { title: 'Profil', icon: 'person', route: 'profile' },
  ];
  activeLink = this.links[0].title;

  constructor(private router: Router) {
    this.updateNavbar(router);
  }

  updateNavbar(router: Router) {
    router.events.subscribe((route) => {
      if (route instanceof NavigationEnd) {
        let pathName = route.url.split('/')[1];
        let linkToActivate = this.links.find((link) => {
          return link.route === pathName;
        });
        if (linkToActivate) {
          this.activeLink = linkToActivate.title;
        }
      }
    });
  }

  ngOnInit(): void {}

  linkClicked(activeLink: string, route: string): void {
    this.activeLink = activeLink;
    this.router.navigate([route]);
  }
}
