import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-categorias-home',
  imports: [CommonModule, RouterModule],
  templateUrl: './categoriasHome.component.html',
})
export class CategoriasHomeComponent {
  categorias = [
    {
      id: 1,
      nome: 'Aniversário',
      filtro: 'aniversario',
      imagem:
        'https://plus.unsplash.com/premium_photo-1663839412026-51a44cfadfb8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Ym9sb3xlbnwwfHwwfHx8MA%3D%3D',
    },
    {
      id: 2,
      nome: 'Casamento',
      filtro: 'casamento',
      imagem:
        'https://images.unsplash.com/photo-1535254973040-607b474cb50d?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: 3,
      nome: 'Infantil',
      filtro: 'infantil',
      imagem:
        'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: 4,
      nome: 'Temáticos',
      filtro: 'tematicos',
      imagem:
        'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: 5,
      nome: 'Chocolate',
      filtro: 'chocolate',
      imagem:
        'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: 6,
      nome: 'Personalizados',
      filtro: 'personalizados',
      imagem:
        'https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: 7,
      nome: 'Outros',
      filtro: 'outros',
      imagem:
        'https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?auto=format&fit=crop&w=400&q=80',
    },
  ];
}
