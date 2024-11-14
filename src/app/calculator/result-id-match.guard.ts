import { CanMatchFn } from '@angular/router';

export const resultIdMatchGuard: CanMatchFn = (route, segments) => {

  const id = segments[0]

  if(!id) return true

  return /^[0-9]+$/.test(id.toString());
};
