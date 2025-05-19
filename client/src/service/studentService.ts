import { StudentType } from "@/types/studentType";
import axios from "axios";

export const createStudent = (
  accessToken: string,
  studentdata: StudentType
) => {
  return axios.post(`${process.env.NEXT_PUBLIC_API_URL}/student`, studentdata, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
};

export const getAllStudents = (accessToken: string, school_id: string) => {
  return axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/student?school_id${school_id}`,
    { headers: { Authorization: `Bearer ${accessToken}` } }
  );
};

export const getOneStudent = (
  accessToken: string,
  student_id: string,
  school_id: string
) => {
  return axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/student/${student_id}?school_id=${school_id}`,
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    }
  );
};

export const updateStudent = (
  accessToken: string,
  studentData: StudentType,
  student_id: string,
  school_id: string
) => {
  return axios.put(
    `${process.env.NEXT_PUBLIC_API_URL}/student/${student_id}?school_id=${school_id}`,
    studentData,
    { headers: { Authorization: `Bearer ${accessToken}` } }
  );
};

export const deleteStudent = (
  accessToken: string,
  student_id: string,
  school_id: string
) => {
  return axios.delete(
    `${process.env.NEXT_PUBLIC_API_URL}/student/${student_id}?school_id=${school_id}`,
    { headers: { Authorization: `Bearer ${accessToken}` } }
  );
};
