import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PostsFilterComponent } from './components/posts-filter/posts-filter.component';

@Component({
  selector: 'app-main-layout',
  imports: [NavbarComponent, RouterOutlet, PostsFilterComponent],
  templateUrl: './main-layout.component.html',
})
export class MainLayoutComponent {}
