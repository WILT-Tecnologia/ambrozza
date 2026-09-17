import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { OnboardingAuthService } from '../services/onboarding-auth.service';

export const shopkeeperGuestGuard: CanActivateFn = async () => {
  const authService = inject(OnboardingAuthService);
  const router = inject(Router);

  const isAuthenticated = await authService.isAuthenticated();

  if (isAuthenticated) {
    return router.createUrlTree(['/onboarding']);
  }

  return true;
};
