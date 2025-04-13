import axios from "axios";

export const register = async (
  name: string,
  email: string,
  password: string
) => {
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/register`,
    {
      name,
      email,
      password,
    },
    { withCredentials: true }
  );
  return res;
};

export const login = async (email: string, password: string) => {
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/login`,
    {
      email,
      password,
    },
    { withCredentials: true }
  );
  return res;
};

export const refresh = async () => {
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/refresh`,
    {},
    { withCredentials: true }
  );
  return res;
};

export const logout = async () => {
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/logout`,
    {},
    { withCredentials: true }
  );
  return res;
};
