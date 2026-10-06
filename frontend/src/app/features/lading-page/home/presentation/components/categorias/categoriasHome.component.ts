import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { CategoriaHome } from '../../../../../../core/models/category/categoria-home.model';

@Component({
  selector: 'app-categorias-home',
  imports: [CommonModule, RouterModule, MatIcon],
  templateUrl: './categoriasHome.component.html',
})
export class CategoriasHomeComponent {
  categorias: CategoriaHome[] = [];
}
