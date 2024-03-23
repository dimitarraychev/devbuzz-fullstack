import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../user/services/user.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  return inject(UserService).user
    ? true
    : inject(Router).navigate(['/user/login']);
};
