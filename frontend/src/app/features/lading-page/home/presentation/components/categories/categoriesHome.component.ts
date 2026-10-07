import { CommonModule } from '@angular/common';

import { Component } from '@angular/core';

import { MatIcon } from '@angular/material/icon';

import { RouterModule } from '@angular/router';
import { CategoryHome } from '../../../../../../core/models/category/category-home.model';

@Component({
  selector: 'app-categories-home',
  imports: [CommonModule, RouterModule, MatIcon],
  templateUrl: './categoriesHome.component.html',
})
export class CategoriesHomeComponent {
  categories: CategoryHome[] = [];
}
