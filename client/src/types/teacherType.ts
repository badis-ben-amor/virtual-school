import { SubjectType } from "./subjectType";

export type TeacherType = {
  _id: string;
  frst_name: string;
  last_name: string;
  teacher_img_url?: string;
  teacher_img: File | null;
  subjects: any[];
  classrooms: any[];
  school_id: string;
};
