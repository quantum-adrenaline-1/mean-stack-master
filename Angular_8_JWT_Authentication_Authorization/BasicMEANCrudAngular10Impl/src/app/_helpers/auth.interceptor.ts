import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { TokenStorageService } from '../_service/token-storage.service';

/* Header key for the token */
const TOKEN_HEADER_KEY = 'x-access-token';

/**
 * This is like a service, specifically an iterceptor (like a helper) so it is injectable
 * It is used to set the token as header in the request
 * It checks for tokens in the user implemented 'Token Storage Service' which has the active/alive token stored with it
 * This service intercepts the request, get the token from 'Token Storage' service, build an header with it with the same key as expected by the backend and sets with the request
 * This new request is returned and passed to the next handler 
 */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    /* Token Storage Service is injected as the dependency */
    constructor(private token: TokenStorageService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let authorizationRequest = request;

        const authorizationToken = this.token.getToken();

        /* The original request is cloned with the header containing token key, which is returned later on */
        if (authorizationToken != null) {
            authorizationRequest = request.clone({headers: request.headers.set(TOKEN_HEADER_KEY, authorizationToken)});
        }

        return next.handle(authorizationRequest);
    }

}

/**
 * A constant is exported which is multi-provider token
 * It is an array of registered HttpInterceptor objects
 */
export const authInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
];
