import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import img from "../../../../public/student_avatar.jpg";
import Image from "next/image";

const students = [
  { name: "Jacob Jones", class: "Class 5" },
  { name: "Emma Garcia", class: "Class 4" },
  { name: "Ethan Lee", class: "Class 3" },
  { name: "Olivia Martin", class: "Class 5" },
  { name: "Abigail Smith", class: "Class 3" },
  { name: "Michael Brown", class: "Class 4" },
  { name: "Alexander Davis", class: "Class 2" },
  { name: "Sophia Wilson", class: "Class 1" },
  { name: "Daniel Miller", class: "Class 2" },
  { name: "Isabella Moore", class: "Class 1" },
  { name: "James Taylor", class: "Class 5" },
  { name: "Mia Johnson", class: "Class 3" },
];

export default function StudentsPage() {
  return (
    <div className="min-h-screen bg-white p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Students</h1>
        <Button>Add Student</Button>
      </div>

      {/* <Input type="text" placeholder="Search" className="mb-6 max-w-sm" /> */}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {students.map((student, index) => (
          <Card key={index} className="text-center">
            <CardContent className="flex flex-col items-center">
              <div className="">
                <Image
                  alt="student_avatar"
                  className="rounded-full"
                  height={70}
                  src={img}
                />
              </div>
              <div className="font-semibold">{student.name}</div>
              <div className="text-gray-500 text-sm">{student.class}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
