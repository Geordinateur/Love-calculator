import { CanActivateFn, Router } from '@angular/router';
import { LoveService } from '../love.service';
import { inject } from '@angular/core';
import { catchError, map, of } from 'rxjs';

export const resultIdExistGuard: CanActivateFn = (route, _) => {
  const { id } = route.params
  if(!id) return true

  const service = inject(LoveService)
  const router = inject(Router)

  return service.get(id).pipe(
    map(() => true),
    catchError(err => {
      console.log(err)
      return of(router.createUrlTree(['/']))
    })
  )
};
