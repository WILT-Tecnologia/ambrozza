import { CommonModule } from '@angular/common';

import { Component } from '@angular/core';

import { RouterModule } from '@angular/router';

import { EvaluationCardComponent } from './components/evaluation-card.component';

import { EvaluationsVazioComponent } from './components/evaluations-empty.component';

export interface Evaluation {
  id: string | number;
  author: string;
  date: string;
  rating: number;
  comment: string;
  relatedProduct: string;
  photoUrl?: string | null;
  verified: boolean;
}

@Component({
  selector: 'app-evaluations-home',
  imports: [CommonModule, RouterModule, EvaluationsVazioComponent, EvaluationCardComponent],
  templateUrl: './evaluations.component.html',
})
export class EvaluationsHomeComponent {
  averageRating: string = '4.9';
  totalDeliveries: string = '+500 entregas';
  selectedEvaluation: Evaluation | null = null;
  evaluationList: Evaluation[] = [];

  openModal(evaluation: Evaluation): void {
    this.selectedEvaluation = evaluation;
    document.body.style.overflow = 'hidden';
  }

  closeModal(): void {
    this.selectedEvaluation = null;
    document.body.style.overflow = 'auto';
  }
}
