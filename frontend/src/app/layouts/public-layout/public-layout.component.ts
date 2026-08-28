import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';

@Component({
  selector: 'app-public-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatSidenavModule,
    NavbarComponent,
    FooterComponent,
  ],
  templateUrl: './public-layout.component.html',
})
export class PublicLayoutComponent {
  mainLinks = [{ label: 'Início', route: '/' }];
  accountLinks = [{ label: 'Criar Loja', route: '/nova-loja' }];

  onBackdropClick() {}
}
