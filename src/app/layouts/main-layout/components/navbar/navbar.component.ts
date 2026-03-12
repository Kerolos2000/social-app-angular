import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ROUTES } from '../../../../core/constants/routes';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  links: {
    label: string;
    icon: string;
    routerLink: string;
  }[] = [
    {
      label: 'Feed',
      icon: 'fas fa-home',
      routerLink: ROUTES.FEEDS,
    },
    {
      label: 'Profile',
      icon: 'fas fa-user',
      routerLink: ROUTES.PROFILE,
    },
    {
      label: 'Notifications',
      icon: 'fas fa-bell',
      routerLink: ROUTES.NOTIFICATIONS,
    },
  ];
}
