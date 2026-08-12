import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule, MatButtonModule],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  @Output() menuClick = new EventEmitter<void>();

  mainLinks = [
    { label: 'Início', route: '/' },
    { label: 'Galeria', route: '/galeria' },
    { label: 'Cardápio', route: '/cardapio' },
    { label: 'Personalizar', route: '/personalizar' },
  ];

  accountLinks = [
    { label: 'Minha conta', route: '/conta' },
    { label: 'Painel administrativo', route: '/admin' }, // so aparece se for admin
  ];

  toggleMenu() {
    this.menuClick.emit();
  }
}
