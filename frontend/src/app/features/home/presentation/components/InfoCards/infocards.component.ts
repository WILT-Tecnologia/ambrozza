import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-infoCards',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './infocards.component.html',
})
export class InfoCardsComponent {}
