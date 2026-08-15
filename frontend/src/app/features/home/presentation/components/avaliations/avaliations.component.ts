import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

export interface Avaliacao {
  id: string | number;
  autor: string;
  data: string;
  nota: number;
  comentario: string;
  produtoRelacionado: string;
  fotoUrl?: string | null;
  verificado: boolean;
}

@Component({
  selector: 'app-avaliations-home',
  imports: [CommonModule, RouterModule],
  templateUrl: './avaliations.component.html',
})
export class AvaliationsHomeComponent {
  mediaGeral: string = '4.9';
  totalEntregas: string = '+500 entregas';
  avaliacaoSelecionada: Avaliacao | null = null;
  listaAvaliacoes: Avaliacao[] = [
    {
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
    },
    {
      id: 2,
      autor: 'Rafael Souza',
      data: '28/07/2026',
      nota: 5,
      comentario:
        'Melhor bolo de chocolate de Manaus, sem exagero. Textura molhadinha e ponto de açúcar perfeito.',
      produtoRelacionado: 'Trufado Belga Intenso',
      fotoUrl:
        'https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=600&auto=format&fit=crop',
      verificado: true,
    },
    {
      id: 3,
      autor: 'Juliana Prado',
      data: '20/07/2026',
      nota: 5,
      comentario: 'Fizeram o bolo do meu casamento e todos os convidados elogiaram. Emocionante!',
      produtoRelacionado: 'Blanc Casamento 3 Andares',
      fotoUrl:
        'https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=600&auto=format&fit=crop',
      verificado: true,
    },
  ];

  abrirModal(avaliacao: Avaliacao): void {
    this.avaliacaoSelecionada = avaliacao;
    document.body.style.overflow = 'hidden';
  }

  fecharModal(): void {
    this.avaliacaoSelecionada = null;
    document.body.style.overflow = 'auto';
  }
}
