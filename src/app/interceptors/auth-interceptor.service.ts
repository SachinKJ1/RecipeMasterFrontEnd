import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';
// dont use providedIn : root as other services. we use this in the providers array
@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor() {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // we clone the request object and change it to fit our need. without that this will return an error
    // req.headers.append is done to keep the headers from the original request. we add the token as headers.
    // we use this in the app.module.ts in the providers array.
    const token = localStorage.getItem('token');
    if (token) {
      const modifiedRequest = req.clone({
        headers: req.headers.append('Authorization', `Bearer ${token}`),
      });
      // next.handle is used to send the request to the next interceptor or to the server
      return next.handle(modifiedRequest);
    }

    return next.handle(req);
  }
}
