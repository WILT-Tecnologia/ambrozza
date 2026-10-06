import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { HomeProduct } from '../../../../../../core/models/product/home-product.model';

@Component({
  selector: 'app-mais-vendidos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mais-vendidos.component.html',
  styleUrls: ['./mais-vendidos.component.css'],
})
export class MaisVendidosComponent {
  @Input() produtos: HomeProduct[] = [];
}
