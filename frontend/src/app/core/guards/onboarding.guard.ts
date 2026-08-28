import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const onboardingGuard: CanActivateFn = async () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const isAuthenticated = await authService.isAuthenticated();

  if (!isAuthenticated) {
    return router.createUrlTree(['/cadastrar-loja/auth']);
  }

  const accountStatus = await authService.getAccountStatus();

  if (accountStatus === 'PENDENTE') {
    return router.createUrlTree(['/aguardando-aprovacao']);
  }

  if (accountStatus === 'REJEITADO') {
    return router.createUrlTree(['/solicitacao-rejeitada']);
  }

  return true;
};
