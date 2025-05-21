import { ClassroomType } from "./classroomType";

export type StudentType = {
  _id: string;
  first_name: string;
  last_name: string;
  classroom_id: string;
  school_id: string;
  student_img: File | null;
  student_img_url?: string;
};
