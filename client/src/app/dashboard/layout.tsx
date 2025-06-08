"use client";
import { ReactNode } from "react";
import Sidebar from "./sidebar";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import NotAuthUser from "@/components/notAuth/notAuthUser";

export default function Layout({ children }: { children: ReactNode }) {
  const { user }: { user: any } = useSelector((state: RootState) => state.user);

  if (!user?.username) return <NotAuthUser />;
  return (
    <div>
      <Sidebar />
      <div className={`flex-1 sm:pl-42`}>{children}</div>
    </div>
  );
}
