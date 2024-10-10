import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { UserInfo } from '../../auth/models.ts/sign_up';

export interface UserInfoState extends EntityState<UserInfo> {
  isUserLoggedIn: boolean;
  isAdding: boolean;
  isUpdating: boolean;
  error: string | null;
}

export const userAdapter = createEntityAdapter<UserInfo>({
  selectId: (e) => e._id,
});

export const initialState: UserInfoState = userAdapter.getInitialState({
  isUserLoggedIn: false,
  isAdding: false,
  isUpdating: false,
  error: null,
});
