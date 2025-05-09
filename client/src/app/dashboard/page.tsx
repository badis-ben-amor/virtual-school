import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, MapPin, School, User } from "lucide-react";
import React from "react";

const Dashboard = () => {
  const schools = [
    {
      name: "Greenwood High",
      students: 115,
      location: "Boston",
      icon: School,
      teachers: 47,
      address: "ddfd",
    },
    {
      name: "Sunnydale Elementary",
      students: 750,
      location: "Austin",
      icon: School,
    },
    {
      name: "Riverdale School",
      students: null,
      location: "Seattle",
      icon: School,
    },
    {
      name: "Lincoln High School",
      students: 1100,
      location: "Denver",
      icon: School,
    },
  ];
  return (
    <div className="p-2">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">Overview</h1>
        <Button className="bg-purple-600 hover:bg-purple-700">
          New School
        </Button>
      </div>

      <h2 className="text-xl font-semibold mb-2">Schools</h2>

      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-4">
        {schools.map((school, i) => (
          <Card key={i} className="p-2 flex items-center">
            <school.icon className="h-12 w-12 text-purple-600 " />
            <CardContent>
              <h3 className="text-lg font-semibold mb-2">{school.name}</h3>
              <div className="flex gap-1 text-sm text-muted-foreground mb-1">
                <GraduationCap className="h-4 w-4 text-indigo-600" />
                <span>{school.students} Students</span>
              </div>

              <div className="flex gap-1 text-sm text-muted-foreground mb-1">
                <User className="h-4 w-4 text-green-600" />
                <span>{school.teachers} Teachers</span>
              </div>

              <div className="flex gap-1 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 text-blue-600" />
                <span>{school.address}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
