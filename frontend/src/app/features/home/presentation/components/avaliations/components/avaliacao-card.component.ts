import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
@Component({
  selector: 'app-avaliacao-card-home',
  imports: [CommonModule],
  templateUrl: './avaliacao-card.component.html',
})
export class AvaliacaoCardComponent {
  @Input() avaliacao: any = {
    id: 1,
    autor: 'Mariana Alves',
    data: '01/08/2026',
    nota: 5,
    comentario:
      'Simplesmente perfeito. Chegou impecável e o recheio de framboesa é surreal de bom!',
    produtoRelacionado: 'Bolo Rosé Framboesa',
    fotoUrl:
      'https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=600&auto=format&fit=crop',
    verificado: true,
  };
  @Input() indice: number = 0;
  @Input() totalLista: number = 0;
  @Output() aoClicar = new EventEmitter<any>();
}
