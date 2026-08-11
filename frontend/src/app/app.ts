import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  private readonly http = inject(HttpClient);

  protected readonly title = signal('frontend');
  protected readonly apiStatus = signal<'checking' | 'online' | 'offline'>('checking');

  ngOnInit(): void {
    this.http.get('/api', { responseType: 'text' }).subscribe({
      next: () => this.apiStatus.set('online'),
      error: () => this.apiStatus.set('offline'),
    });
  }
}
