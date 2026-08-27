import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AvaliationsHomeComponent } from '../../components/avaliations/avaliations.component';
import { CategoriasHomeComponent } from '../../components/categorias/categoriasHome.component';
import { CtaBannerComponent } from '../../components/cta-banner/cta-banner.component';
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
    AvaliationsHomeComponent,
    CtaBannerComponent,
  ],
  templateUrl: './home-page.component.html',
})
export class HomePageComponent {}
