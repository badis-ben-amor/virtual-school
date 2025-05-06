"use client";
import { ReactNode } from "react";
import Sidebar from "./sidebar";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import NotAuthUser from "@/components/notAuth/NotAuthUser";

export default function Layout({ children }: { children: ReactNode }) {
  const { user }: { user: any } = useSelector((state: RootState) => state.user);

  if (!user?.username) return <NotAuthUser />;
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">{children}</div>
    </div>
  );
}
