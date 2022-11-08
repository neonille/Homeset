import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpEvent,
  HttpResponse,
  HttpRequest,
  HttpHandler,
  HttpHeaders,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MeService } from './me.service';

@Injectable()
export class Interceptor implements HttpInterceptor {
  constructor(private snackbar: MatSnackBar, private meService: MeService) {}

  intercept(
    httpRequest: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    httpRequest = httpRequest.clone({
      withCredentials: true,
    });
    let url = httpRequest.url.split('homeset')[1];
    if (url === '/api/login') {
      return next.handle(httpRequest).pipe(
        tap({
          next: (event) => {
            if (event instanceof HttpResponse) {
              let token = event.body;
              localStorage.setItem('token', token);
              this.meService.getUserInfo();
            }
          },
          error: (error) => {
            this.snackbar.open(error.error, 'Stäng');
            console.log(error);
          },
        })
      );
    } else {
      let token = localStorage.getItem('token')!;
      const authReq = httpRequest.clone({
        headers: httpRequest.headers
          .set('Content-Type', 'application/json')
          .set('Authorization', 'Bearer ' + token),
      });
      return next.handle(authReq);
    }
  }
}
