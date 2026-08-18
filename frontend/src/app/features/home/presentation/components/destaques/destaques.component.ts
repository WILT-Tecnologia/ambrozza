import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { register } from 'swiper/element/bundle';
register();
interface ProdutoDestaque {
  id: number;
  categoria: string;
  nome: string;
  descricao: string;
  preco: number;
  avaliacao: number;
  totalAvaliacoes: number;
  unidadesDisponiveis: number;
  imagem: string;
}

@Component({
  selector: 'app-destaques',
  standalone: true,
  imports: [CommonModule, RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './destaques.component.html',
})
export class DestaquesComponent {
  produtos: ProdutoDestaque[] = [
    {
      id: 1,
      categoria: 'Aniversário',
      nome: 'Bolo Rosé Framboesa',
      descricao:
        'Massa branca aerada, recheio de framboesa fresca e buttercream rosé com folha de ouro.',
      preco: 189.9,
      avaliacao: 4.9,
      totalAvaliacoes: 128,
      unidadesDisponiveis: 12,
      imagem:
        'https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=800&auto=format&fit=crop',
    },
    {
      id: 2,
      categoria: 'Chocolate',
      nome: 'Trufado Belga Intenso',
      descricao:
        'Três camadas de massa de chocolate meio amargo com ganache belga e raspas artesanais.',
      preco: 164.0,
      avaliacao: 4.8,
      totalAvaliacoes: 96,
      unidadesDisponiveis: 8,
      imagem:
        'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=800&auto=format&fit=crop',
    },
    {
      id: 3,
      categoria: 'Casamento',
      nome: 'Blanc Casamento 3 Andares',
      descricao: 'Naked cake branco com flores de açúcar em rosé. Serve até 80 pessoas.',
      preco: 890.0,
      avaliacao: 5.0,
      totalAvaliacoes: 41,
      unidadesDisponiveis: 3,
      imagem:
        'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?q=80&w=1452&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      id: 4,
      categoria: 'Infantil',
      nome: 'Festa Confete Infantil',
      descricao: 'Massa colorida com confeitos, buttercream pastel e velas inclusídas.',
      preco: 139.9,
      avaliacao: 4.7,
      totalAvaliacoes: 73,
      unidadesDisponiveis: 15,
      imagem:
        'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?q=80&w=800&auto=format&fit=crop',
    },

    {
      id: 5,
      categoria: 'Infantil',
      nome: 'Festa Confete Infantil',
      descricao: 'Massa colorida com confeitos, buttercream pastel e velas inclusídas.',
      preco: 139.9,
      avaliacao: 4.7,
      totalAvaliacoes: 73,
      unidadesDisponiveis: 15,
      imagem:
        'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?q=80&w=800&auto=format&fit=crop',
    },
  ];

  nextSlide(swiperRef: any) {
    swiperRef.swiper.slideNext();
  }

  prevSlide(swiperRef: any) {
    swiperRef.swiper.slidePrev();
  }
}
