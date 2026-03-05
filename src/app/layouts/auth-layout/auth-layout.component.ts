import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeroSectionComponent } from '../../features/auth/components/hero-section/hero-section.component';

@Component({
  selector: 'app-auth-layout',
  imports: [RouterOutlet, HeroSectionComponent],
  templateUrl: './auth-layout.component.html',
})
export class AuthLayoutComponent {}
