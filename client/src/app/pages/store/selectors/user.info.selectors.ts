import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserInfoState, userAdapter } from '../state/user.info.state';

export const userInfoFeaturekey = 'user-info';

export const getUserInfoState =
  createFeatureSelector<UserInfoState>(userInfoFeaturekey);

export const userInfoSelectors = userAdapter.getSelectors();

export const getUserInfo = createSelector(
  getUserInfoState,
  userInfoSelectors.selectAll
);

export const userInfoEntities = createSelector(
  getUserInfoState,
  userInfoSelectors.selectEntities
);

export const isLoggedInSelector = createSelector(
  getUserInfoState,
  (state) => state.isUserLoggedIn
);
