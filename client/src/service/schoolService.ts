import { SchoolType } from "@/types/schoolType";
import axios from "axios";

export function createSchool(accessToken: string, schoolData: SchoolType) {
  return axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/school`,
    {
      ...schoolData,
    },
    { headers: { Authorization: `Bearer ${accessToken}` } }
  );
}

export function getAllSchools(accessToken: string) {
  return axios.get(`${process.env.NEXT_PUBLIC_API_URL}/school`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
}

export function getOneSchool(accessToken: string, school_id: string) {
  return axios.get(`${process.env.NEXT_PUBLIC_API_URL}/school/${school_id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
}

export function updateSchool(
  accessToken: string,
  schoolData: SchoolType,
  school_id: string
) {
  return axios.put(
    `${process.env.NEXT_PUBLIC_API_URL}/school/${school_id}`,
    {
      ...schoolData,
    },
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
