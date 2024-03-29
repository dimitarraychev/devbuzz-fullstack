import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../../user/services/user.service';

export const guestGuard: CanActivateFn = (route, state) => {
  return inject(UserService).user ? inject(Router).navigate(['/home']) : true;
};
