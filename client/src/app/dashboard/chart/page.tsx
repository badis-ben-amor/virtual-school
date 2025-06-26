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
// charts
import { Bar, Pie, Doughnut, Line } from "react-chartjs-2";
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
  Title,
  // Line,
  LineElement,
  PointElement,
  Filler,
} from "chart.js";
ChartJS.register(
  // Bar
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  // Pie
  ArcElement,
  Title,
  // Line
  LineElement,
  PointElement,
  Filler
);
import { useDispatch, useSelector } from "react-redux";
import { Appdipatch, RootState } from "@/redux/store";
import { useEffect } from "react";
import { getAllSchoolsThunk } from "@/redux/slices/schoolSlice";
import Link from "next/link";

const Chart = () => {
  const dispatch = useDispatch<Appdipatch>();
  const { accessToken } = useSelector((state: RootState) => state.user);
  const { schools } = useSelector((state: RootState) => state.school);

  useEffect(() => {
    dispatch(getAllSchoolsThunk({ accessToken }));
  }, []);

  console.log(schools);
  console.log(schools.map((s: any) => s.studentsLength));

  // students
  const studentsDataBar = {
    labels: schools.map((s: any) => s.school_name),
    datasets: [
      {
        label: "Students By School",
        data: schools.map((s: any) => s.studentsLength),
        backgroundColor: schools.map(
          (s: any) =>
            `#${Math.floor(Math.random() * 0xffffff)
              .toString(16)
              .padStart(6, "0")}`
        ),
      },
    ],
  };
  // const studentsDataBarOptions = {
  //   plugins: {
  //     title: {
  //       display: true,
  //       text: "Students By School",
  //     },
  //   },
  // };
  // const studentsDataBarOptions = {
  //   responsive: true,
  //   plugins: {
  //     legend: {
  //       position: "top" as const,
  //     },
  //   },
  // };

  // classrooms
  const classroomsDataPie = {
    labels: schools.map((s: any) => s.school_name),
    datasets: [
      {
        label: "Classrooms By School",
        data: schools.map((s: any) => s.classroomsLength),
        backgroundColor: schools.map(
          (s: any) =>
            `#${Math.floor(Math.random() * 0xffffff)
              .toString(16)
              .padStart(6, "0")}`
        ),
      },
    ],
  };
  const classroomsDataPieOptions = {
    plugins: {
      title: {
        display: true,
        text: "Classrooms By School",
      },
    },
  };

  // teachers
  const teachersDataDoughnut = {
    labels: schools.map((s: any) => s.school_name),
    datasets: [
      {
        label: "Teachers By School",
        data: schools.map((s: any) => s.teachersLength),
        backgroundColor: schools.map(
          (s: any) =>
            `#${Math.floor(Math.random() * 0xffffff)
              .toString(16)
              .padStart(6, "0")}`
        ),
      },
    ],
  };
  const teachersDataDoughnutOptions = {
    plugins: {
      title: {
        display: true,
        text: "Teachears By School",
      },
    },
  };

  // subjects
  const subjectsDataLine = {
    labels: schools.map((s: any) => s.school_name),
    datasets: [
      {
        label: "Subjects By School",
        data: schools.map((s: any) => s.subjectsLength),
        backgroundColor: schools.map(
          (s: any) =>
            `#${Math.floor(Math.random() * 0xffffff)
              .toString(16)
              .padStart(6, "0")}`
        ),
        fill: true,
        borderColor: `#${Math.floor(Math.random() * 0xffffff)
          .toString(16)
          .padStart(6, "0")}`,
        tension: 0.4,
      },
    ],
  };
  // const subjectsDataLineOptions = {
  //   plugins: {
  //     title: {
  //       display: true,
  //       text: "Teachears By School",
  //     },
  //   },
  // };
  // end charts

  const stats = [
    {
      title: "Students",
      value: schools.reduce((sum, obj: any) => sum + obj.studentsLength, 0),
      icon: <GraduationCap className="w-6 h-6" />,
      color: "bg-blue-500",
    },
    {
      title: "Classes",
      value: schools.reduce((sum, obj: any) => sum + obj.classroomsLength, 0),
      icon: <School_icon className="w-6 h-6" />,
      color: "bg-green-500",
    },
    {
      title: "Teachers",
      value: schools.reduce((sum, obj: any) => sum + obj.teachersLength, 0),
      icon: <Users className="w-6 h-6" />,
      color: "bg-purple-500",
    },
    {
      title: "Subjects",
      value: schools.reduce((sum, obj: any) => sum + obj.subjectsLength, 0),
      icon: <NotebookText className="w-6 h-6" />,
      color: "bg-[#a3ccd4]",
    },
  ];

  const links = [
    {
      label: "Students",
      icon: <GraduationCap className="w-4 h-4" />,
      href: "student",
    },
    {
      label: "Classes",
      icon: <School_icon className="w-4 h-4" />,
      href: "classroom",
    },
    {
      label: "Teachers",
      icon: <Users className="w-4 h-4" />,
      href: "teacher",
    },
    {
      label: "Subjects",
      icon: <NotebookText style={{ fontSize: "100px" }} />,
      href: "subject",
    },
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
            <Link key={i} href={link.href}>
              <Button variant={"outline"}>
                {link.icon}
                {link.label}
              </Button>
            </Link>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-4 ">
        <div className="bg-white shadow-md p-4 rounded-xl">
          <Bar data={studentsDataBar} />
        </div>
        <div className="bg-white shadow-md p-4 rounded-xl">
          <Pie data={classroomsDataPie} options={classroomsDataPieOptions} />
        </div>
        <div className="bg-white shadow-md p-4 rounded-xl">
          <Doughnut
            data={teachersDataDoughnut}
            options={teachersDataDoughnutOptions}
          />
        </div>
        <div className="bg-white shadow-md p-4 rounded-xl">
          <Line data={subjectsDataLine} />
        </div>
      </div>
    </div>
  );
};

export default Chart;
