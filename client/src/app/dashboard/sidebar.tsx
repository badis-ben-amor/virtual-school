"use client";
import { Button } from "@/components/ui/button";
import {
  Briefcase,
  DoorOpen,
  Home,
  Menu,
  NotebookText,
  School,
  Users,
  X,
} from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

const menuItems = [
  { name: "Overview", icon: Home, path: "/dashboard" },
  { name: "School", icon: School, path: "/dashboard/school" },
  { name: "Classes", icon: DoorOpen, path: "/classroom" },
  { name: "Students", icon: Users, path: "/students" },
  { name: "Teachers", icon: Briefcase, path: "/teachers" },
  { name: "Subjects", icon: NotebookText, path: "/subjects" },
];

const Sidebar = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  return (
    <div>
      {!showSidebar && (
        <div
          className="sm:hidden m-1 cursor-pointer"
          onClick={() => setShowSidebar(!showSidebar)}
        >
          <Button variant={"secondary"}>
            <Menu />
          </Button>
        </div>
      )}

      <aside
        className={`${
          !showSidebar && "hidden"
        } sm:flex sm:fixed text-center w-full sm:w-42 sm:h-screen bg-[#eeedf7] p-4 rounded-lg`}
      >
        {/* <h2 className="text-xl font-bold mb-2">School Dachboard</h2> */}
        <div
          className="sm:hidden cursor-pointer"
          onClick={() => setShowSidebar(!showSidebar)}
        >
          <X />
        </div>
        <nav className="sm:space-y-2">
          {menuItems.map((e, i) => (
            <Link
              onClick={() => setShowSidebar(false)}
              className="flex space-x-2 p-4 hover:bg-gray-300 rounded-md"
              key={i}
              href={e.path}
            >
              <e.icon />
              <span>{e.name}</span>
            </Link>
          ))}
        </nav>
      </aside>
    </div>
  );
};

export default Sidebar;
