import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { LoginService } from '../../../../core/auth/services/login.service';
import { ROUTES } from '../../../../core/constants/routes';
import { DropdownNavbarComponent } from './dropdown-navbar/dropdown-navbar.component';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, DropdownNavbarComponent],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnInit {
  private readonly loginService = inject(LoginService);

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

  user = this.loginService.user();

  ngOnInit(): void {
    initFlowbite();
  }
}
