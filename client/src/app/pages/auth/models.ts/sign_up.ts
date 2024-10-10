export interface SignUpLoginDetail {
  username?: string;
  email: string;
  password: string;
}

export interface UserInfo {
  _id: string;
  email: string;
  isAvatarImageSet: boolean;
  avatarImage: string;
  photo?: string;
  username:string;
}
