"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Command, CommandInput } from "@/components/ui/command";
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
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getAllClassroomThunk } from "@/redux/slices/classroomSlice";
import { getActiveSchoolThunk } from "@/redux/slices/schoolSlice";
import { getAllSubjectsThunk } from "@/redux/slices/subjectSlice";
import {
  createTeacherThunk,
  deleteTeacherThunk,
  getAllTeachersThunk,
  setClassroom_id,
  setFirst_name_search,
  setLast_name_search,
  setPage,
  setSearchInputValue,
  setSortByDate,
  setSortByName,
  setSubject_id,
  toggleShowEditeButtons,
  updateTeacherThunk,
} from "@/redux/slices/teacherSlice";
import { Appdipatch, RootState } from "@/redux/store";
import { ClassroomType } from "@/types/classroomType";
import { SubjectType } from "@/types/subjectType";
import { TeacherType } from "@/types/teacherType";
import { ArrowDown, ArrowUp, Pen, Plus, X, Trash2 } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Teacher = () => {
  const dispatch = useDispatch<Appdipatch>();
  const {
    teachers: teachersData,
    accessToken,
    showEditeButtons,
    pageCount,
    page,
    limit,
    first_name_search,
    last_name_search,
    searchInputValue,
    classroom_id,
    subject_id,
    sortByName,
    sortByDate,
  } = useSelector((state: RootState) => state.teacher);

  const [teachers, setTeachers] = useState([]);
  const [activeSchoolId, setActiveSchoolId] = useState("");
  const [classrooms, setClassrooms] = useState<ClassroomType[]>([]);
  const [subjects, setSubjects] = useState<SubjectType[]>([]);
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
        setActiveSchoolId(res?.res.activeSchool._id);
        dispatch(
          getAllTeachersThunk({
            accessToken,
            school_id: res?.res.activeSchool._id,
            page,
            limit,
            first_name_search,
            last_name_search,
            classroom_id,
            subject_id,
            sortByName,
            sortByDate,
          })
        );
        dispatch(
          getAllClassroomThunk({
            accessToken,
            school_id: res?.res.activeSchool._id,
          })
        )
          .unwrap()
          .then((res) => setClassrooms(res.res));
        dispatch(
          getAllSubjectsThunk({
            accessToken,
            school_id: res?.res.activeSchool._id,
          })
        )
          .unwrap()
          .then((res) => setSubjects(res.data.data));
      });
  }, []);

  useEffect(() => {
    setTeachers(teachersData);
  }, [teachersData]);

  useEffect(() => {
    dispatch(
      getAllTeachersThunk({
        accessToken,
        school_id: activeSchoolId,
        page,
        limit,
        first_name_search,
        last_name_search,
        classroom_id,
        subject_id,
        sortByName,
        sortByDate,
      })
    );
  }, [
    page,
    first_name_search,
    last_name_search,
    classroom_id,
    subject_id,
    sortByName,
    sortByDate,
  ]);

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
          getAllTeachersThunk({
            accessToken,
            school_id: activeSchoolId,
            page,
            limit,
            first_name_search,
            last_name_search,
            classroom_id,
            subject_id,
            sortByName,
            sortByDate,
          })
        )
      );
    } else {
      dispatch(createTeacherThunk({ accessToken, teacherData: formData })).then(
        () =>
          dispatch(
            getAllTeachersThunk({
              accessToken,
              school_id: activeSchoolId,
              page,
              limit,
              first_name_search,
              last_name_search,
              classroom_id,
              subject_id,
              sortByName,
              sortByDate,
            })
          )
      );
    }
    handleCloseDialog();
  };

  const handleDeleteTeacher = (teacher_id: string) => {
    dispatch(
      deleteTeacherThunk({ accessToken, school_id: activeSchoolId, teacher_id })
    ).then(() =>
      dispatch(
        getAllTeachersThunk({
          accessToken,
          school_id: activeSchoolId,
          page,
          limit,
          first_name_search,
          last_name_search,
          classroom_id,
          subject_id,
          sortByName,
          sortByDate,
        })
      )
    );
  };

  const handleSearchValueChange = (value: string) => {
    dispatch(setSearchInputValue(value));
    const fullName = value.trim().split(" ");
    dispatch(setFirst_name_search(fullName[0]));
    dispatch(setLast_name_search(fullName.slice(1).join(" ")));
    dispatch(setPage(1));
  };

  const handleResetFilters = () => {
    dispatch(setSearchInputValue(""));
    dispatch(setFirst_name_search(""));
    dispatch(setLast_name_search(""));
    dispatch(setClassroom_id(""));
    dispatch(setSubject_id(""));
    dispatch(setSortByName(""));
    dispatch(setSortByDate(""));
    dispatch(setPage(1));
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
              <X /> Cancel Edite
            </>
          ) : (
            <>
              <Pen /> Edite Teachers
            </>
          )}
        </Button>
      </div>

      <h2 className="text-xl font-semibold mb-2">Teachers</h2>

      <div className="flex justify-between items-center mb-2">
        <Command className="bg-[#f5f6f7] lg:w-1/5 md:w-1/4 w-1/3">
          <CommandInput
            value={searchInputValue}
            onValueChange={(value) => handleSearchValueChange(value)}
            placeholder="search by teacher..."
          />
        </Command>
        <X
          onClick={() => {
            dispatch(setSearchInputValue(""));
            dispatch(setFirst_name_search(""));
            dispatch(setLast_name_search(""));
            dispatch(setPage(1));
          }}
          size={16}
          className="mr-auto ml-1 cursor-pointer"
        />
        <Button onClick={handleResetFilters} variant={"outline"}>
          Reset Filters
        </Button>
      </div>

      <div className="grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-y-2 mb-2">
        <div className="flex items-center gap-x-1">
          <Select
            value={classroom_id}
            onValueChange={(value) => {
              dispatch(setClassroom_id(value));
              dispatch(setPage(1));
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="select by class" />
            </SelectTrigger>
            <SelectContent>
              {classrooms.map((classroom) => (
                <SelectItem key={classroom._id} value={classroom._id}>
                  {classroom.classroom_name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <X
            onClick={() => {
              dispatch(setClassroom_id(""));
              dispatch(setPage(1));
            }}
            className="h-4 w-4 cursor-pointer"
          />
        </div>
        <div className="flex items-center gap-x-1">
          <Select
            value={subject_id}
            onValueChange={(v) => {
              dispatch(setSubject_id(v));
              dispatch(setPage(1));
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="select by subject" />
            </SelectTrigger>
            <SelectContent>
              {subjects.map((subject) => (
                <SelectItem key={subject._id} value={subject._id}>
                  {subject.subject_name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <X
            onClick={() => {
              dispatch(setSubject_id(""));
              dispatch(setPage(1));
            }}
            className="h-4 w-4 cursor-pointer"
          />
        </div>
        <div className="flex items-center gap-x-1">
          <Select
            value={sortByName}
            onValueChange={(v) => dispatch(setSortByName(v))}
          >
            <SelectTrigger>
              <SelectValue placeholder="sort by name" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="asc">
                name <ArrowUp />
              </SelectItem>
              <SelectItem value="desc">
                name <ArrowDown />
              </SelectItem>
            </SelectContent>
          </Select>
          <X
            onClick={() => {
              dispatch(setSortByName(""));
              dispatch(setPage(1));
            }}
            className="w-4 h-4 cursor-pointer"
          />
        </div>
        <div className="flex items-center gap-x-1">
          <Select
            value={sortByDate}
            onValueChange={(v) => dispatch(setSortByDate(v))}
          >
            <SelectTrigger>
              <SelectValue placeholder="sort by date" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="asc">
                date <ArrowUp />
              </SelectItem>
              <SelectItem value="desc">
                date <ArrowDown />
              </SelectItem>
            </SelectContent>
          </Select>
          <X
            className="cursor-pointer w-4 h-4"
            onClick={() => {
              dispatch(setSortByDate(""));
              dispatch(setPage(1));
            }}
          />
        </div>
      </div>

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
                  <Button
                    onClick={() => handleOpenDialog(teacher)}
                    size={"sm"}
                    variant={"outline"}
                  >
                    <Pen className="h-5 w-5  text-blue-500 cursor-pointer" />
                  </Button>
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
                  <Button
                    onClick={() => handleDeleteTeacher(teacher._id)}
                    size={"sm"}
                    variant={"outline"}
                  >
                    <Trash2 className="h-5 w-5 text-red-500 cursor-pointer" />
                  </Button>
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

      {teachers.length > 0 && (
        <Pagination className="mt-4">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => dispatch(setPage(Math.max(page - 1, 1)))}
              />
            </PaginationItem>
            {Array.from({ length: pageCount }, (_, i) => (
              <PaginationItem key={i}>
                <PaginationLink
                  isActive={page === i + 1}
                  href="#"
                  onClick={() => dispatch(setPage(i + 1))}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                className={`${
                  page === pageCount &&
                  "bg-stone-100 text-stone-400 hover:bg-stone-100 hover:text-stone-400"
                }`}
                onClick={() => dispatch(setPage(Math.min(page + 1, pageCount)))}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}

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
                              onClick={() => {
                                setTeacherForm((prev) => ({
                                  ...prev,
                                  classrooms: prev.classrooms.filter(
                                    (formClassroom) =>
                                      formClassroom !== classroom
                                  ),
                                }));
                              }}
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
                  <Input placeholder="search classroom..." />
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
              <div className="flex flex-wrap gap-1 w-full">
                {teacherForm.subjects.map((subject) => (
                  <div key={subject} className="bg-blue-100 rounded-lg mt-1">
                    {subjects.map(
                      (subjectObject) =>
                        subjectObject._id === subject && (
                          <div key={subjectObject._id} className="relative">
                            <Button
                              variant={"destructive"}
                              className="h-4 w-4 p-0 m-0 absolute -top-3 -right-2 "
                              onClick={() => {
                                setTeacherForm((prev) => ({
                                  ...prev,
                                  subjects: prev.subjects.filter(
                                    (formSubject) => formSubject !== subject
                                  ),
                                }));
                              }}
                            >
                              x
                            </Button>
                            <p>{subjectObject.subject_name}</p>
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
                    subjects: [...prev.subjects, value],
                  }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Enter Teacher Subject(s)" />
                </SelectTrigger>
                <SelectContent>
                  {subjects.map((subject) => (
                    <SelectItem key={subject._id} value={subject._id}>
                      {subject.subject_name}
                    </SelectItem>
                  ))}
                </SelectContent>
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
