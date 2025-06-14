import axios from "axios";

export function createSchool(accessToken: string, schoolData: FormData) {
  return axios.post(`${process.env.NEXT_PUBLIC_API_URL}/school`, schoolData, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
}

export function getAllSchools(
  accessToken: string,
  page: number,
  limit: number,
  search_by_name?: string,
  sort_by_name?: string,
  sort_by_date?: string
) {
  return axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/school?page=${page}&limit=${limit}&search_by_name=${search_by_name}&sort_by_name=${sort_by_name}&sort_by_date=${sort_by_date}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
}

export function getOneSchool(accessToken: string, school_id: string) {
  return axios.get(`${process.env.NEXT_PUBLIC_API_URL}/school/${school_id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
}

export const getActiveSchool = (accessToken: string) => {
  return axios.get(`${process.env.NEXT_PUBLIC_API_URL}/school/active-school`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
};

export function updateSchool(
  accessToken: string,
  schoolData: FormData,
  school_id: string
) {
  return axios.put(
    `${process.env.NEXT_PUBLIC_API_URL}/school/${school_id}`,
    schoolData,
    { headers: { Authorization: `Bearer ${accessToken}` } }
  );
}
export function deleteSchool(accessToken: string, school_id: string) {
  return axios.delete(
    `${process.env.NEXT_PUBLIC_API_URL}/school/${school_id}`,
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    }
  );
}
