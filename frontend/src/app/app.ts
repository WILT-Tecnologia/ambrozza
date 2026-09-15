import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal, ViewChild } from '@angular/core';

import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './core/services/admin-auth.service';
@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, MatSidenavModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  private authService = inject(AuthService);

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

  async ngOnInit(): Promise<void> {}
  toggleSidenav() {
    this.sidenav.toggle();
  }

  onBackdropClick() {
    this.sidenav.close();
  }
}
