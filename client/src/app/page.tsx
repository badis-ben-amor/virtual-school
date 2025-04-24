"use client";
import { getUserThunk } from "@/redux/slices/userSlice";
import { Appdipatch, RootState } from "@/redux/store";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Home = () => {
  const dispatch = useDispatch<Appdipatch>();
  const { accessToken } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    dispatch(getUserThunk(accessToken));
  }, []);
  return <div>home</div>;
};

export default Home;
