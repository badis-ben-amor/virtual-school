import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import userReducer from "./slices/userSlice";
import schoolReducer from "./slices/schoolSlice";

const store = configureStore({
  reducer: { auth: authReducer, user: userReducer, school: schoolReducer },
});

export type Appdipatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
