import { Component, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class App implements OnDestroy {
  showHeader = true;
  private sub: Subscription | null = null;

  // routes for which the header should be hidden
  private hiddenRoutes = ['signin', 'signup'];

  constructor(private router: Router) {
    // Set initial visibility on app start (important)
    this.updateHeaderVisibility(this.router.url);

    // Subscribe to route changes and update visibility on NavigationEnd
    this.sub = this.router.events.subscribe(ev => {
      if (ev instanceof NavigationEnd) {
        // use urlAfterRedirects if available, otherwise use url
        const url = (ev as NavigationEnd).urlAfterRedirects ?? (ev as NavigationEnd).url;
        this.updateHeaderVisibility(url);
      }
    });
  }

  private updateHeaderVisibility(url: string) {
    // Normalize: remove leading slash for easier checks
    const normalized = url.startsWith('/') ? url.substring(1) : url;

    // Hide when any hidden route is a prefix of the current route (handles children / params)
    this.showHeader = !this.hiddenRoutes.some(route => {
      return normalized === route || normalized.startsWith(route + '/') || normalized.startsWith(route + '?') || normalized.startsWith(route + '#') || normalized.includes(`${route}?`) || normalized.includes(`${route}#`);
    });
  }

  ngOnDestroy(): void {
    if (this.sub) this.sub.unsubscribe();
  }
}
