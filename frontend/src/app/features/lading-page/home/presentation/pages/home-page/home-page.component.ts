import { CommonModule, Location } from '@angular/common';

import { Component, OnInit, inject } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';

import Swal from 'sweetalert2';

import { HomeProduct } from '../../../../../../core/models/product/home-product.model';

import { ShopHomeResponse } from '../../../../../../core/models/shop/shop-home-response.model';

import { ShopService } from '../../../../../../core/services/shop.service';

import { EvaluationsHomeComponent } from '../../components/avaliations/evaluations.component';

import { BestSellersComponent } from '../../components/best-sellers/best-sellers.component';

import { CategoriesHomeComponent } from '../../components/categories/categoriesHome.component';

import { CtaBannerComponent } from '../../components/cta-banner/cta-banner.component';

import { EmptyProductsComponent } from '../../components/empty-products/empty-products.component';

import { HeroComponent } from '../../components/hero/hero.component';

import {
  CarouselCardItem,
  HighlightsComponent,
} from '../../components/Highlights/Highlights.component';

import { InfoCardsComponent } from '../../components/InfoCards/infocards.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    CommonModule,
    HeroComponent,
    InfoCardsComponent,
    HighlightsComponent,
    BestSellersComponent,
    CategoriesHomeComponent,
    EvaluationsHomeComponent,
    CtaBannerComponent,
    EmptyProductsComponent,
  ],
  templateUrl: './home-page.component.html',
})
export class HomePageComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly shopService = inject(ShopService);
  private readonly location = inject(Location);
  private readonly router = inject(Router);

  shopHome?: ShopHomeResponse;
  products: HomeProduct[] = [];
  loading = true;
  error = false;
  featuredProducts: HomeProduct[] = [];
  bestSellingProducts: HomeProduct[] = [];

  private readonly MIN_HIGHLIGHTS = 4;
  private readonly MIN_BEST_SELLERS = 6;

  // get featuredProducts(): HomeProduct[] {
  //   return this.products.filter((product) => product.highlighted).slice(0, this.MIN_HIGHLIGHTS);
  // }

  // get bestSellingProducts(): HomeProduct[] {
  //   return [...this.products]
  //     .sort((a, b) => b.unitsSold - a.unitsSold)
  //     .slice(0, this.MIN_BEST_SELLERS);
  // }

  get hasHomeProductSections(): boolean {
    return (
      this.featuredProducts.length >= this.MIN_HIGHLIGHTS ||
      this.bestSellingProducts.length >= this.MIN_BEST_SELLERS
    );
  }

  get featuredProductCards(): CarouselCardItem[] {
    return this.featuredProducts.map((product) => ({
      id: product.id,
      imageUrl: product.image,
      imageAlt: product.name,
      categoryLabel: product.category,
      highlightLabel: product.highlighted ? 'Destaque' : undefined,
      title: product.name,
      description: product.description,
      rating: product.rating,
      reviewsCount: product.reviews,
      price: product.price,
      ctaLabel: 'Pedir',
    }));
  }

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
