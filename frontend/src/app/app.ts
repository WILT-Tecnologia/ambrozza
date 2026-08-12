import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal, ViewChild } from '@angular/core';

import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/components/navbar/navbar.component';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, MatSidenavModule, NavbarComponent, RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  private readonly http = inject(HttpClient);

  protected readonly title = signal('frontend');
  protected readonly apiStatus = signal<'checking' | 'online' | 'offline'>('checking');

  @ViewChild('sidenav') sidenav!: MatSidenav;

  protected readonly mainLinks = [
    { label: 'Início', route: '/' },
    { label: 'Galeria', route: '/galeria' },
    { label: 'Cardápio', route: '/cardapio' },
    { label: 'Personalizar', route: '/personalizar' },
  ];

  protected readonly accountLinks = [
    { label: 'Minha conta', route: '/conta' },
    { label: 'Painel administrativo', route: '/admin' },
  ];

  ngOnInit(): void {
    this.http.get('/api', { responseType: 'text' }).subscribe({
      next: () => this.apiStatus.set('online'),
      error: () => this.apiStatus.set('offline'),
    });
  }

  toggleSidenav() {
    this.sidenav.toggle();
  }

  onBackdropClick() {
    this.sidenav.close();
  }
}
