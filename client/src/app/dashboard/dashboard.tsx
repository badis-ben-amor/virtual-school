"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";

const Dashboard = () => {
  // Static data simulating API responses
  const schools = [
    { id: 1, name: "Greenwood High", students: 200, teachers: 20 },
    { id: 2, name: "Horizon Academy", students: 150, teachers: 15 },
  ];

  const subjects = [
    { id: 1, name: "Mathematics", teachers: 5 },
    { id: 2, name: "Science", teachers: 4 },
  ];

  const teachers = [
    {
      id: 1,
      name: "John Doe",
      subject: "Mathematics",
      school: "Greenwood High",
    },
    {
      id: 2,
      name: "Jane Smith",
      subject: "Science",
      school: "Horizon Academy",
    },
  ];

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Schools Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Schools Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Students</TableHead>
                <TableHead>Teachers</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {schools.map((school) => (
                <TableRow key={school.id}>
                  <TableCell>{school.name}</TableCell>
                  <TableCell>{school.students}</TableCell>
                  <TableCell>{school.teachers}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Subjects Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Subjects Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Subject</TableHead>
                <TableHead>Teachers</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {subjects.map((subject) => (
                <TableRow key={subject.id}>
                  <TableCell>{subject.name}</TableCell>
                  <TableCell>{subject.teachers}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Teachers List */}
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>Teachers</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>School</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {teachers.map((teacher) => (
                <TableRow key={teacher.id}>
                  <TableCell>{teacher.name}</TableCell>
                  <TableCell>{teacher.subject}</TableCell>
                  <TableCell>{teacher.school}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
