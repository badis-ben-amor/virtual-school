"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Notebook, DoorOpen, Briefcase } from "lucide-react";
import Link from "next/link";

const features = [
  {
    title: "Students",
    icon: <Users className="h-6 w-6 text-blue-600" />,
    href: "/dashboard",
    // href: "dashboard/students",
    description: "Manage student records, attendance, and more.",
  },
  {
    title: "Teachers",
    icon: <Briefcase className="h-6 w-6 text-green-600" />,
    href: "/dashboard",
    // href: "dashboard/teachers",
    description: "View and manage your teaching staff.",
  },
  {
    title: "Classes",
    icon: <DoorOpen className="h-6 w-6 text-orange-600" />,
    href: "/dashboard",
    // href: "/dashboard/classes",
    description: "Schedule and assign students to classes.",
  },
  {
    title: "Subjects",
    icon: <Notebook className="h-6 w-6 text-purple-600" />,
    href: "/dashboard",
    // href: "/dashboard/subjects",
    description: "Manage academic subjects and course materials.",
  },
  //   {
  //     title: "Reports",
  //     icon: <BarChart3 className="h-6 w-6 text-purple-600" />,
  //     href: "/reports",
  //     description: "Generate academic and administrative reports.",
  //   },
];

export default function Home() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-center mb-10">
        School Management Dashboard
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature) => (
          <Card key={feature.title} className="rounded-2xl shadow-md">
            <CardContent className="p-6 flex flex-col gap-4">
              <div>{feature.icon}</div>
              <h2 className="text-xl font-semibold">{feature.title}</h2>
              <p className="text-sm text-muted-foreground">
                {feature.description}
              </p>
              <Link href={feature.href}>
                <Button variant="outline" className="mt-auto w-full">
                  Go to {feature.title}
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}
