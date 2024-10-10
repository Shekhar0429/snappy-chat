import { createReducer, on } from '@ngrx/store';
import { initialState, userAdapter } from '../state/user.info.state';
import * as userActions from '../actions/user.info.actions';
import { Update } from '@ngrx/entity';
import { UserInfo } from '../../auth/models.ts/sign_up';

export const userReducers = createReducer(
  initialState,
  on(userActions.loginUser, (state) => {
    return { ...state, isUserLoggedIn: false };
  }),
  on(userActions.loginUserSuccess, (state, action) => {
    return userAdapter.setAll([action.user], {
      ...state,
      isUserLoggedIn: true,
    });
  }),
  on(userActions.updateUserInfo, (state, action) => {
    const updatedUser: Update<UserInfo> = {
      id: action.user._id,
      changes: {
        isAvatarImageSet: true,
        avatarImage: action.user.avatarImage,
      },
    };
    return userAdapter.updateOne(updatedUser, {
      ...state,
    });
  }),
  on(userActions.getUserInfoFromServerSuccess, (state, action) => {
    return userAdapter.setAll([action.user], {
      ...state,
      isUserLoggedIn: true,
    });
  }),
  on(userActions.clerState, (state) => {
    return initialState;
  })
);
