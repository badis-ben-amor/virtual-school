import { School } from "@/types/school";
import axios from "axios";

export function getSchool(accessToken: string) {
  return axios.get(`${process.env.NEXT_PUBLIC_API_URL}/school`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
}

export function createSchool(accessToken: string, schoolData: School) {
  return axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/school`,
    {
      name: schoolData.name,
      description: schoolData.description,
      address: schoolData.address,
      contact_email: schoolData.contact_email,
      contact_phone: schoolData.contact_phone,
      logo_url: null,
      website_url: schoolData.website_url,
    },
    { headers: { Authorization: `Bearer ${accessToken}` } }
  );
}

export function updateSchool(accessToken: string, schoolData: School) {
  return axios.put(
    `${process.env.NEXT_PUBLIC_API_URL}/school`,
    {
      name: schoolData.name,
      description: schoolData.description,
      address: schoolData.address,
      contact_email: schoolData.contact_email,
      contact_phone: schoolData.contact_phone,
      logo_url: null,
      website_url: schoolData.website_url,
    },
    { headers: { Authorization: `Bearer ${accessToken}` } }
  );
}
export function deleteSchool(accessToken: string) {
  return axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/school`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
}
