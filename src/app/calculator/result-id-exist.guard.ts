import { CanActivateFn, Router } from '@angular/router';
import { LoveService } from '../love.service';
import { inject } from '@angular/core';

export const resultIdExistGuard: CanActivateFn = (route, state) => {
  const { id } = route.params
  if(!id) return true

  const service = inject(LoveService)
  const router = inject(Router)
  const result = service.get(id)

  if(!result) {
    return router.createUrlTree(['/'])
  }
  return true;
};
