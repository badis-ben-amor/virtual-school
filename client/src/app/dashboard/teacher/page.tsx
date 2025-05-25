"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getAllClassroomThunk } from "@/redux/slices/classroomSlice";
import { getActiveSchoolThunk } from "@/redux/slices/schoolSlice";
import {
  createTeacherThunk,
  deleteTeacherThunk,
  getAllTeachersThunk,
  toggleShowEditeButtons,
  updateTeacherThunk,
} from "@/redux/slices/teacherSlice";
import { Appdipatch, RootState } from "@/redux/store";
import { ClassroomType } from "@/types/classroomType";
import { TeacherType } from "@/types/teacherType";
import { Pen, Plus, RotateCw, Trash2 } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Teacher = () => {
  const dispatch = useDispatch<Appdipatch>();
  const {
    teachers: teachersData,
    accessToken,
    showEditeButtons,
  } = useSelector((state: RootState) => state.teacher);

  const [teachers, setTeachers] = useState([]);
  const [activeSchoolId, setActiveSchoolId] = useState("");
  const [classrooms, setClassrooms] = useState<ClassroomType[]>([]);
  const [subjects, setSubjects] = useState([]);
  const [editingTeacher, setEditingTeacher] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [teacherForm, setTeacherForm] = useState<TeacherType>({
    _id: "",
    frst_name: "",
    last_name: "",
    classrooms: [],
    subjects: [],
    school_id: "",
    teacher_img: null,
  });

  useEffect(() => {
    dispatch(getActiveSchoolThunk(accessToken))
      .unwrap()
      .then((res) => {
        dispatch(
          getAllTeachersThunk({
            accessToken,
            school_id: res?.res.activeSchool._id,
          })
        );
        setActiveSchoolId(res?.res.activeSchool._id);
        dispatch(
          getAllClassroomThunk({
            accessToken,
            school_id: res?.res.activeSchool._id,
          })
        )
          .unwrap()
          .then((res) => setClassrooms(res.res));
      });
  }, []);

  useEffect(() => {
    setTeachers(teachersData);
  }, [teachersData]);

  const handleOpenDialog = (teacher?: TeacherType) => {
    if (teacher) {
      setEditingTeacher(true);
    }
    setTeacherForm(
      teacher || {
        _id: "",
        frst_name: "",
        last_name: "",
        classrooms: [],
        subjects: [],
        school_id: "",
        teacher_img: null,
      }
    );
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setEditingTeacher(false);
    setTeacherForm({
      _id: "",
      frst_name: "",
      last_name: "",
      classrooms: [],
      subjects: [],
      school_id: "",
      teacher_img: null,
    });
    setOpenDialog(false);
  };

  const handleSubmit = () => {
    const formData = new FormData();

    formData.append("frst_name", teacherForm.frst_name);
    formData.append("last_name", teacherForm.last_name);
    formData.append("classrooms", JSON.stringify(teacherForm.classrooms));
    formData.append("subjects", JSON.stringify(teacherForm.subjects));
    formData.append("school_id", activeSchoolId);
    if (teacherForm.teacher_img instanceof File)
      formData.append("teacher_img", teacherForm.teacher_img);

    if (editingTeacher) {
      dispatch(
        updateTeacherThunk({
          accessToken,
          teacherData: formData,
          school_id: activeSchoolId,
          teacher_id: teacherForm._id,
        })
      ).then(() =>
        dispatch(
          getAllTeachersThunk({ accessToken, school_id: activeSchoolId })
        )
      );
    } else {
      dispatch(createTeacherThunk({ accessToken, teacherData: formData })).then(
        () =>
          dispatch(
            getAllTeachersThunk({ accessToken, school_id: activeSchoolId })
          )
      );
    }
    handleCloseDialog();
  };

  const handleDeleteTeacher = (teacher_id: string) => {
    dispatch(
      deleteTeacherThunk({ accessToken, school_id: activeSchoolId, teacher_id })
    ).then(() =>
      dispatch(getAllTeachersThunk({ accessToken, school_id: activeSchoolId }))
    );
  };

  return (
    <div className="p-2">
      <div className="flex justify-between">
        <Button
          className="bg-[#e6edf5] hover:bg-[#d9e9fa] text-darck"
          onClick={() => handleOpenDialog()}
        >
          <Plus /> Add New Teacher
        </Button>
        <Button
          className="bg-[#e6edf5] hover:bg-[#d9e9fa] text-darck"
          onClick={() => dispatch(toggleShowEditeButtons())}
        >
          {showEditeButtons ? (
            <>
              <RotateCw /> Cancel Edite
            </>
          ) : (
            <>
              <Pen /> Edite Teachers
            </>
          )}
        </Button>
      </div>

      <h2 className="text-xl font-semibold mb-2">Teacher</h2>

      <div className="grid lg:grid-cols-4 md:grid-cols-3 gap-4 grid-cols-2">
        {teachers.map((teacher: TeacherType) => (
          <Card key={teacher._id} className="p-1">
            <CardContent className="">
              <div
                className={`flex ${
                  showEditeButtons ? "justify-between" : "justify-center"
                }`}
              >
                {showEditeButtons && (
                  <Pen
                    onClick={() => handleOpenDialog(teacher)}
                    className="h-5 w-5  text-blue-500 cursor-pointer"
                  />
                )}
                <div className="w-15 h-15 relative">
                  <Image
                    src={teacher.teacher_img_url || "/male_teacher_avatar.png"}
                    alt={`Mr./Ms. ${teacher.frst_name} ${teacher.last_name} avatar`}
                    fill
                    className="rounded-full object-cover"
                  />
                </div>
                {showEditeButtons && (
                  <Trash2
                    onClick={() => handleDeleteTeacher(teacher._id)}
                    className="h-5 w-5 text-red-500 cursor-pointer"
                  />
                )}
              </div>
              <div className="text-center">
                <p>{`Mr/Ms: ${teacher.frst_name} ${teacher.last_name}`}</p>
                <p>Class: </p>
                <p>Subject: </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={openDialog} onOpenChange={handleCloseDialog}>
        <DialogContent className="max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingTeacher ? "Edite Teacher" : "Add Teacher"}
            </DialogTitle>
          </DialogHeader>

          <div className="flex justify-between">
            <div className="space-y-2">
              <Label htmlFor="frst_name">First Name</Label>
              <Input
                id="frst_name"
                name="frst_name"
                value={teacherForm.frst_name}
                placeholder="Enter Teaacher First Name"
                onChange={(e) =>
                  setTeacherForm((prev) => ({
                    ...prev,
                    frst_name: e.target.value,
                  }))
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="last_name">Last Name</Label>
              <Input
                id="last_name"
                name="last_name"
                value={teacherForm.last_name}
                placeholder="Enter Teaacher Last Name"
                onChange={(e) =>
                  setTeacherForm((prev) => ({
                    ...prev,
                    last_name: e.target.value,
                  }))
                }
              />
            </div>
          </div>
          <div className="flex justify-between">
            <div className="space-y-2">
              <Label>Select teacher classroom(s)</Label>
              <div className="flex flex-wrap gap-1 w-full">
                {teacherForm.classrooms.map((classroom) => (
                  <div
                    className="bg-blue-100 p-0.5 rounded-lg mt-1"
                    key={classroom}
                  >
                    {classrooms.map(
                      (classroomObject) =>
                        classroomObject._id === classroom && (
                          <div key={classroomObject._id} className="relative">
                            <Button
                              variant={"destructive"}
                              className=" h-4 w-4 p-0 m-0 absolute -top-3 -right-2"
                            >
                              x
                            </Button>
                            <p>{classroomObject.classroom_name}</p>
                          </div>
                        )
                    )}
                  </div>
                ))}
              </div>
              <Select
                onValueChange={(value) =>
                  setTeacherForm((prev) => ({
                    ...prev,
                    classrooms: [...prev.classrooms, value],
                  }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Teacher Classroom(s)" />
                </SelectTrigger>
                <SelectContent>
                  <Input />
                  {classrooms.map((classroom) => (
                    <SelectItem key={classroom._id} value={classroom._id}>
                      {classroom.classroom_name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Select Teacher Subject(s)</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Enter Teacher Subject(s)" />
                </SelectTrigger>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="teacher_img">Choose Teacher Image</Label>
            <Input
              type="file"
              id="teacher_img"
              name="teacher_img"
              onChange={(e) =>
                setTeacherForm((prev) => ({
                  ...prev,
                  teacher_img: e.target.files?.[0] || null,
                }))
              }
            />
          </div>
          {teacherForm.teacher_img && (
            <div className="text-center space-y-1">
              <div className="flex justify-center">
                <img
                  src={URL.createObjectURL(teacherForm.teacher_img)}
                  alt="teacher image preview"
                  className="h-25 w-25 rounded-full"
                />
              </div>
              <p>{teacherForm.teacher_img.name}</p>
            </div>
          )}
          <DialogFooter>
            <Button onClick={handleSubmit} className="w-full">
              {editingTeacher ? "Update" : "Add"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Teacher;
