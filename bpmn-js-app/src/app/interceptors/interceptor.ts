import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse, HttpErrorResponse} from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService  implements HttpInterceptor {


 constructor(
  //  private authService: AuthService
) {


}
intercept(
  req: HttpRequest<any>,
  next: HttpHandler
): Observable<HttpEvent<any>> {

  req = req.clone({ headers: req.headers.set('Access-Control-Allow-Origin', '*') });
  return next.handle(req);
}



}
