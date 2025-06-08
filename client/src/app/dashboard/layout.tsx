"use client";
import { ReactNode } from "react";
import Sidebar from "./sidebar";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export default function Layout({ children }: { children: ReactNode }) {
  const { user }: { user: any } = useSelector((state: RootState) => state.user);

  return (
    <div>
      <Sidebar />
      <div className={`flex-1 sm:pl-42`}>{children}</div>
    </div>
  );
}
