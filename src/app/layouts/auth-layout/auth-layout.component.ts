import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderSectionComponent } from '../../features/auth/components/header-section/header-section.component';
import { HeroSectionComponent } from '../../features/auth/components/hero-section/hero-section.component';

@Component({
  selector: 'app-auth-layout',
  imports: [RouterOutlet, HeroSectionComponent, HeaderSectionComponent],
  templateUrl: './auth-layout.component.html',
})
export class AuthLayoutComponent {}
