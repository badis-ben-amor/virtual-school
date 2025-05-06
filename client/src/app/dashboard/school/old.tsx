"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  createSchoolThunk,
  deleteSchoolThunk,
  getSchoolThunk,
  updateSchoolThunk,
} from "@/redux/slices/schoolSlice";
import { Appdipatch, RootState } from "@/redux/store";
import { School as SchoolType } from "@/types/school";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Pencil, Trash } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const School = () => {
  const dispatch = useDispatch<Appdipatch>();
  const { school: schoolDataAPI, accessToken } = useSelector(
    (state: RootState) => state.school
  );

  const [school, setSchool] = useState<any>({});
  const [isOpen, setIsOpen] = useState(false);
  const [editingSchool, setEditingSchool] = useState(false);
  const [schoolData, setSchoolData] = useState({
    id: "",
    name: "",
    address: "",
    contact_email: "",
    contact_phone: "",
    description: "",
    website_url: "",
  });

  useEffect(() => {
    dispatch(getSchoolThunk(accessToken));
  }, []);

  useEffect(() => {
    setSchool(schoolDataAPI);
  }, [schoolDataAPI]);

  const openDialog = (school?: SchoolType) => {
    if (school) setEditingSchool(true);
    setSchoolData(
      school || {
        id: "",
        name: "",
        address: "",
        contact_email: "",
        contact_phone: "",
        description: "",
        website_url: "",
      }
    );
    setIsOpen(true);
  };

  const closeDialog = () => {
    setIsOpen(false);
    setEditingSchool(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSchoolData({ ...schoolData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (editingSchool) {
      dispatch(updateSchoolThunk({ accessToken, schoolData })).then(() =>
        dispatch(getSchoolThunk(accessToken))
      );
    } else {
      dispatch(createSchoolThunk({ accessToken, schoolData })).then(() =>
        dispatch(getSchoolThunk(accessToken))
      );
    }
    closeDialog();
  };

  const handleDelete = () => {
    dispatch(deleteSchoolThunk(accessToken)).then(() =>
      dispatch(getSchoolThunk(accessToken))
    );
  };

  return (
    <div className="m-auto">
      {school ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Address</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Website</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>{school?.name}</TableCell>
              <TableCell>{school?.address}</TableCell>
              <TableCell>{school?.contact_email}</TableCell>
              <TableCell>{school?.contact_phone}</TableCell>
              <TableCell>{school?.description}</TableCell>
              <TableCell>{school?.website_url}</TableCell>
              <TableCell className="flex space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => openDialog(school)}
                >
                  <Pencil />
                </Button>
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={handleDelete}
                >
                  <Trash />
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      ) : (
        <Button
          onClick={() => setIsOpen(true)}
          className="bg-gray-100 hover:bg-gray-200 text-dark"
        >
          Create Your School
        </Button>
      )}

      <Dialog open={isOpen} onOpenChange={closeDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingSchool ? "Edite School" : "Add School"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-2">
            <Label className="" htmlFor="name">
              School Name
            </Label>
            <Input
              id="name"
              name="name"
              value={schoolData.name}
              onChange={handleChange}
              placeholder="Enter Shool Name"
              required
            />

            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              name="address"
              value={schoolData.address}
              onChange={handleChange}
              placeholder="Enter Your School Address"
              required
            />
            <Label htmlFor="school_email">School Contact Email</Label>
            <Input
              id="school_email"
              name="contact_email"
              value={schoolData.contact_email}
              onChange={handleChange}
              placeholder="Enter Your School Contact Email"
              required
            />
            <Label htmlFor="school_phone">School Contact Phone</Label>
            <Input
              type="number"
              id="school_phone"
              name="contact_phone"
              value={schoolData.contact_phone}
              onChange={handleChange}
              placeholder="Enter Your School Contact Phone"
            />
            <Label className="bg-gray-50 text-gray-500" htmlFor="description">
              School Description (Optional)
            </Label>
            <Input
              id="description"
              name="description"
              value={schoolData.description}
              onChange={handleChange}
              placeholder="Enter School Description (Optional)"
              className="bg-gray-50"
            />
            <Label className="bg-gray-100 text-gray-500" htmlFor="website_url">
              Website URL (Optional)
            </Label>
            <Input
              id="website_url"
              name="website_url"
              value={schoolData.website_url}
              onChange={handleChange}
              placeholder="Enter Your School Website URL (Optional)"
              className="bg-gray-50"
            />
          </div>
          <Button onClick={handleSubmit}>
            {editingSchool ? "Edite" : "Add"} School
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default School;
