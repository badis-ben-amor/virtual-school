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
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  createSchoolThunk,
  deleteSchoolThunk,
  getAllSchoolsThunk,
  toggleShowEditeIcons,
  updateSchoolThunk,
} from "@/redux/slices/schoolSlice";
import { Appdipatch, RootState } from "@/redux/store";
import { SchoolType } from "@/types/schoolType";
import {
  Mail,
  MapPin,
  Pen,
  Phone,
  Plus,
  RotateCw,
  School,
  Trash2,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Dashboard = () => {
  const dispatch = useDispatch<Appdipatch>();
  const { schools: schoolsData, showEditeIcons } = useSelector(
    (state: RootState) => state.school
  );
  const { accessToken } = useSelector((state: RootState) => state.user);

  const [schools, setSchools] = useState<SchoolType[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingSchool, setEditingSchool] = useState(false);
  const [schoolForm, setSchoolForm] = useState<SchoolType>({
    _id: "",
    school_name: "",
    description: "",
    address: "",
    contact_email: "",
    logo_url: "",
    contact_phone: "",
    is_active: false,
    website_url: "",
    school_img: null,
  });

  useEffect(() => {
    dispatch(getAllSchoolsThunk(accessToken));
  }, []);

  useEffect(() => {
    setSchools(schoolsData);
  }, [schoolsData]);

  const handleOpenDialog = (school?: SchoolType) => {
    if (school) setEditingSchool(true);

    setSchoolForm(
      school || {
        _id: "",
        school_name: "",
        description: "",
        address: "",
        contact_email: "",
        contact_phone: "",
        is_active: false,
        logo_url: "",
        website_url: "",
        school_img: null,
      }
    );
    setOpenDialog(true);
  };
  const handleSubmit = () => {
    const formData = new FormData();

    formData.append("school_name", schoolForm.school_name);
    formData.append("description", schoolForm.description);
    formData.append("address", schoolForm.address);
    formData.append("contact_email", schoolForm.contact_email);
    formData.append("contact_phone", schoolForm.contact_phone);
    formData.append("is_active", String(schoolForm.is_active));
    formData.append("website_url", schoolForm.website_url);
    if (schoolForm.school_img instanceof File)
      formData.append("school_img", schoolForm.school_img);

    if (editingSchool) {
      dispatch(
        updateSchoolThunk({
          accessToken,
          school_id: schoolForm._id,
          schoolData: formData,
        })
      ).then(() => dispatch(getAllSchoolsThunk(accessToken)));
    } else {
      dispatch(createSchoolThunk({ accessToken, schoolData: formData })).then(
        () => dispatch(getAllSchoolsThunk(accessToken))
      );
    }

    handleCloseDialog();
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setTimeout(() => {
      setSchoolForm({
        _id: "",
        school_name: "",
        description: "",
        address: "",
        contact_email: "",
        contact_phone: "",
        is_active: false,
        website_url: "",
        logo_url: "",
        school_img: null,
      });
      setEditingSchool(false);
    }, 150);
  };

  const handleDeleteSchool = (school_id: string) => {
    dispatch(deleteSchoolThunk({ accessToken, school_id })).then(() =>
      dispatch(getAllSchoolsThunk(accessToken))
    );
  };
  return (
    <div className="p-2">
      <div className="flex justify-between">
        <Button
          onClick={() => handleOpenDialog()}
          className="bg-[#e6edf5] hover:bg-[#d9e9fa] text-darck"
        >
          <Plus size={16} color="black" /> Add School
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
              <Pen /> Edite schools
            </>
          )}
        </Button>
      </div>

      <h2 className="text-xl font-semibold mb-2">Schools</h2>

      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-4">
        {schools.map((school, i) => (
          <Card
            key={i}
            className={`pt-2 flex items-center ${
              school.is_active && "bg-[#ebf5e9]"
            }`}
          >
            <CardContent className={`w-full`}>
              <div className="flex justify-between">
                <div>
                  {showEditeIcons && (
                    <Pen
                      className="h-5 w-5 cursor-pointer text-blue-500"
                      onClick={() => handleOpenDialog(school)}
                    />
                  )}
                </div>
                <div>
                  {school.logo_url ? (
                    <img className="h-12  " src={school.logo_url} />
                  ) : (
                    <School className="h-12 w-12 text-[#93c2f5] mb-2" />
                  )}
                </div>
                <div>
                  {showEditeIcons && (
                    <Trash2
                      className="h-5 w-5 cursor-pointer text-red-500"
                      onClick={() => handleDeleteSchool(school._id)}
                    />
                  )}
                </div>
              </div>
              <div className="flex justify-center">
                <h3 className="text-lg font-semibold mb-2 ">
                  {school.school_name}
                </h3>
              </div>
              <div className="flex gap-1 text-sm text-muted-foreground mb-1 justify-center">
                <Phone className="h-4 w-4 text-indigo-600" />
                <span>{school.contact_phone || "No"}</span>
              </div>

              <div className="flex gap-1 text-sm text-muted-foreground mb-1 justify-center">
                <Mail className="h-4 w-4 text-green-600" />
                <span>{school.contact_email || "No"}</span>
              </div>

              <div className="flex gap-1 text-sm text-muted-foreground justify-center">
                <MapPin className="h-4 w-4 text-blue-600" />
                <span>{school.address || "No"}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={openDialog} onOpenChange={handleCloseDialog}>
        <DialogContent className="overflow-y-auto max-h-[90vh]">
          <DialogHeader>
            <DialogTitle>
              {editingSchool ? "Edite School" : "Create New School"}
            </DialogTitle>
          </DialogHeader>
          {editingSchool && (
            <h2 className="font-semibold text-blue-600 text-sm">
              All fields is optional.
            </h2>
          )}
          <div>
            <div className="space-y-2">
              <Label htmlFor="school_name">
                School Name{" "}
                {!editingSchool && (
                  <span className="text-red-700">( Required )</span>
                )}
              </Label>
              <Input
                id="school_name"
                name="school_name"
                value={schoolForm?.school_name}
                placeholder="Enter School Name"
                onChange={(e) =>
                  setSchoolForm((prev) => ({
                    ...prev,
                    [e.target.name]: e.target.value,
                  }))
                }
              />
              {!editingSchool && (
                <>
                  <h2 className="font-semibold text-blue-600 text-sm">
                    Other info is optional, you can add it later.
                  </h2>
                  <hr />
                </>
              )}
              <div className="space-y-2">
                <Label htmlFor="address">School Address</Label>
                <Input
                  id="address"
                  name="address"
                  value={schoolForm.address}
                  placeholder="Enter Your School Address"
                  onChange={(e) =>
                    setSchoolForm((prev) => {
                      return { ...prev, [e.target.name]: e.target.value };
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">School Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={schoolForm.description}
                  placeholder="Enter Your School Description"
                  onChange={(e) =>
                    setSchoolForm((prev) => ({
                      ...prev,
                      [e.target.name]: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="space-y-2 space-x-2 grid lg:grid-cols-2 ">
                <div className="space-y-2">
                  <Label htmlFor="contact_email">School Email</Label>
                  <Input
                    id="contact_email"
                    name="contact_email"
                    value={schoolForm.contact_email}
                    placeholder="Enter You School Email"
                    onChange={(e) =>
                      setSchoolForm((prev) => ({
                        ...prev,
                        [e.target.name]: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact_phone">School Phone</Label>
                  <Input
                    type="tel"
                    id="contact_phone"
                    name="contact_phone"
                    placeholder="Enter School Phone"
                    value={schoolForm.contact_phone}
                    onChange={(e) =>
                      setSchoolForm((prev) => ({
                        ...prev,
                        [e.target.name]: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website_url">School Website Url</Label>
                  <Input
                    id="website_url"
                    name="website_url"
                    value={schoolForm.website_url}
                    placeholder="Enter School Website Url"
                    onChange={(e) =>
                      setSchoolForm((prev) => ({
                        ...prev,
                        [e.target.name]: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="school_img">School Image</Label>
                  <Input
                    className="cursor-pointer"
                    type="file"
                    id="school_img"
                    name="school_img"
                    onChange={(e) =>
                      setSchoolForm((prev) => {
                        return {
                          ...prev,
                          [e.target.name]: e.target.files?.[0],
                        };
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="is_active">Make It The Active School</Label>
                  <Switch
                    name="is_active"
                    checked={schoolForm.is_active}
                    onCheckedChange={(checked) =>
                      setSchoolForm((prev) => ({ ...prev, is_active: checked }))
                    }
                  />
                </div>
                {schoolForm.school_img && (
                  <div className="">
                    <img
                      src={URL.createObjectURL(schoolForm.school_img)}
                      alt="school img preview"
                    />
                    <p className="text-sm">{schoolForm.school_img.name}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button className="w-full" onClick={handleSubmit}>
              {editingSchool ? "Edite School" : "Create"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Dashboard;
