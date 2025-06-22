"use client";
import React from "react";
import {
  GraduationCap,
  Users,
  School as School_icon,
  NotebookText,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
// chart
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  // Bar
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  // Pie
  ArcElement,
} from "chart.js";
ChartJS.register(
  // Bar
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  // Pie
  ArcElement
);
import { useDispatch, useSelector } from "react-redux";
import { Appdipatch, RootState } from "@/redux/store";
import { useEffect } from "react";
import { getAllSchoolsThunk } from "@/redux/slices/schoolSlice";

const School = () => {
  const dispatch = useDispatch<Appdipatch>();
  const { accessToken } = useSelector((state: RootState) => state.user);
  const { schools } = useSelector((state: RootState) => state.school);

  useEffect(() => {
    dispatch(getAllSchoolsThunk({ accessToken }));
  }, []);

  console.log(schools);

  const studentsDataBar = {
    labels: schools.map((s: any) => s.school_name),
    datasets: [
      {
        label: "Students By School",
        data: schools.map((s: any) => s.studentsLength),
        backgroundColor: "#4f46e5", // Tailwind indigo-600
      },
    ],
  };

  const classroomsDataPie = {
    labels: schools.map((s: any) => s.school_name),
    datasets: [
      {
        data: schools.map((s: any) => s.cassroomsLength),
        backgroundColor: ["red", "blue", "yellow"],
      },
    ],
  };

  // const options = {
  //   responsive: true,
  //   plugins: {
  //     legend: {
  //       position: "top" as const,
  //     },
  //   },
  // };

  // end charts

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
      title: "Subjects",
      value: "5",
      icon: <NotebookText className="w-6 h-6" />,
      color: "bg-purple-500",
    },
    {
      title: "Classes",
      value: "40",
      icon: <School_icon className="w-6 h-6" />,
      color: "bg-[#a3ccd4]",
    },
  ];

  const links = [
    { label: "Students", icon: <GraduationCap className="w-4 h-4" /> },
    { label: "Teachers", icon: <Users className="w-4 h-4" /> },
    { label: "Subjects", icon: <NotebookText style={{ fontSize: "100px" }} /> },
    { label: "Classes", icon: <School_icon className="w-4 h-4" /> },
  ];
  return (
    <div className="p-6 space-y-10">
      <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-4">
        {stats.map((stat, i) => (
          <Card key={i} className={`${stat.color} text-white`}>
            <CardContent className="flex items-center justify-around space-x-4">
              {stat.icon}
              <div>
                <p className="text-md opacity-90">{stat.title}</p>
                <p className="text-lg font-bold">{stat.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-2">Quick Links</h2>
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-2">
          {links.map((link, i) => (
            <Button key={i} variant={"outline"} className="gap-4">
              {link.icon}
              {link.label}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-4 ">
        <div className="bg-white shadow-md p-4 rounded-xl">
          <Bar data={studentsDataBar} />
        </div>
        <div className="bg-white shadow-md p-4 rounded-xl">
          <Pie data={classroomsDataPie} />
        </div>
      </div>
    </div>
  );
};

export default School;
