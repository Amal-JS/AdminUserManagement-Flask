import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type UserState = {
  user?: string | null;
  adminUser?: string | null;
  isAdmin?:boolean
  accessToken?: string;
  refreshToken?: string;
  userLogged?: boolean;
};

const userInLocalstorage = localStorage.getItem("user");

const initialState: UserState = userInLocalstorage
  ? JSON.parse(userInLocalstorage)
  : {
      user: "",
      adminUser: "",
      accessToken: "",
      refreshToken: "",
      userLogged: false,
      isAdmin:false
    };

const userReducer = createSlice({
  name: "user",
  initialState,
  reducers: {
    userLoggedIn: (_state, action: PayloadAction<UserState>) => {
      const newState = {
        user: action.payload.user,
        adminUser: action.payload.adminUser,
        accessToken: action.payload.accessToken,
        refreshToken: action.payload.refreshToken,
        userLogged: true,
        isAdmin:action.payload.isAdmin
      };
      localStorage.setItem("user", JSON.stringify(newState));
      return newState;
    },
    userLoggedOut: () => {
      localStorage.removeItem("user");
      return {
        user: null,
        adminUser: null,
        isAdmin:false,
        accessToken: "",
        refreshToken: "",
        userLogged: false,
      };
    },
  },
});

export const { userLoggedIn, userLoggedOut } = userReducer.actions;

export default userReducer.reducer;
