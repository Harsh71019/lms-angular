import { Injectable } from '@angular/core';
import IUser from '../models/user.model';
import { Observable, of as observableOf, throwError } from 'rxjs';
import { map, delay, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  public isAuthenticated$: Observable<boolean>;
  public isAuthenticatedWithDelay$: Observable<boolean>;
  public currentUserSubject = new BehaviorSubject<boolean>(
    localStorage.getItem('currentUser') !== null
  );

  updateCurrentUserValue() {
    this.currentUserSubject.next(localStorage.getItem('currentUser') !== null);
  }

  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private _router: Router
  ) {
    this.isAuthenticated$ = this.currentUserSubject;
    this.isAuthenticatedWithDelay$ = this.isAuthenticated$.pipe(delay(1000));
  }

  async login(email: string, password: string) {
    if (!email) {
      throw new Error('Email not provided');
    }

    try {
      this.http
        .post<any>(`api/users/login`, {
          email,
          password,
        })
        .pipe(
          catchError((error) => {
            if (error?.status === 401) {
              this.toastr.error(
                'Please check your email or password',
                'Unauthorized'
              );
            }
            return throwError(error);
          })
        )
        .subscribe((data) => {
          this.toastr.success('Login Successfull');
          localStorage.setItem('currentUser', JSON.stringify(data));
          this.updateCurrentUserValue();
          this._router.navigate(['']);
        });
    } catch (error) {
      console.log(error);
    }
  }
  async register(form: IUser) {
    if (!form.email) {
      throw new Error('Email not provided');
    }

    try {
      this.http
        .post<any>(`api/users`, form)
        .pipe(
          catchError((error) => {
            if (error) {
              this.toastr.error(JSON.stringify(error));
            }
            return throwError(error);
          })
        )
        .subscribe((data) => {
          this.toastr.success('Register Successfull');
          localStorage.setItem('currentUser', JSON.stringify(data));
          this.updateCurrentUserValue();
          this._router.navigate(['']);
        });
    } catch (error) {
      console.log(error);
    }
  }
  logout() {
    this.toastr.success('Logout Successfull');
    localStorage.removeItem('currentUser');
    this.updateCurrentUserValue();
  }
  public get loggedIn(): boolean {
    return localStorage.getItem('currentUser') !== null;
  }
}
