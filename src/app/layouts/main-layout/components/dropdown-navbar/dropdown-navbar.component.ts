import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LoginService } from '../../../../core/auth/services/login.service';
import { ROUTES } from '../../../../core/constants/routes';

@Component({
  selector: 'app-dropdown-navbar',
  imports: [RouterLink],
  templateUrl: './dropdown-navbar.component.html',
})
export class DropdownNavbarComponent {
  private readonly loginService = inject(LoginService);

  protected readonly ROUTES = ROUTES;

  logout() {
    this.loginService.logout();
  }
}
