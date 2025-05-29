import axios from "axios";

export const createStudent = (accessToken: string, studentdata: FormData) => {
  return axios.post(`${process.env.NEXT_PUBLIC_API_URL}/student`, studentdata, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
};

export const getAllStudents = (
  accessToken: string,
  school_id: string,
  page: number,
  limit: number,
  first_name_search: string,
  last_name_search: string
) => {
  return axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/student?school_id=${school_id}&page=${page}&limit=${limit}&first_name_search=${first_name_search}&last_name_search=${last_name_search}`,
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
  studentData: FormData,
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
