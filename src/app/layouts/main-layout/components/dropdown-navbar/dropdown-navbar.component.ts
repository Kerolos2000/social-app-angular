import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LoginService } from '../../../../core/auth/services/login.service';

@Component({
  selector: 'app-dropdown-navbar',
  imports: [RouterLink],
  templateUrl: './dropdown-navbar.component.html',
})
export class DropdownNavbarComponent {
  private readonly loginService = inject(LoginService);

  logout() {
    this.loginService.logout();
  }
}
