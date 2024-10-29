import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { map, take } from 'rxjs/operators';

export const featuresGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);

  return auth.isAuthenticated$.pipe(
    take(1), // Completa a assinatura após o primeiro valor emitido
    map((isAuthenticated) => {
      if (isAuthenticated) {
        return true; // Permite acesso à rota
      } else {
        auth.loginWithRedirect(); // Redireciona se o usuário não estiver autenticado
        return false;
      }
    })
  );
};
