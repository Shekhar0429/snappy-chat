import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { SignUpLoginDetail, UserInfo } from '../../auth/models.ts/sign_up';

export const loginUser = createAction(
  '[User] Login user',
  props<{ user: SignUpLoginDetail }>()
);

export const loginUserSuccess = createAction(
  '[User] Login user success',
  props<{ user: UserInfo }>()
);

export const loginUserError = createAction('[User] Login user error');

export const getUserInfoFromServer = createAction('[User] Get user info');

export const getUserInfoFromServerSuccess = createAction(
  '[User] Get user info success',
  props<{ user: UserInfo }>()
);

export const updateUserInfo = createAction(
  '[User] Update user info',
  props<{ user: UserInfo }>()
);

export const clerState = createAction('[User] Clear state');
