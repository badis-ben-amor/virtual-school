"use client";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
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
import {
  createStudentThunk,
  deleteStudentThunk,
  getAllStudentsThunk,
  toggleShowEdietButtons,
  updateStudentThunk,
} from "@/redux/slices/studentSlice";
import { Appdipatch, RootState } from "@/redux/store";
import { ClassroomType } from "@/types/classroomType";
import { StudentType } from "@/types/studentType";
import { ArrowDown, ArrowUp, Pen, Plus, RotateCw, Trash2 } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Student = () => {
  const dispatch = useDispatch<Appdipatch>();
  const {
    accessToken,
    students: studentsData,
    showEdietButtons,
    pageCount,
    page: pageData,
  } = useSelector((state: RootState) => state.student);

  const [activeSchoolId, setActiveSchoolId] = useState("");
  const [GetActiveSchoolIdError, setGetActiveSchoolIdError] = useState("");
  const [GetActiveSchoolIdAlert, setGetActiveSchoolIdAlert] = useState(false);
  const [students, setStudents] = useState<StudentType[]>([]);
  const [editingStudent, setEditingStudent] = useState(false);
  const [studentForm, setStudentForm] = useState<StudentType>({
    _id: "",
    first_name: "",
    last_name: "",
    classroom_id: "",
    school_id: "",
    student_img: null,
  });
  const [classrooms, setClassrooms] = useState<ClassroomType[]>([]);
  const [classroomsInDialog, setClassroomsInDialog] = useState<ClassroomType[]>(
    []
  );
  const [
    searchInputClassrommsInDialogValue,
    setSearchInputClassrommsInDialogValue,
  ] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [page, setPage] = useState(1);
  const [limit] = useState(12);
  const [first_name_search, setFirst_name_search] = useState("");
  const [last_name_search, setLast_name_search] = useState("");
  const [sortByDate, setSortByDate] = useState("");
  const [sortByName, setSortByName] = useState("");
  const [classroom_id, setclassroom_id] = useState("");
  const [searchInputValue, setSearchInputValue] = useState("");

  useEffect(() => {
    dispatch(getActiveSchoolThunk(accessToken))
      .unwrap()
      .then((res: any) => {
        dispatch(
          getAllStudentsThunk({
            accessToken,
            school_id: res.res.activeSchool._id,
            page,
            limit,
            first_name_search,
            last_name_search,
            sortByDate,
            sortByName,
            classroom_id,
          })
        );
        setActiveSchoolId(res.res.activeSchool._id);
        dispatch(
          getAllClassroomThunk({
            accessToken,
            school_id: res.res.activeSchool._id,
          })
        )
          .unwrap()
          .then((res) => {
            setClassrooms(res.res.data);
            setClassroomsInDialog(res.res.data);
          });
      })
      .catch((err) => {
        setGetActiveSchoolIdError(err);
        setGetActiveSchoolIdAlert(true);
      });
  }, []);

  useEffect(() => {
    setStudents(studentsData);
  }, [studentsData]);

  useEffect(() => {
    dispatch(
      getAllStudentsThunk({
        accessToken,
        school_id: activeSchoolId,
        page,
        limit,
        first_name_search,
        last_name_search,
        sortByDate,
        sortByName,
        classroom_id,
      })
    );
  }, [
    page,
    first_name_search,
    last_name_search,
    sortByDate,
    sortByName,
    classroom_id,
  ]);

  const handleOpenDialog = (student?: StudentType) => {
    if (student) {
      student = { ...student, classroom_id: student.classroom_id._id };
      setEditingStudent(true);
    }

    setStudentForm(
      student || {
        _id: "",
        first_name: "",
        last_name: "",
        classroom_id: "",
        school_id: "",
        student_img: null,
      }
    );
    setOpenDialog(true);
  };

  const handleSubmit = () => {
    const formData = new FormData();

    formData.append("first_name", studentForm.first_name);
    formData.append("last_name", studentForm.last_name);
    formData.append("classroom_id", studentForm.classroom_id);
    formData.append("school_id", activeSchoolId);
    if (studentForm.student_img instanceof File) {
      formData.append("student_img", studentForm.student_img);
    }

    if (editingStudent) {
      dispatch(
        updateStudentThunk({
          accessToken,
          studentData: formData,
          student_id: studentForm._id,
          school_id: activeSchoolId,
        })
      ).then(() =>
        dispatch(
          getAllStudentsThunk({
            accessToken,
            school_id: activeSchoolId,
            page,
            limit,
            first_name_search,
            last_name_search,
            sortByDate,
            sortByName,
            classroom_id,
          })
        )
      );
    } else {
      dispatch(createStudentThunk({ accessToken, studentData: formData })).then(
        () =>
          dispatch(
            getAllStudentsThunk({
              accessToken,
              school_id: activeSchoolId,
              page,
              limit,
              first_name_search,
              last_name_search,
              sortByDate,
              sortByName,
              classroom_id,
            })
          )
      );
    }

    handleCloseDialog();
  };

  const handleCloseDialog = () => {
    setTimeout(() => {
      setEditingStudent(false);
      setStudentForm({
        _id: "",
        first_name: "",
        last_name: "",
        classroom_id: "",
        school_id: "",
        student_img: null,
      });
    }, 150);
    setOpenDialog(false);
    handleSearchInputClassroomsInDialogChange("");
  };

  const handleDelete = (student_id: string) => {
    dispatch(
      deleteStudentThunk({ accessToken, student_id, school_id: activeSchoolId })
    ).then(() =>
      dispatch(
        getAllStudentsThunk({
          accessToken,
          school_id: activeSchoolId,
          page,
          limit,
          first_name_search,
          last_name_search,
          sortByDate,
          sortByName,
          classroom_id,
        })
      )
    );
  };

  const handleSearchValueChange = (value: string) => {
    setSearchInputValue(value);
    const fullName = value.trim().split(" ");
    setFirst_name_search(fullName[0]);
    setLast_name_search(fullName.slice(1).join(" "));
    setPage(1);
  };

  const handleResetFilters = () => {
    setSearchInputValue("");
    setFirst_name_search("");
    setLast_name_search("");
    setclassroom_id("");
    setSortByName("");
    setSortByDate("");
    setPage(1);
  };

  const handleSearchInputClassroomsInDialogChange = (v: string) => {
    setSearchInputClassrommsInDialogValue(v);
    dispatch(
      getAllClassroomThunk({
        accessToken,
        school_id: activeSchoolId,
        search_by_name: v,
      })
    )
      .unwrap()
      .then((res) => setClassroomsInDialog(res.res.data));
  };

  return (
    <div className="p-2">
      <div className="flex justify-between">
        <Button
          className="bg-[#e6edf5] hover:bg-[#d9e9fa] text-darck"
          onClick={() => handleOpenDialog()}
        >
          <Plus /> Add Student
        </Button>
        <Button
          className="bg-[#e6edf5] hover:bg-[#d9e9fa] text-darck"
          onClick={() => dispatch(toggleShowEdietButtons())}
        >
          {showEdietButtons ? (
            <>
              <RotateCw /> Cancel Edite
            </>
          ) : (
            <>
              <Pen /> Edite Students
            </>
          )}
        </Button>
      </div>

      <h1 className="text-xl font-semibold mb-2">Students</h1>

      <div className="flex justify-between items-center mb-2">
        <Command className="bg-[#f5f6f7] lg:w-1/5 md:w-1/4 w-1/3">
          <CommandInput
            value={searchInputValue}
            placeholder="Search Student..."
            onValueChange={handleSearchValueChange}
          />
        </Command>
        <RotateCw
          className="ml-1 mr-auto cursor-pointer h-4 w-4"
          onClick={() => {
            setSearchInputValue("");
            setFirst_name_search("");
            setLast_name_search("");
            setPage(1);
          }}
        />
        <Button onClick={handleResetFilters} variant={"outline"}>
          Reset Filters
        </Button>
      </div>

      <div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-y-2 mb-2">
        <div className="flex items-center gap-x-1">
          <Select
            value={classroom_id}
            onValueChange={(value) => setclassroom_id(value)}
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
          <RotateCw
            className="cursor-pointer"
            size={16}
            onClick={() => {
              setclassroom_id("");
              setPage(1);
            }}
          />
        </div>
        <div className="flex items-center gap-x-1">
          <Select
            value={sortByName}
            onValueChange={(value) => setSortByName(value)}
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
          <RotateCw
            className="cursor-pointer w-4 h-4"
            onClick={() => {
              setSortByName("");
              setPage(1);
            }}
          />
        </div>
        <div className="flex items-center gap-x-1">
          <Select
            value={sortByDate}
            onValueChange={(value) => setSortByDate(value)}
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
          <RotateCw
            className="cursor-pointer"
            size={16}
            onClick={() => {
              setSortByDate("");
              setPage(1);
            }}
          />
        </div>
      </div>

      <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-4">
        {students.map((student, i) => (
          <Card key={i} className="">
            <CardContent className="flex justify-between items-center">
              <Image
                src={student.student_img_url || "/male_student_avatar.png"}
                alt={`${student.first_name}_avatar`}
                height={70}
                width={70}
                className="rounded-full"
              />
              {showEdietButtons && (
                <div className="space-y-6">
                  <Pen
                    onClick={() => handleOpenDialog(student)}
                    className="h-5 w-5 cursor-pointer text-blue-500"
                  />
                  <Trash2
                    onClick={() => handleDelete(student._id)}
                    className="h-5 w-5 cursor-pointer text-red-500"
                  />
                </div>
              )}
              <div>
                <p className="font-semibold">{`${student.first_name} ${student.last_name}`}</p>
                <p className="text-gray-500 text-sm">
                  class : {student.classroom_id.classroom_name}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {students.length > 0 && (
        <Pagination className="mt-4">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setPage((p) => Math.max(p - 1, 1))}
              />
            </PaginationItem>

            {Array.from({ length: pageCount }, (_, i) => (
              <PaginationItem key={i}>
                <PaginationLink
                  isActive={pageData === i + 1}
                  onClick={() => setPage(i + 1)}
                  href="#"
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
                onClick={() => setPage((p) => Math.min(p + 1, pageCount))}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}

      <Dialog open={openDialog} onOpenChange={handleCloseDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingStudent ? "Edite Student" : "Add Student"}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-2">
            <div className="space-y-2">
              <Label htmlFor="first_name">First Name</Label>
              <Input
                id="first_name"
                name="first_name"
                value={studentForm.first_name}
                placeholder="Enter Student First Name"
                onChange={(e) =>
                  setStudentForm((prev) => ({
                    ...prev,
                    first_name: e.target.value,
                  }))
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="last_name">last Name</Label>
              <Input
                id="last_name"
                name="last_name"
                value={studentForm.last_name}
                placeholder="Enter Student Last Name"
                onChange={(e) =>
                  setStudentForm((prev) => {
                    return { ...prev, last_name: e.target.value };
                  })
                }
              />
            </div>
            <div className="flex justify-between gap-2">
              <div className="space-y-2">
                <Label>Select Classroom</Label>
                <Select
                  onValueChange={(value) =>
                    setStudentForm((prev) => ({
                      ...prev,
                      classroom_id: value,
                    }))
                  }
                  defaultValue={editingStudent ? studentForm.classroom_id : ""}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Student Classroom" />
                  </SelectTrigger>
                  <SelectContent>
                    <Input
                      value={searchInputClassrommsInDialogValue}
                      className="mb-2 shadow-lg"
                      onChange={(e) =>
                        handleSearchInputClassroomsInDialogChange(
                          e.target.value
                        )
                      }
                      placeholder="search by classroom..."
                    />
                    {classroomsInDialog.map((classroom) => (
                      <SelectItem
                        className="cursor-pointer"
                        key={classroom._id}
                        value={classroom._id}
                      >
                        {classroom.classroom_name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="student_img">Student Image</Label>
                <Input
                  className="cursor-pointer"
                  type="file"
                  id="student_img"
                  name="student_img"
                  onChange={(e) =>
                    setStudentForm((prev) => ({
                      ...prev,
                      student_img: e.target.files?.[0] || null,
                    }))
                  }
                />
              </div>
            </div>
            {studentForm.student_img && (
              <div className="text-center space-y-2">
                <div className="flex justify-center mt-4">
                  <img
                    src={URL.createObjectURL(studentForm.student_img)}
                    alt="student image preview"
                    className="h-25 rounded-full w-25"
                  />
                </div>
                <p>{studentForm.student_img.name}</p>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button onClick={handleSubmit} className="w-full">
              {editingStudent ? "Update" : "Add"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog
        open={GetActiveSchoolIdAlert}
        onOpenChange={setGetActiveSchoolIdAlert}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              <span className="text-red-900">Warning</span>
            </AlertDialogTitle>
            <AlertDialogDescription>
              <span className="text-red-500">{GetActiveSchoolIdError}</span>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Ok</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Student;
