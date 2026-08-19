import { DecimalPipe } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

export interface CarouselCardItem {
  id: string | number;
  imageUrl: string;
  imageAlt?: string;
  categoryLabel?: string;
  highlightLabel?: string;
  title: string;
  description?: string;
  rating?: number;
  reviewsCount?: number;
  stockLabel?: string;
  price: number;
  ctaLabel?: string;
}

const MOCK_ITEMS: CarouselCardItem[] = [
  {
    id: 1,
    imageUrl:
      'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=900&q=85',
    categoryLabel: 'Aniversário',
    highlightLabel: '✨ Destaque',
    title: 'Bolo Rosé Framboesa',
    description: 'Massa branca aerada, recheio de framboesa fresca e buttercream rosé...',
    rating: 4.9,
    reviewsCount: 128,
    stockLabel: '12 un.',
    price: 189.9,
  },
  {
    id: 2,
    imageUrl:
      'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?auto=format&fit=crop&w=900&q=85',
    categoryLabel: 'Chocolate',
    highlightLabel: '✨ Destaque',
    title: 'Trufado Belga Intenso',
    description: 'Três camadas de massa de chocolate meio amargo com ganache belga e...',
    rating: 4.8,
    reviewsCount: 96,
    stockLabel: '8 un.',
    price: 164,
  },
  {
    id: 3,
    imageUrl:
      'https://images.unsplash.com/photo-1621303837174-89787a7d4729?auto=format&fit=crop&w=900&q=85',
    categoryLabel: 'Casamento',
    highlightLabel: '✨ Destaque',
    title: 'Blanc Casamento 3 Andares',
    description: 'Naked cake branco com flores de açúcar em rosé. Serve até 80...',
    rating: 5,
    reviewsCount: 41,
    stockLabel: '3 un.',
    price: 890,
  },
  {
    id: 4,
    imageUrl:
      'https://images.unsplash.com/photo-1621303837174-89787a7d4729?auto=format&fit=crop&w=900&q=85',
    categoryLabel: 'Casamento',
    highlightLabel: '✨ Destaque',
    title: 'Blanc Casamento 3 Andares',
    description: 'Naked cake branco com flores de açúcar em rosé. Serve até 80...',
    rating: 5,
    reviewsCount: 41,
    stockLabel: '3 un.',
    price: 890,
  },

  {
    id: 5,
    imageUrl:
      'https://images.unsplash.com/photo-1621303837174-89787a7d4729?auto=format&fit=crop&w=900&q=85',
    categoryLabel: 'Casamento',
    highlightLabel: '✨ Destaque',
    title: 'Blanc Casamento 3 Andares',
    description: 'Naked cake branco com flores de açúcar em rosé. Serve até 80...',
    rating: 5,
    reviewsCount: 41,
    stockLabel: '3 un.',
    price: 890,
  },
];

@Component({
  selector: 'app-destaques',
  standalone: true,
  imports: [DecimalPipe, MatIconModule],
  templateUrl: './destaques.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DestaquesComponent implements AfterViewInit, OnChanges, OnDestroy {
  @Input() items: CarouselCardItem[] = MOCK_ITEMS;
  @Input() loading = false;
  @Input() errorMessage: string | null = null;
  @Input() eyebrow = 'Seleção da casa';
  @Input() sectionTitle = 'Produtos em destaque';
  @Input() emptyStateMessage = 'Nenhum produto disponível no momento.';

  @Output() itemSelected = new EventEmitter<CarouselCardItem>();
  @Output() verTodosClicked = new EventEmitter<void>();

  @ViewChild('track') private trackRef?: ElementRef<HTMLDivElement>;

  private resizeObserver?: ResizeObserver;

  canScrollPrev = false;
  canScrollNext = false;

  readonly skeletonPlaceholders = Array.from({ length: 4 });

  constructor(private readonly cdr: ChangeDetectorRef) {}

  get hasEnoughItems(): boolean {
    return !!this.items && this.items.length >= 4;
  }

  get isCarouselMode(): boolean {
    return this.hasEnoughItems;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['items']) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          this.updateScrollState();
        });
      });
    }
  }

  ngAfterViewInit(): void {
    const track = this.trackRef?.nativeElement;

    if (!track) return;

    this.resizeObserver = new ResizeObserver(() => {
      this.updateScrollState();
    });

    this.resizeObserver.observe(track);

    requestAnimationFrame(() => {
      this.updateScrollState();
    });
  }

  @HostListener('window:resize')
  onResize(): void {
    this.updateScrollState();
  }

  onScroll(): void {
    this.updateScrollState();
  }

  scroll(direction: 'prev' | 'next'): void {
    const track = this.trackRef?.nativeElement;

    if (!track) return;

    const card = track.querySelector('article') as HTMLElement | null;

    if (!card) return;

    const gap = 24;
    const scrollAmount = card.offsetWidth + gap;

    track.scrollBy({
      left: direction === 'next' ? scrollAmount : -scrollAmount,
      behavior: 'smooth',
    });
  }

  onOrder(item: CarouselCardItem): void {
    this.itemSelected.emit(item);
  }

  trackById(_index: number, item: CarouselCardItem): string | number {
    return item.id;
  }

  formatPrice(value: number): string {
    return `R$ ${value.toFixed(2).replace('.', ',')}`;
  }

  private updateScrollState(): void {
    const track = this.trackRef?.nativeElement;

    if (!track || !this.hasEnoughItems) {
      this.canScrollPrev = false;
      this.canScrollNext = false;
      this.cdr.markForCheck();
      return;
    }

    const epsilon = 2;

    this.canScrollPrev = track.scrollLeft > epsilon;

    this.canScrollNext = track.scrollLeft + track.clientWidth < track.scrollWidth - epsilon;

    this.cdr.markForCheck();
  }

  ngOnDestroy(): void {
    this.resizeObserver?.disconnect();
  }
}
