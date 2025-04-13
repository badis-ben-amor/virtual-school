"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Pencil, Trash } from "lucide-react";

type School = {
  id: number;
  name: string;
  address: string;
  contact_email: string;
  contact_phone: string;
};

// Static data (temporary)
const initialSchools: School[] = [
  {
    id: 1,
    name: "Greenwood High",
    address: "123 Main St",
    contact_email: "info@greenwood.com",
    contact_phone: "123-456-7890",
  },
  {
    id: 2,
    name: "Sunshine Academy",
    address: "456 Park Ave",
    contact_email: "contact@sunshine.com",
    contact_phone: "987-654-3210",
  },
];

export default function SchoolsPage() {
  const [schools, setSchools] = useState<School[]>(initialSchools);
  const [isOpen, setIsOpen] = useState(false);
  const [editingSchool, setEditingSchool] = useState<School | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    contact_email: "",
    contact_phone: "",
  });

  // Open modal (for add or edit)
  const openDialog = (school?: School) => {
    setEditingSchool(school || null);
    setFormData(
      school || { name: "", address: "", contact_email: "", contact_phone: "" }
    );
    setIsOpen(true);
  };

  // Handle form change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submit (Add or Edit)
  const handleSubmit = () => {
    if (editingSchool) {
      setSchools(
        schools.map((s) =>
          s.id === editingSchool.id ? { ...editingSchool, ...formData } : s
        )
      );
    } else {
      setSchools([...schools, { id: Date.now(), ...formData }]);
    }
    setIsOpen(false);
  };

  // Delete school
  const deleteSchool = (id: number) => {
    setSchools(schools.filter((s) => s.id !== id));
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Schools</h1>
        <Button onClick={() => openDialog()}>+ Add School</Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {schools.map((school) => (
            <TableRow key={school.id}>
              <TableCell>{school.name}</TableCell>
              <TableCell>{school.address}</TableCell>
              <TableCell>{school.contact_email}</TableCell>
              <TableCell>{school.contact_phone}</TableCell>
              <TableCell className="flex space-x-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => openDialog(school)}
                >
                  <Pencil className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => deleteSchool(school.id)}
                >
                  <Trash className="w-4 h-4 text-red-500" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Dialog for Add/Edit School */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingSchool ? "Edit School" : "Add School"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="School Name"
            />
            <Input
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Address"
            />
            <Input
              name="contact_email"
              value={formData.contact_email}
              onChange={handleChange}
              placeholder="Email"
            />
            <Input
              name="contact_phone"
              value={formData.contact_phone}
              onChange={handleChange}
              placeholder="Phone"
            />
          </div>
          <Button className="mt-4 w-full" onClick={handleSubmit}>
            {editingSchool ? "Update" : "Add"} School
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
