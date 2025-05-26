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
import { getActiveSchoolThunk } from "@/redux/slices/schoolSlice";
import {
  createSubjectThunk,
  deleteSubjectThunk,
  getAllSubjectsThunk,
  toggleShowEditeButtons,
  updateSubjectThunk,
} from "@/redux/slices/subjectSlice";
import { Appdipatch, RootState } from "@/redux/store";
import { SubjectType } from "@/types/subjectType";
import { NotebookPen, Pen, Plus, RotateCw, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Subject = () => {
  const dispatch = useDispatch<Appdipatch>();
  const {
    subjects: subjectsData,
    accessToken,
    showEditeButtons,
  } = useSelector((state: RootState) => state.subject);

  const [activeSchoolId, setActiveSchoolId] = useState("");
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
          })
        );
      });
  }, []);

  useEffect(() => {
    setSubjects(subjectsData);
  }, [subjectsData]);

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
          getAllSubjectsThunk({ accessToken, school_id: activeSchoolId })
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
          getAllSubjectsThunk({ accessToken, school_id: activeSchoolId })
        )
      );
    }

    handleCloseDialog();
  };

  const handleDeleteSubject = (subject_id: string) => {
    dispatch(
      deleteSubjectThunk({ accessToken, subject_id, school_id: activeSchoolId })
    ).then(() =>
      dispatch(getAllSubjectsThunk({ accessToken, school_id: activeSchoolId }))
    );
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
              <RotateCw /> Cancel Edite
            </>
          ) : (
            <>
              <Pen /> Edite Subjects
            </>
          )}
        </Button>
      </div>

      <h1 className="text-xl font-semibold mb-2">Subjects</h1>

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
    </div>
  );
};

export default Subject;
