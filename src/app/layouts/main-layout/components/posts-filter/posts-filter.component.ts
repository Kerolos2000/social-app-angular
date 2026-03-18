import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ROUTES } from '../../../../core/constants/routes';

@Component({
  selector: 'app-posts-filter',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './posts-filter.component.html',
})
export class PostsFilterComponent {
  ROUTES = ROUTES;
  filters = [
    { label: 'Feed', icon: 'fa-house', queryParams: {} },
    { label: 'My Posts', icon: 'fa-file-lines', queryParams: { filter: 'me' } },
    { label: 'Community', icon: 'fa-users', queryParams: { filter: 'community' } },
    { label: 'Saved', icon: 'fa-bookmark', queryParams: { filter: 'saved' } },
  ];
}
