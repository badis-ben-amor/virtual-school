"use client";
import Link from "next/link";
import { Button } from "./ui/button";
import { LogOut, Menu, User, X } from "lucide-react";
import logo from "../../public/ChatGPT Image Apr 4, 2025, 07_11_46 PM.png";
import Image from "next/image";
import { useState } from "react";
import { Appdipatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { logoutThunk } from "@/redux/slices/authSlice";
import { getUserThunk } from "@/redux/slices/userSlice";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();
  const dispatch = useDispatch<Appdipatch>();
  const { user }: { user: any } = useSelector((state: RootState) => state.user);

  const [menuIsOpen, setMenuIsOpen] = useState(false);

  const handleMenuClose = () => {
    setMenuIsOpen(false);
  };

  const handleLogout = () => {
    dispatch(logoutThunk())
      .unwrap()
      .then(() => {
        router.push("/auth/login");
        dispatch(getUserThunk(""));
      });
  };
  return (
    <div className="bg-[#edf2df] flex justify-between px-5 py-1 font-bold top-0 sm:sticky z-50">
      <Link href={"/"}>
        <Image src={logo} width={36} height={36} alt="logo" />
      </Link>

      <div className="hidden md:flex w-1/2 justify-around">
        <Link href={"/"}>Home</Link>
        <Link href={"/dashboard"}>Dashboard</Link>
        <Link href={"/about"}>About</Link>
      </div>

      <div className="hidden md:flex space-x-2">
        {!user?.username ? (
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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="bg-[#8a98a1] hover:bg-[#5aacdb] text-white font-bold">
                <User />
                <span>{user.username}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Account</DropdownMenuLabel>
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>

      {/* mobile */}
      <div className="md:hidden">
        <Button
          onClick={() => setMenuIsOpen(!menuIsOpen)}
          className="mb-1 bg-[#9ebaa1] hover:bg-[#85ab88]"
        >
          {menuIsOpen ? <X /> : <Menu />}
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
              {!user?.username ? (
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
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button className="bg-[#8a98a1] hover:bg-[#5aacdb] text-white font-bold">
                      <User />
                      <span>{user.username}</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Account</DropdownMenuLabel>
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogOut className="mr-2" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
