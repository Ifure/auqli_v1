/* eslint-disable unicorn/filename-case */
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import type { LoginResponse, User } from '../../../types/services/auth';
import {
  getToken,
  getUser,
  removeToken,
  removeUser,
  setToken,
  setUser,
} from './utils';

export interface AuthState {
  user: User | null;
  token: string;
  status: 'signOut' | 'signIn' | 'guest';
  signIn: ((data: LoginResponse) => void) | null;
  signOut: (() => void) | null;
}

const initialState: AuthState = {
  user: getUser(),
  token: getToken(),
  status: getToken() ? 'signIn' : 'signOut',
  signIn: null,
  signOut: null,
};

export const authSlice = createSlice({
  name: 'authState',
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<User>) => {
      setUser(action.payload);
      state.user = action.payload;
    },
    signIn: (state, action: PayloadAction<LoginResponse>) => {
      setToken(action?.payload?.token);
      setUser(action?.payload?.user!);
      state.user = action?.payload?.user!;
      state.token = action?.payload?.token;
      state.status = 'signIn';
    },
    signInAsGuest: (state) => {
      state.status = 'guest';
    },
    signOut: (state) => {
      removeToken();
      removeUser();
      state.user = null;
      state.token = '';
      state.status = 'signOut';
    },
  },
});

export const { signIn, signOut, signInAsGuest, setUserData } =
  authSlice.actions;

export default authSlice.reducer;
