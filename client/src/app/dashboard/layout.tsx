"use client";
import { ReactNode, useEffect } from "react";
import Sidebar from "./sidebar";
import { useDispatch, useSelector } from "react-redux";
import { Appdipatch, RootState } from "@/redux/store";
import { useRouter } from "next/navigation";
import { getUserThunk } from "@/redux/slices/userSlice";

export default function Layout({ children }: { children: ReactNode }) {
  const dispatch = useDispatch<Appdipatch>();
  const router = useRouter();
  const { user, isLoading }: { user: any; isLoading: any } = useSelector(
    (state: RootState) => state.user
  );

  useEffect(() => {
    dispatch(getUserThunk("")).then((res: any) => {
      if (!res.payload?.data?.username) router.push("/auth/login");
    });
  }, []);

  if (!user?.username) return null;
  return (
    <div>
      <Sidebar />
      <div className={`flex-1 sm:pl-42`}>{children}</div>
    </div>
  );
}
