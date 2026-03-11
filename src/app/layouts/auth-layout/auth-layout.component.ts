import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderSectionComponent } from '../../core/auth/components/header-section/header-section.component';
import { HeroSectionComponent } from '../../core/auth/components/hero-section/hero-section.component';

@Component({
  selector: 'app-auth-layout',
  imports: [RouterOutlet, HeroSectionComponent, HeaderSectionComponent],
  templateUrl: './auth-layout.component.html',
})
export class AuthLayoutComponent {}
