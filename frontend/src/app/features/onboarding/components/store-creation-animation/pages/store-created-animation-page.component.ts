import { Component, Input, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-store-created-animation-page',
  standalone: true,
  templateUrl: './store-created-animation-page.component.html',
})
export class StoreCreatedAnimationPageComponent implements OnInit {
  private readonly router = inject(Router);

  @Input() shopkeeperName = '';

  ngOnInit(): void {
    setTimeout(() => {
      this.router.navigate(['/'], {
        state: {
          storeCreated: true,
          shopkeeperName: this.shopkeeperName,
        },
      });
    }, 3500);
  }
}
