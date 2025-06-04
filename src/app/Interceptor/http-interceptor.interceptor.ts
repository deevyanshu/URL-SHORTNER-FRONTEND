import { HttpHeaders, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { UrlService } from '../Service/url.service';

export const httpInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  const service=inject(UrlService);

  let auth=service.isUserLoggedIn();

  if(auth){
    const token=localStorage.getItem('token');
    
      const clonedReq=req.clone({headers : 
        req.headers.set('Authorization',`Bearer ${token}`)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')})      
      return next(clonedReq);
  }else
  {return next(req);}
};
