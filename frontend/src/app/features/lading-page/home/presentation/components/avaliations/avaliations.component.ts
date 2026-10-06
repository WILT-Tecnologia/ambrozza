import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AvaliacaoCardComponent } from './components/avaliacao-card.component';
import { AvaliacoesVazioComponent } from './components/avaliations-empty.component';

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
  imports: [CommonModule, RouterModule, AvaliacoesVazioComponent, AvaliacaoCardComponent],
  templateUrl: './avaliations.component.html',
})
export class AvaliationsHomeComponent {
  mediaGeral: string = '4.9';
  totalEntregas: string = '+500 entregas';
  avaliacaoSelecionada: Avaliacao | null = null;
  listaAvaliacoes: Avaliacao[] = [];

  abrirModal(avaliacao: Avaliacao): void {
    this.avaliacaoSelecionada = avaliacao;
    document.body.style.overflow = 'hidden';
  }

  fecharModal(): void {
    this.avaliacaoSelecionada = null;
    document.body.style.overflow = 'auto';
  }
}
