"use client";

import Link from "next/link";
import { Button } from "../ui/button";

function NotAuthUser() {
  return (
    <div className="flex flex-col items-center mt-10">
      <h1 className="text-3xl font-bold">Access Denied</h1>
      <p className="text-gray-500 mt-2 text-lg">
        Please Login to view this user page
      </p>
      <div className="mt-6 flex flex-col items-center space-y-1">
        <h1 className="font-bold text-lg">You can login as</h1>
        <p>email : user@gmail.com</p>
        <p>password : user</p>
        <Link href={"/auth/login"}>
          <Button className="bg-[#8a98a1] hover:bg-[#5aacdb] text-white font-bold">
            Login
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default NotAuthUser;
