"use client";
import { getUserThunk } from "@/redux/slices/userSlice";
import { Appdipatch, RootState } from "@/redux/store";
import React, { ReactNode, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const App = ({ children }: { children: ReactNode }) => {
  const dispatch = useDispatch<Appdipatch>();
  const { accessToken } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    dispatch(getUserThunk(accessToken));
  }, []);

  return <>{children}</>;
};

export default App;
