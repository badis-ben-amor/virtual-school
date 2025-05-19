import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import userReducer from "./slices/userSlice";
import schoolReducer from "./slices/schoolSlice";
import classroomReducer from "./slices/classroomSlice";
import studentReducer from "./slices/studentSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    school: schoolReducer,
    classroom: classroomReducer,
    student: studentReducer,
  },
});

export type Appdipatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
