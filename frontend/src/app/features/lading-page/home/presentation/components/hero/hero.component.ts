import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { HeroProduct } from '../../../../../../core/models/product/hero-product.model';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, RouterLink, MatIconModule],
  templateUrl: './hero.component.html',
})
export class HeroComponent {
  produtoDestaque: HeroProduct | null = null;
}
