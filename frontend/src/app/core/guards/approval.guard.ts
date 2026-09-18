import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/admin-auth.service';

export const approvalGuard: CanActivateFn = async () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const isAuthenticated = await authService.isAuthenticated();

  if (!isAuthenticated) {
    return router.createUrlTree(['/approval/auth']);
  }

  return true;
};
