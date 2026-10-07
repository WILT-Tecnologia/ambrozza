import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
@Component({
  selector: 'app-evaluation-card-home',
  imports: [CommonModule],
  templateUrl: './evaluation-card.component.html',
})
export class EvaluationCardComponent {
  @Input() evaluation: any = {
    id: 1,
    author: 'Mariana Alves',
    date: '01/08/2026',
    rating: 5,
    comment: 'Simplesmente perfeito. Chegou impecável e o recheio de framboesa é surreal de bom!',
    relatedProduct: 'Bolo Rosé Framboesa',
    photoUrl:
      'https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=600&auto=format&fit=crop',
    verified: true,
  };
  @Input() index: number = 0;
  @Input() totalList: number = 0;

  @Output() onClick = new EventEmitter<any>();
}
