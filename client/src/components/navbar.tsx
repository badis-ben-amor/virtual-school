"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";
import logo from "../../public/ChatGPT Image Apr 4, 2025, 07_11_46 PM.png";
import Image from "next/image";
import { useState } from "react";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

const Navbar = () => {
  const { user }: { user: any } = useSelector((state: RootState) => state.user);

  const [menuIsOpen, setMenuIsOpen] = useState(false);

  const handleMenuClose = () => {
    setMenuIsOpen(false);
  };
  return (
    <div className="bg-[#edf2df] flex justify-between px-5 py-1 font-bold top-0 sticky z-50">
      <Link href={"/"}>
        <Image src={logo} width={36} height={36} alt="logo" />
      </Link>

      <div className="hidden md:flex w-1/2 justify-around">
        <Link href={"/"}>Home</Link>
        <Link href={"/dashboard"}>School Dashboard</Link>
        <Link href={"/about"}>About</Link>
      </div>

      <div className="hidden md:flex space-x-2">
        {!user.name ? (
          <>
            <Link href={"/auth/login"}>
              <Button className="bg-[#8a98a1] hover:bg-[#5aacdb] text-white font-bold">
                Login
              </Button>
            </Link>
            <Link href={"/auth/register"}>
              <Button className="bg-[#8a98a1] hover:bg-[#5aacdb] text-white font-bold">
                Register
              </Button>
            </Link>
          </>
        ) : (
          <p className="flex flex-col justify-center bg-[#88b5f7] text-white rounded-lg px-0.5 font-bold">
            Hello {user.name}
          </p>
        )}
      </div>

      {/* mobile */}
      <div className="md:hidden">
        <Button
          onClick={() => setMenuIsOpen(!menuIsOpen)}
          className="mb-1 bg-[#9ebaa1] hover:bg-[#85ab88]"
        >
          <Menu />
        </Button>

        {menuIsOpen && (
          <>
            <div className="space-y-2">
              <Link onClick={handleMenuClose} className="block" href={"/"}>
                Home
              </Link>
              <Link
                onClick={handleMenuClose}
                className="block"
                href={"/dashboard"}
              >
                School
              </Link>
              <Link className="block" href={"/about"}>
                About
              </Link>
            </div>

            <div className="space-y-2">
              {!user?.name ? (
                <>
                  <Link
                    onClick={handleMenuClose}
                    className="block mt-1"
                    href={"/auth/login"}
                  >
                    <Button className="bg-[#8a98a1] hover:bg-[#5aacdb] text-white font-bold">
                      Login
                    </Button>
                  </Link>
                  <Link
                    onClick={handleMenuClose}
                    className="block"
                    href={"/auth/register"}
                  >
                    <Button className="bg-[#8a98a1] hover:bg-[#5aacdb] text-white font-bold">
                      Register
                    </Button>
                  </Link>
                </>
              ) : (
                <p className="bg-[#88b5f7] text-white rounded-lg px-0.5 font-bold">
                  Hello {user.name}
                </p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
