import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-hero-section',
  templateUrl: './hero-section.component.html',
})
export class HeroSectionComponent {
  stats = signal<{ value: string; label: string }[]>([
    { value: '2012', label: 'Founded' },
    { value: '40K+', label: 'Graduates' },
    { value: '50+', label: 'Partner Companies' },
    { value: '5', label: 'Branches' },
    { value: '20', label: 'Diplomas Available' },
  ]);
}
