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
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Textarea } from "@/components/ui/textarea";
import {
  createClassroomThunk,
  deleteClassroomThunk,
  getAllClassroomThunk,
  setPage,
  toggleShowEditeIcons,
  updateClassroomThunk,
} from "@/redux/slices/classroomSlice";
import { getActiveSchoolThunk } from "@/redux/slices/schoolSlice";
import { Appdipatch, RootState } from "@/redux/store";
import { ClassroomType } from "@/types/classroomType";
import { DoorOpen, Pen, Plus, RotateCw, Trash, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Classroom = () => {
  const dispatch = useDispatch<Appdipatch>();
  const {
    classrooms: classroomsData,
    showEditeIcons,
    page,
    limit,
    pages,
    pageFromApi,
  } = useSelector((state: RootState) => state.classroom);
  const { accessToken } = useSelector((state: RootState) => state.auth);

  const [classrooms, setClassrooms] = useState<ClassroomType[]>([]);
  const [editingClassroom, setEditeClassroom] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [classroomForm, setClassroomForm] = useState<ClassroomType>({
    _id: "",
    classroom_name: "",
    school_id: "",
    room: "",
    description: "",
    studentsLength: 0,
  });
  const [activeSchoolId, setActiveSchoolId] = useState("");

  useEffect(() => {
    dispatch(getActiveSchoolThunk(accessToken))
      .unwrap()
      .then((res) => {
        setActiveSchoolId(res?.res?.activeSchool._id);
        dispatch(
          getAllClassroomThunk({
            accessToken,
            school_id: res?.res?.activeSchool._id,
            limit,
            page,
          })
        );
      });
  }, []);

  useEffect(() => {
    setClassrooms(classroomsData);
  }, [classroomsData]);

  useEffect(() => {
    dispatch(
      getAllClassroomThunk({
        accessToken,
        school_id: activeSchoolId,
        limit,
        page,
      })
    );
  }, [page]);

  const handleOpenDialog = (classroom?: ClassroomType) => {
    if (classroom) {
      setEditeClassroom(true);
      setClassroomForm(classroom);
    } else {
      setEditeClassroom(false);
      setClassroomForm({
        _id: "",
        classroom_name: "",
        school_id: "",
        room: "",
        description: "",
        studentsLength: 0,
      });
    }

    setOpenDialog(true);
  };

  const handleSubmit = () => {
    if (editingClassroom) {
      dispatch(
        updateClassroomThunk({
          accessToken,
          classroomData: classroomForm,
          classroom_id: classroomForm._id,
          school_id: classroomForm.school_id,
        })
      ).then(() =>
        dispatch(
          getAllClassroomThunk({
            accessToken,
            school_id: activeSchoolId,
            limit,
            page,
          })
        )
      );
    } else {
      dispatch(
        createClassroomThunk({
          accessToken,
          classroomData: classroomForm,
          school_id: activeSchoolId,
        })
      ).then(() =>
        dispatch(
          getAllClassroomThunk({
            accessToken,
            school_id: activeSchoolId,
            limit,
            page,
          })
        )
      );
    }
    handleCloseDialog();
  };

  const handleCloseDialog = () => {
    setEditeClassroom(false);
    setClassroomForm({
      _id: "",
      classroom_name: "",
      school_id: "",
      room: "",
      description: "",
    });
    setOpenDialog(false);
  };

  const handleDeleteClassroom = (classroom_id: string) => {
    dispatch(
      deleteClassroomThunk({
        accessToken,
        classroom_id,
        school_id: activeSchoolId,
      })
    ).then(() =>
      dispatch(
        getAllClassroomThunk({
          accessToken,
          school_id: activeSchoolId,
          limit,
          page,
        })
      )
    );
  };

  return (
    <div className="p-2">
      <div className="flex justify-between">
        <Button
          onClick={() => handleOpenDialog()}
          className="bg-[#e6edf5] hover:bg-[#d9e9fa] text-darck"
        >
          <Plus /> Add Classroom
        </Button>
        <Button
          onClick={() => dispatch(toggleShowEditeIcons())}
          className="bg-[#e6edf5] hover:bg-[#d9e9fa] text-darck"
        >
          {showEditeIcons ? (
            <>
              <RotateCw /> Cancel Edite
            </>
          ) : (
            <>
              <Pen /> Edite Classrooms
            </>
          )}
        </Button>
      </div>

      <h1 className="text-xl font-semibold mb-2">Classrooms</h1>

      <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-4">
        {classrooms.map((classroom, i) => (
          <Card key={i}>
            <CardContent>
              <div className="flex justify-between">
                <h3 className="text-lg font-semibold mb-1">
                  {classroom.classroom_name}
                </h3>
                {!showEditeIcons && (
                  <DoorOpen className="text-[#bfb29f]" size={32} />
                )}
                {showEditeIcons && (
                  <div className="flex gap-x-8">
                    <Pen
                      onClick={() => handleOpenDialog(classroom)}
                      className="ml-auto cursor-pointer h-5 w-5 text-blue-500"
                    />
                    <Trash2
                      onClick={() => handleDeleteClassroom(classroom._id)}
                      className="cursor-pointer h-5 w-5 text-red-500"
                    />
                  </div>
                )}
              </div>
              <p className="text-sm text-gray-400">{classroom.description}</p>
              <hr className="my-1.5" />
              <p className="text-sm text-gray-700 mb-0.5">
                {classroom.studentsLength} students
              </p>
              <p className="text-sm">Room : {classroom.room}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {classrooms.length > 0 && (
        <Pagination className="mt-4">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => dispatch(setPage(Math.max(page - 1, 1)))}
              />
            </PaginationItem>
            {Array.from({ length: pages }, (_, i) => (
              <PaginationItem key={i}>
                <PaginationLink
                  onClick={() => dispatch(setPage(i + 1))}
                  isActive={i + 1 === pageFromApi}
                  href="#"
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                className={`${
                  page === pages &&
                  "bg-stone-100 text-stone-400 hover:bg-stone-100 hover:text-stone-400"
                }`}
                onClick={() => dispatch(setPage(Math.min(page + 1, pages)))}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}

      <Dialog open={openDialog} onOpenChange={() => setOpenDialog(false)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingClassroom ? "Edite Classroom" : "Add New Classroom"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-2">
            <Label htmlFor="classroom_name">Classroom Name</Label>
            <Input
              id="classroom_name"
              value={classroomForm?.classroom_name}
              placeholder="Enter Classroom Name"
              onChange={(e) =>
                setClassroomForm((prev) => {
                  return { ...prev, classroom_name: e.target.value };
                })
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={classroomForm.description}
              placeholder="Classroom Description"
              onChange={(e) =>
                setClassroomForm((prev) => {
                  return { ...prev, description: e.target.value };
                })
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="room">Room</Label>
            <Input
              id="room"
              value={classroomForm.room}
              placeholder="Enter Classroom Room"
              onChange={(e) =>
                setClassroomForm((prev) => {
                  return { ...prev, room: e.target.value };
                })
              }
            />
          </div>
          <DialogFooter>
            <Button onClick={handleSubmit} className="w-full">
              {editingClassroom ? "Edite" : "Create"} Classroom
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Classroom;
