import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CategoriasHomeComponent } from '../../components/categorias/categoriasHome.component';
import { DestaquesComponent } from '../../components/destaques/destaques.component';
import { HeroComponent } from '../../components/hero/hero.component';
import { InfoCardsComponent } from '../../components/InfoCards/infocards.component';
import { MaisVendidosComponent } from '../../components/mais-vendidos/mais-vendidos.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    CommonModule,
    HeroComponent,
    InfoCardsComponent,
    DestaquesComponent,
    MaisVendidosComponent,
    CategoriasHomeComponent,
  ],
  templateUrl: './home-page.component.html',
})
export class HomePageComponent {}
