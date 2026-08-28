import { Injectable, signal } from '@angular/core';

export type AccountStatus = 'PENDENTE' | 'APROVADO' | 'REJEITADO';

export interface UserAccount {
  id: string;
  name: string;
  email: string;
  status: AccountStatus;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUser = signal<UserAccount | null>(null);

  async isAuthenticated(): Promise<boolean> {
    return this.currentUser() !== null;
  }

  async getAccountStatus(): Promise<AccountStatus | null> {
    const user = this.currentUser();
    return user ? user.status : null;
  }

  getCurrentUser(): UserAccount | null {
    return this.currentUser();
  }

  setAuthenticatedUser(user: UserAccount): void {
    this.currentUser.set(user);
  }

  logout(): void {
    this.currentUser.set(null);
  }
}
