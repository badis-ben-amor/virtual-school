import {
  Backpack,
  Briefcase,
  DoorOpen,
  Home,
  NotebookText,
  School,
} from "lucide-react";
import Link from "next/link";
import React from "react";

const menuItems = [
  { name: "Overview", icon: Home, path: "/dashboard" },
  { name: "School", icon: School, path: "/dashboard/school" },
  { name: "Classroom", icon: DoorOpen, path: "/classroom" },
  { name: "Students", icon: Backpack, path: "/students" },
  { name: "Teachers", icon: Briefcase, path: "/teachers" },
  { name: "Subjects", icon: NotebookText, path: "/subjects" },
];

const Sidebar = () => {
  return (
    <aside className="text-center w-3xs h-screen bg-gray-200 p-4">
      <h2 className="text-2xl font-bold mb-2">School Dachboard</h2>
      <nav className="space-y-2">
        {menuItems.map((e, i) => (
          <Link
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
  );
};

export default Sidebar;
