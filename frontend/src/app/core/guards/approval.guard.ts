import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../features/approval/services/admin-auth.service';

export const approvalGuard: CanActivateFn = async () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  try {
    const isAuthenticated = await authService.isAuthenticated();

    if (!isAuthenticated) {
      return router.createUrlTree(['/approval/auth']);
    }

    return true;
  } catch (error) {
    return router.createUrlTree(['/approval/auth']);
  }
};
