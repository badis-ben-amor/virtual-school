import { ClassroomType } from "@/types/classroomType";
import axios from "axios";

export const createClassroom = (
  accessToken: string,
  classroomData: ClassroomType,
  school_id: string
) => {
  return axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/class-room`,
    {
      ...classroomData,
      school_id,
    },
    { headers: { Authorization: `Bearer ${accessToken}` } }
  );
};

export const getAllClassroom = (
  accessToken: string,
  school_id: string,
  page?: number,
  limit?: number,
  search_by_name?: string,
  sort_by_name?: string,
  sort_by_date?: string
) => {
  return axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/class-room?school_id=${school_id}&page=${page}&limit=${limit}&search_by_name=${search_by_name}&sort_by_name=${sort_by_name}&sort_by_date=${sort_by_date}`,
    { headers: { Authorization: `Bearer ${accessToken}` } }
  );
};

export const getOneClassroom = (
  accessToken: string,
  classroom_id: string,
  school_id: string
) => {
  return axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/class-room/${classroom_id}?school_id=${school_id}`,
    { headers: { Authorization: `Bearer ${accessToken}` } }
  );
};

export const updateClassroom = (
  accessToken: string,
  classroomData: ClassroomType,
  classroom_id: string,
  school_id: string
) => {
  return axios.put(
    `${process.env.NEXT_PUBLIC_API_URL}/class-room/${classroom_id}?school_id=${school_id}`,
    {
      ...classroomData,
    },
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    }
  );
};

export const deleteClassroom = (
  accessToken: string,
  classroom_id: string,
  school_id: string
) => {
  return axios.delete(
    `${process.env.NEXT_PUBLIC_API_URL}/class-room/${classroom_id}?school_id=${school_id}`,
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    }
  );
};
