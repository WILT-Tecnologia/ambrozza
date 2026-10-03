import { CommonModule, Location } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

import { ShopHomeResponse } from '../../../../../../core/models/shop/shop-home-response.model';
import { ShopService } from '../../../../../../core/services/shop.service';
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
  private readonly route = inject(ActivatedRoute);
  private readonly shopService = inject(ShopService);
  private readonly location = inject(Location);
  private readonly router = inject(Router);
  shopHome?: ShopHomeResponse;
  loading = true;
  error = false;

  ngOnInit(): void {
    this.loadShopHome();
    this.showStoreCreatedMessage();
  }

  private loadShopHome(): void {
    const slug = this.route.snapshot.paramMap.get('slug');

    if (!slug) {
      this.loading = false;
      this.error = true;
      return;
    }

    this.shopService.getHome(slug).subscribe({
      next: (response) => {
        this.shopHome = response;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.error = true;
        this.router.navigate(['/404']);
      },
    });
  }

  private showStoreCreatedMessage(): void {
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
