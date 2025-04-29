"use client";
import { ReactNode } from "react";
import Sidebar from "./sidebar";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import NotAuthUser from "@/components/notAuth/NotAuthUser";

export default function Layout({ children }: { children: ReactNode }) {
  const { user }: { user: any } = useSelector((state: RootState) => state.user);

  if (!user?.id) return <NotAuthUser />;
  return (
    <div className="flex">
      <Sidebar />
      {children}
    </div>
  );
}
