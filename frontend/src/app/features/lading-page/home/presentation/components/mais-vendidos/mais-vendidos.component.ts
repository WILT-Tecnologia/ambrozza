import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-mais-vendidos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mais-vendidos.component.html',
  styleUrls: ['./mais-vendidos.component.css'],
})
export class MaisVendidosComponent {
  produtos = [
    {
      id: 1,
      nome: 'Mini Doces Sortidos (12un)',
      categoria: 'Outros',
      destaque: true,
      descricao: 'Caixa com doze mini bolos e cupcakes em sabores rosé, caramelo e cacau.',
      nota: 4.6,
      reviews: 145,
      unidadesVendidas: 30,
      preco: 96.0,
      imagem:
        'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 2,
      nome: 'Bolo Rosé Framboesa',
      categoria: 'Aniversário',
      destaque: true,
      descricao:
        'Massa branca aerada, recheio de framboesa fresca e buttercream rosé com folha de ouro.',
      nota: 4.9,
      reviews: 128,
      unidadesVendidas: 12,
      preco: 189.9,
      imagem:
        'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 3,
      nome: 'Trufado Belga Intenso',
      categoria: 'Chocolate',
      destaque: true,
      descricao:
        'Três camadas de massa de chocolate meio amargo com ganache belga e raspas artesanais.',
      nota: 4.8,
      reviews: 96,
      unidadesVendidas: 8,
      preco: 164.0,
      imagem:
        'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 4,
      nome: 'Bolo Red Velvet Clássico',
      categoria: 'Especiais',
      destaque: true,
      descricao: 'Massa vermelha aveludada com recheio cremoso de cream cheese tradicional.',
      nota: 4.7,
      reviews: 110,
      unidadesVendidas: 19,
      preco: 145.0,
      imagem:
        'https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 5,
      nome: 'Cheesecake de Frutas Vermelhas',
      categoria: 'Tortas',
      destaque: false,
      descricao:
        'Base de biscoito amanteigado, creme leve de queijo e calda artesanal de amoras e morangos.',
      nota: 4.9,
      reviews: 215,
      unidadesVendidas: 42,
      preco: 120.0,
      imagem:
        'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 6,
      nome: 'Bolo Ninho com Morango',
      categoria: 'Aniversário',
      destaque: true,
      descricao:
        'Recheio generoso de leite em pó cremoso intercalado com morangos frescos picados.',
      nota: 5.0,
      reviews: 312,
      unidadesVendidas: 55,
      preco: 159.9,
      imagem:
        'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 7,
      nome: 'Torta Holandesa Cremosa',
      categoria: 'Tortas',
      destaque: false,
      descricao:
        'Famoso creme belga sobre base de biscoito, circundado por biscoitos Calypso e cobertura de ganache.',
      nota: 4.8,
      reviews: 178,
      unidadesVendidas: 27,
      preco: 110.0,
      imagem:
        'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 8,
      nome: 'Cupcake de Baunilha com Recheio de Doce de Leite',
      categoria: 'Outros',
      destaque: false,
      descricao:
        'Bolinho fofinho de baunilha com interior recheado de doce de leite argentino e cobertura suave.',
      nota: 4.5,
      reviews: 84,
      unidadesVendidas: 35,
      preco: 14.9,
      imagem:
        'https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 9,
      nome: 'Bolo de Cenoura com Calda de Chocolate',
      categoria: 'Caseiros',
      destaque: false,
      descricao:
        'O clássico bolo fofinho de cenoura batida no liquidificador com casquinha crocante de chocolate.',
      nota: 4.9,
      reviews: 240,
      unidadesVendidas: 48,
      preco: 75.0,
      imagem:
        'https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 10,
      nome: 'Pavlova de Frutas Tropicais',
      categoria: 'Especiais',
      destaque: true,
      descricao:
        'Base de suspiro crocante por fora e macio por dentro, coberta com chantilly e frutas da estação.',
      nota: 4.7,
      reviews: 62,
      unidadesVendidas: 14,
      preco: 135.0,
      imagem:
        'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80',
    },
  ];
}
