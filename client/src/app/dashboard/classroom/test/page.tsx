// pages/classrooms.tsx
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Pen, Plus } from "lucide-react";

const classrooms = [
  { name: "GRADE 1 A", students: 25, room: "Room 101" },
  { name: "GRADE 1 B", students: 24, room: "Room 102" },
  { name: "GRADE 2 A", students: 28, room: "Room 104" },
  { name: "GRADE 3 A", students: 27, room: "Room 201" },
  { name: "GRADE 3 B", students: 26, room: "Room 202" },
  { name: "GRADE 3 B", students: 26, room: "Room 203" },
  { name: "GRADE 4 A", students: 29, room: "Room 203" },
  { name: "GRADE 4 A", students: 29, room: "Room 203" },
  { name: "GRADE 4 A", students: 31, room: "Room 204" },
];

export default function ClassroomsPage() {
  return (
    <div className="p-2">
      <div className="flex items-center justify-between">
        <Button className="bg-[#e6edf5] hover:bg-[#d9e9fa] text-darck">
          <Plus size={16} /> Add Classroom
        </Button>
        <Button className="bg-[#e6edf5] hover:bg-[#d9e9fa] text-darck">
          <Pen size={16} color="black" />
          Edite classroom
        </Button>
      </div>
      <h1 className="text-xl font-bold text-gray-800">Classrooms</h1>

      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4">
        {classrooms.map((cls, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                {cls.name}
              </h3>
              <p className="text-sm text-gray-600">{cls.students} students</p>
              <hr className="my-3 border-gray-200" />
              <p className="text-sm text-gray-500">{cls.room}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
