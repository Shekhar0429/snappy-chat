import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserInfoState } from '../store/state/user.info.state';
import * as userLoginActions from '../store/actions/user.info.actions';
import { SignUpLoginDetail, UserInfo } from '../auth/models.ts/sign_up';
import {
  getUserInfo,
  isLoggedInSelector,
  userInfoEntities,
} from '../store/selectors/user.info.selectors';
import { Observable } from 'rxjs';

@Injectable()
export class AppFacade {
  isUserLoggedIn$: Observable<boolean>;
  getUserInfo$: Observable<any>;

  constructor(private store: Store<UserInfoState>) {
    this.isUserLoggedIn$ = this.store.select(isLoggedInSelector);
    this.getUserInfo$ = this.store.select(getUserInfo);
  }

  loggingInUser(user: SignUpLoginDetail) {
    this.store.dispatch(userLoginActions.loginUser({ user }));
  }

  getUserInfo() {
    this.store.dispatch(userLoginActions.getUserInfoFromServer());
  }

  updateUserInfo(user: UserInfo) {
    this.store.dispatch(userLoginActions.updateUserInfo({ user }));
  }

  clearState() {
    this.store.dispatch(userLoginActions.clerState());
  }
}
