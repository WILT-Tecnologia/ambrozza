import { CommonModule, Location } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import Swal from 'sweetalert2';
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
export class HomePageComponent implements OnInit {
  private readonly location = inject(Location);

  ngOnInit(): void {
    const state = this.location.getState() as {
      storeCreated?: boolean;
      shopkeeperName?: string;
    };

    if (state?.['storeCreated']) {
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: `Prezado ${state['shopkeeperName']}, sua loja foi criada com sucesso!`,
        showConfirmButton: false,
        timer: 4000,
        timerProgressBar: true,
      });
    }
  }
}
