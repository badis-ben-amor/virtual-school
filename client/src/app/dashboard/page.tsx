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
import { getAllSchoolsThunk } from "@/redux/slices/schoolSlice";
import { Appdipatch, RootState } from "@/redux/store";
import { SchoolType } from "@/types/schoolType";
import { Mail, MapPin, Phone, School } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Dashboard = () => {
  const dispatch = useDispatch<Appdipatch>();
  const { schools: schoolsData } = useSelector(
    (state: RootState) => state.school
  );
  const { accessToken } = useSelector((state: RootState) => state.user);

  const [schools, setSchools] = useState<SchoolType[]>([]);
  const [open, setOpen] = useState(false);
  const [schoolForm, setSchoolForm] = useState<SchoolType>({
    school_name: "",
    description: "",
    address: "",
    contact_email: "",
    contact_phone: "",
    logo_url: "",
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
  return (
    <div className="p-2">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">Overview</h1>
        <Button
          onClick={() => setOpen(true)}
          className="bg-purple-600 hover:bg-purple-700"
        >
          New School
        </Button>
      </div>

      <h2 className="text-xl font-semibold mb-2">Schools</h2>

      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-4">
        {schools.map((school, i) => (
          <Card
            key={i}
            className={`p-2 flex items-center ${
              school.is_active && "bg-[#ebf5e9]"
            }`}
          >
            <CardContent>
              <School className="h-12 w-12 text-purple-600 mb-2" />
              <h3 className="text-lg font-semibold mb-2">
                {school.school_name}
              </h3>
              <div className="flex gap-1 text-sm text-muted-foreground mb-1">
                <Phone className="h-4 w-4 text-indigo-600" />
                <span>{school.contact_phone || "No"}</span>
              </div>

              <div className="flex gap-1 text-sm text-muted-foreground mb-1">
                <Mail className="h-4 w-4 text-green-600" />
                <span>{school.contact_email || "No"}</span>
              </div>

              <div className="flex gap-1 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 text-blue-600" />
                <span>{school.address || "No"}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={open} onOpenChange={() => setOpen(false)}>
        <DialogContent className="overflow-y-auto max-h-[90vh]">
          <DialogHeader>
            <DialogTitle>Create New School</DialogTitle>
          </DialogHeader>
          <div>
            <div className="space-y-2">
              <Label htmlFor="school_name">
                School Name <span className="text-red-700">( Required )</span>
              </Label>
              <Input
                id="school_name"
                name="school_name"
                value={schoolForm?.school_name}
                onChange={(e) =>
                  setSchoolForm((prev) => ({
                    ...prev,
                    [e.target.name]: e.target.value,
                  }))
                }
                placeholder="Enter School Name"
              />
              <h2 className="font-semibold text-blue-600">
                Other info is optional, you can add it later.
              </h2>
              <hr />
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
                        [e.target.value]: e.target.name,
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
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button className="w-full">Create</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Dashboard;
