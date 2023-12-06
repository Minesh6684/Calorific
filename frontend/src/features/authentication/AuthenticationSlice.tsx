import { PayloadAction, createSlice } from "@reduxjs/toolkit";
// import Authentication from "./Authentication";

interface User {
  name: string;
  token: string;
}

const userJSON = localStorage.getItem("user");
const user: User | null = userJSON ? (JSON.parse(userJSON) as User) : null;

interface AuthState {
  isLoading: boolean;
  isSuccess: boolean;
  isFailed: boolean;
  message: string;
  user: User | null;
}

const initialState: AuthState = {
  isLoading: false,
  isSuccess: false,
  isFailed: false,
  message: "",
  user: user ? user : null,
};

export const AuthenticationSlice = createSlice({
  name: "Authentication",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isFailed = false;
    },
    register: (state, action: PayloadAction<User>) => {
      state.isSuccess = true;
      state.user = action.payload;
    },
    login: (state, action: PayloadAction<User>) => {
      state.isSuccess = true;
      state.user = action.payload;
    },
    logout: (state) => {
      state.isSuccess = true;
      state.user = null;
    },
  },
});

export const { reset, register, login, logout } = AuthenticationSlice.actions;
export default AuthenticationSlice.reducer;
