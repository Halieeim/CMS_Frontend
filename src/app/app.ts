import { Component, OnDestroy } from '@angular/core';
import { Router, NavigationEnd, RouterOutlet } from '@angular/router';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App implements OnDestroy {
  showHeader = true;
  private sub: Subscription | null = null;

  // routes for which the header should be hidden
  private hiddenRoutes = ['login', 'signup'];

  constructor(private router: Router) {
    // Set initial visibility on app start
    this.updateHeaderVisibility(this.router.url);

    // Subscribe to route changes
    this.sub = this.router.events.subscribe(ev => {
      if (ev instanceof NavigationEnd) {
        const url = ev.urlAfterRedirects ?? ev.url;
        this.updateHeaderVisibility(url);
      }
    });
  }

  private updateHeaderVisibility(url: string) {
    const normalized = url.startsWith('/') ? url.substring(1) : url;
    this.showHeader = !this.hiddenRoutes.some(route => 
      normalized === route || normalized.startsWith(route + '/')
    );
  }

  ngOnDestroy(): void {
    if (this.sub) this.sub.unsubscribe();
  }
}