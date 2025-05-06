import { Card, CardContent } from "@/components/ui/card";
import { Calendar, GraduationCap, Users, School, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

const stats = [
  {
    title: "Students",
    value: "1,450",
    icon: <GraduationCap className="w-6 h-6" />,
    color: "bg-blue-500",
  },
  {
    title: "Teachers",
    value: "50",
    icon: <Users className="w-6 h-6" />,
    color: "bg-green-500",
  },
  {
    title: "Events",
    value: "5",
    icon: <Calendar className="w-6 h-6" />,
    color: "bg-purple-500",
  },
  {
    title: "Classes",
    value: "40",
    icon: <School className="w-6 h-6" />,
    color: "bg-orange-500",
  },
];

const links = [
  { label: "Students", icon: <GraduationCap className="w-4 h-4" /> },
  { label: "Teachers", icon: <Users className="w-4 h-4" /> },
  { label: "Calendar", icon: <Calendar className="w-4 h-4" /> },
  { label: "Exam", icon: <FileText className="w-4 h-4" /> },
];

export default function Dashboard() {
  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="text-white">
            <CardContent
              className={`flex items-center justify-between p-4 rounded-lg shadow ${stat.color}`}
            >
              <div>
                <p className="text-sm opacity-80">{stat.title}</p>
                <p className="text-xl font-bold">{stat.value}</p>
              </div>
              {stat.icon}
            </CardContent>
          </Card>
        ))}
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-4">Quick Links</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {links.map((link) => (
            <Button
              key={link.label}
              variant="outline"
              className="flex items-center justify-center gap-2 p-4"
            >
              {link.icon}
              {link.label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
