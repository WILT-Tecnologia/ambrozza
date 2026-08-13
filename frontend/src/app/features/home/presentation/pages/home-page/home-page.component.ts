import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DestaquesComponent } from '../../components/destaques/destaques.component';
import { HeroComponent } from '../../components/hero/hero.component';
import { InfoCardsComponent } from '../../components/InfoCards/infocards.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, HeroComponent, InfoCardsComponent, DestaquesComponent],
  templateUrl: './home-page.component.html',
})
export class HomePageComponent {}
