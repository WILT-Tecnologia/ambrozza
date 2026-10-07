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

@Component({
  selector: 'app-highlights',
  standalone: true,
  imports: [DecimalPipe, MatIconModule],
  templateUrl: './Highlights.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HighlightsComponent implements AfterViewInit, OnChanges, OnDestroy {
  @Input() items: CarouselCardItem[] = [];
  @Input() loading = false;
  @Input() errorMessage: string | null = null;
  @Input() eyebrow = 'Seleção da casa';
  @Input() sectionTitle = 'Produtos em destaque';
  @Output() itemSelected = new EventEmitter<CarouselCardItem>();
  @Output() viewAllClicked = new EventEmitter<void>();

  @ViewChild('track')
  private trackRef?: ElementRef<HTMLDivElement>;

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

    if (!track) {
      return;
    }

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

    if (!track) {
      return;
    }

    const card = track.querySelector('article') as HTMLElement | null;

    if (!card) {
      return;
    }

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

    if (!track || this.items.length < 4) {
      this.canScrollPrev = false;
      this.canScrollNext = false;
      this.cdr.markForCheck();
      return;
    }

    const maxScrollLeft = track.scrollWidth - track.clientWidth;

    this.canScrollPrev = track.scrollLeft > 2;
    this.canScrollNext = maxScrollLeft > 2 && track.scrollLeft < maxScrollLeft - 2;

    this.cdr.markForCheck();
  }

  ngOnDestroy(): void {
    this.resizeObserver?.disconnect();
  }
}
