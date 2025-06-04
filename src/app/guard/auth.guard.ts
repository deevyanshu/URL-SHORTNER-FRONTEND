import { CanActivateFn, Router } from '@angular/router';
import { UrlService } from '../Service/url.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = () => {
  const service=inject(UrlService);

  let auth=service.isUserLoggedIn();

  if(auth)
  {
    return true;
  }else
  {    
    const router = inject(Router);
    router.navigate(['/login']);
    alert("Please Login First");
    return false;
  }
};
