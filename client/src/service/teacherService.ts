import axios from "axios";

export const createTeacher = (accessToken: string, teacherData: FormData) => {
  return axios.post(`${process.env.NEXT_PUBLIC_API_URL}/teacher`, teacherData, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
};

export const getAllTeachers = (
  accessToken: string,
  school_id: string,
  page: number,
  limit: number,
  first_name_search: string,
  last_name_search: string
) => {
  return axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/teacher?school_id=${school_id}&page=${page}&limit=${limit}&first_name_search=${first_name_search}&last_name_search=${last_name_search}`,
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    }
  );
};

export const getOneTeacher = (
  accessToken: string,
  teacher_id: string,
  school_id: string
) => {
  return axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/teacher/${teacher_id}?school_id=${school_id}`,
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    }
  );
};

export const updateTeacher = (
  accessToken: string,
  teacher_id: string,
  school_id: string,
  teacherData: FormData
) => {
  return axios.put(
    `${process.env.NEXT_PUBLIC_API_URL}/teacher/${teacher_id}?school_id=${school_id}`,
    teacherData,
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    }
  );
};

export const deleteTeacher = (
  accessToken: string,
  teacher_id: string,
  school_id: string
) => {
  return axios.delete(
    `${process.env.NEXT_PUBLIC_API_URL}/teacher/${teacher_id}?school_id=${school_id}`,
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    }
  );
};
