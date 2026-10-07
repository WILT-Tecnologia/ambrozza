import { CommonModule } from '@angular/common';

import { Component, Input } from '@angular/core';

import { HomeProduct } from '../../../../../../core/models/product/home-product.model';

@Component({
  selector: 'app-best-sellers',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './best-sellers.component.html',
  styleUrls: ['./best-sellers.component.css'],
})
export class BestSellersComponent {
  @Input() products: HomeProduct[] = [];
}
