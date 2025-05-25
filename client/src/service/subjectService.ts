import { SubjectType } from "@/types/subjectType";
import axios from "axios";

export const createSubject = (
  accessToken: string,
  subjectData: SubjectType
) => {
  return axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/subject`,
    { ...subjectData },
    { headers: { Authorization: `Bearer ${accessToken}` } }
  );
};

export const getAllSubjects = (accessToken: string, school_id: string) => {
  return axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/subject?school_id=${school_id}`,
    { headers: { Authorization: `Bearer ${accessToken}` } }
  );
};

export const getOneSubject = (
  accessToken: string,
  subject_id: string,
  school_id: string
) => {
  return axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/subject/${subject_id}?school_id=${school_id}`,
    { headers: { Authorization: `Bearer ${accessToken}` } }
  );
};

export const updateSubject = (
  accessToken: string,
  subject_id: string,
  school_id: string,
  subjectData: SubjectType
) => {
  return axios.put(
    `${process.env.NEXT_PUBLIC_API_URL}/subject/${subject_id}?school_id=${school_id}`,
    {
      ...subjectData,
    },
    { headers: { Authorization: `Bearer ${accessToken}` } }
  );
};

export const deleteSubject = (
  accessToken: string,
  subject_id: string,
  school_id: string
) => {
  return axios.delete(
    `${process.env.NEXT_PUBLIC_API_URL}/subject/${subject_id}?school_id=${school_id}`
  );
};
