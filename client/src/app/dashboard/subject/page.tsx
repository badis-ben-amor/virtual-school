"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getActiveSchoolThunk } from "@/redux/slices/schoolSlice";
import {
  getAllSubjectsThunk,
  toggleShowEditeButtons,
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

  return (
    <div className="p-2">
      <div className="flex justify-between">
        <Button className="bg-[#e6edf5] hover:bg-[#d9e9fa] text-darck">
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
                    <Pen className="h-5 w-5 cursor-pointer text-blue-500" />
                    <Trash2 className="h-5 w-5 cursor-pointer text-red-500" />
                  </div>
                ) : (
                  <NotebookPen />
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Subject;
