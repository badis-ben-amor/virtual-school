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
import { getActiveSchoolThunk } from "@/redux/slices/schoolSlice";
import {
  createSubjectThunk,
  deleteSubjectThunk,
  getAllSubjectsThunk,
  setPage,
  setSearch_by_subject_name,
  setSearch_input_value,
  setSortByDate,
  setSortByName,
  toggleShowEditeButtons,
  updateSubjectThunk,
} from "@/redux/slices/subjectSlice";
import { Appdipatch, RootState } from "@/redux/store";
import { SubjectType } from "@/types/subjectType";
import {
  ArrowDown,
  ArrowUp,
  NotebookPen,
  Pen,
  Plus,
  RotateCw,
  Trash2,
  X,
} from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Subject = () => {
  const dispatch = useDispatch<Appdipatch>();
  const {
    subjects: subjectsData,
    accessToken,
    showEditeButtons,
    page,
    limit,
    pageCount,
    pageFromApi,
    search_by_subject_name,
    search_input_value,
    sortByName,
    sortByDate,
  } = useSelector((state: RootState) => state.subject);

  const [activeSchoolId, setActiveSchoolId] = useState("");
  const [activeSchoolError, setActiveSchoolError] = useState("");
  const [activeSchoolErrorAlert, setActiveSchoolErrorAlert] = useState(false);
  const [subjects, setSubjects] = useState<SubjectType[]>([]);
  const [editingSubject, setEditingSubject] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [subjectData, setSubjectData] = useState<SubjectType>({
    _id: "",
    subject_name: "",
    school_id: "",
  });

  useEffect(() => {
    dispatch(getActiveSchoolThunk(accessToken))
      .unwrap()
      .then((res) => {
        setActiveSchoolId(res?.res.activeSchool._id);
        dispatch(
          getAllSubjectsThunk({
            accessToken,
            school_id: res?.res.activeSchool._id,
            limit,
            page,
            search_by_subject_name,
            sortByName,
            sortByDate,
          })
        );
      })
      .catch((err) => {
        setActiveSchoolError(err);
        setActiveSchoolErrorAlert(true);
      });
  }, []);

  useEffect(() => {
    setSubjects(subjectsData);
  }, [subjectsData]);

  useEffect(() => {
    dispatch(
      getAllSubjectsThunk({
        accessToken,
        school_id: activeSchoolId,
        limit,
        page,
        search_by_subject_name,
        sortByName,
        sortByDate,
      })
    );
  }, [page, search_by_subject_name, sortByName, sortByDate]);

  const handleOpenDialog = (subject?: SubjectType) => {
    if (subject) setEditingSubject(true);

    setSubjectData(
      subject || {
        _id: "",
        subject_name: "",
        school_id: "",
      }
    );

    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setTimeout(() => {
      setEditingSubject(false);
      setSubjectData({
        _id: "",
        subject_name: "",
        school_id: "",
      });
    }, 150);
  };

  const handleSubmit = () => {
    if (editingSubject) {
      dispatch(
        updateSubjectThunk({
          accessToken,
          subjectData,
          school_id: subjectData.school_id,
          subject_id: subjectData._id,
        })
      ).then(() =>
        dispatch(
          getAllSubjectsThunk({
            accessToken,
            school_id: activeSchoolId,
            limit,
            page,
            search_by_subject_name,
            sortByName,
            sortByDate,
          })
        )
      );
    } else {
      dispatch(
        createSubjectThunk({
          accessToken,
          subjectData,
          school_id: activeSchoolId,
        })
      ).then(() =>
        dispatch(
          getAllSubjectsThunk({
            accessToken,
            school_id: activeSchoolId,
            limit,
            page,
            search_by_subject_name,
            sortByName,
            sortByDate,
          })
        )
      );
    }

    handleCloseDialog();
  };

  const handleDeleteSubject = (subject_id: string) => {
    dispatch(
      deleteSubjectThunk({ accessToken, subject_id, school_id: activeSchoolId })
    ).then(() =>
      dispatch(
        getAllSubjectsThunk({
          accessToken,
          school_id: activeSchoolId,
          limit,
          page,
          search_by_subject_name,
          sortByName,
          sortByDate,
        })
      )
    );
  };

  const handleResetFilters = () => {
    dispatch(setSearch_by_subject_name(""));
    dispatch(setSearch_input_value(""));
    dispatch(setSortByName(""));
    dispatch(setSortByDate(""));
    dispatch(setPage(1));
  };

  return (
    <div className="p-2">
      <div className="flex justify-between">
        <Button
          onClick={() => handleOpenDialog()}
          className="bg-[#e6edf5] hover:bg-[#d9e9fa] text-darck"
        >
          <Plus /> Add New Subject
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
              <Pen /> Edite Subjects
            </>
          )}
        </Button>
      </div>

      <h1 className="text-xl font-semibold mb-2">Subjects</h1>

      <div className="flex justify-between items-center mb-2">
        <Command className="bg-[#f5f6f7] lg:w-1/5 md:w-1/4 w-1/3">
          <CommandInput
            value={search_input_value}
            onValueChange={(v) => {
              dispatch(setSearch_by_subject_name(v));
              dispatch(setSearch_input_value(v));
            }}
            placeholder="search by subject..."
          />
        </Command>
        <RotateCw
          className="mr-auto w-4 h-4 ml-1 cursor-pointer"
          onClick={() => {
            dispatch(setSearch_by_subject_name(""));
            dispatch(setSearch_input_value(""));
            dispatch(setPage(1));
          }}
        />
        <Button onClick={handleResetFilters} variant={"outline"}>
          Reset Filters
        </Button>
      </div>

      <div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-y-2 mb-2">
        <div className="flex items-center gap-1">
          <Select
            onValueChange={(v) => dispatch(setSortByName(v))}
            value={sortByName}
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
            onClick={() => {
              dispatch(setSortByName(""));
              dispatch(setPage(1));
            }}
            className="h-4 w-4 cursor-pointer"
          />
        </div>
        <div className="flex items-center gap-1">
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
          <RotateCw
            onClick={() => {
              dispatch(setSortByDate(""));
              dispatch(setPage(1));
            }}
            className="w-4 h-4 cursor-pointer"
          />
        </div>
      </div>

      <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-4">
        {subjects.map((subject) => (
          <Card key={subject._id}>
            <CardContent>
              <div className="flex justify-between">
                <div>
                  <h3>{subject.subject_name}</h3>
                </div>
                {showEditeButtons ? (
                  <div className="flex space-x-4">
                    <Pen
                      onClick={() => handleOpenDialog(subject)}
                      className="h-5 w-5 cursor-pointer text-blue-500"
                    />
                    <Trash2
                      onClick={() => handleDeleteSubject(subject._id)}
                      className="h-5 w-5 cursor-pointer text-red-500"
                    />
                  </div>
                ) : (
                  <NotebookPen />
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {subjects.length > 0 && (
        <Pagination className="mt-4">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => dispatch(setPage(Math.max(1, page - 1)))}
              />
            </PaginationItem>
            {Array.from({ length: pageCount }, (_, i) => (
              <PaginationItem key={i}>
                <PaginationLink
                  href="#"
                  isActive={i + 1 === pageFromApi}
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
                onClick={() => dispatch(setPage(Math.min(pageCount, page + 1)))}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}

      <Dialog open={openDialog} onOpenChange={handleCloseDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingSubject ? "Edite Subject" : "Add New Subject"}
            </DialogTitle>
          </DialogHeader>
          <div>
            <div className="space-y-2">
              <Label htmlFor="subject_name"></Label>
              <Input
                id="subject_name"
                value={subjectData.subject_name}
                placeholder="Enter Subject Name"
                onChange={(e) =>
                  setSubjectData((prev) => ({
                    ...prev,
                    subject_name: e.target.value,
                  }))
                }
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleSubmit} className="w-full">
              {editingSubject ? "Update" : "Add"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog
        open={activeSchoolErrorAlert}
        onOpenChange={setActiveSchoolErrorAlert}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              <span className="text-red-900">Error</span>
            </AlertDialogTitle>
            <AlertDialogDescription className="flex flex-col gap-y-3">
              <span className="text-red-500">{activeSchoolError}</span>
              <Link href="/dashboard">Create One</Link>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>OK</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Subject;
