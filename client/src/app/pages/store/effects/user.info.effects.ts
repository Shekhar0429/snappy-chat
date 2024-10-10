import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as userActions from '../actions/user.info.actions';
import { catchError, map, mergeMap, tap, switchMap } from 'rxjs/operators';
import { AuthService } from '../../auth/auth.service';
import { ToastrService } from 'src/app/utils/toastr.service';
import { of } from 'rxjs';

@Injectable()
export class UsersEffects {
  constructor(
    private actions$: Actions,
    private service: AuthService,
    private toastr: ToastrService
  ) {}

  loginUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(userActions.loginUser),
      mergeMap((action) => {
        return this.service.login(action.user).pipe(
          switchMap((data) => {
            if (data) {
              this.toastr.showContrast('Logged In successfully');
            }
            return [userActions.loginUserSuccess({ user: data.data.user })];
          })
        );
      }),
      catchError((error) => {
        this.toastr.showContrast(error.error.message);
        return of(userActions.loginUserError());
      })
    );
  });

  getUserInfo$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(userActions.getUserInfoFromServer),
      mergeMap((action) => {
        return this.service.getUserInfo().pipe(
          switchMap((data) => {
            return [userActions.getUserInfoFromServerSuccess({ user: data.data })];
          })
        );
      })
    );
  });
}
