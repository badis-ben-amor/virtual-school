"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { registerThunk } from "@/redux/slices/authSlice";
import { getUserThunk } from "@/redux/slices/userSlice";
import { Appdipatch } from "@/redux/store";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

const Register = () => {
  const dispatch = useDispatch<Appdipatch>();
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = (e: any) => {
    e.preventDefault();

    dispatch(registerThunk({ username, email, password }))
      .unwrap()
      .then(() => {
        dispatch(getUserThunk(""));
        router.push("/dashboard");
      })
      .catch((err) => setError(err.message || err));
  };
  return (
    <div className="w-lg mx-auto bg-slate-50 p-4 rounded-lg mt-30">
      <form onSubmit={handleRegister}>
        {error && (
          <div className="text-center">
            <p className="text-red-600">{error}</p>
          </div>
        )}
        <div className="mb-2">
          <Label htmlFor="username" className="text-base">
            Username
          </Label>
          <Input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            required
            style={{ fontSize: "15px" }}
          />
        </div>
        <div className="mb-2">
          <Label htmlFor="email" className="text-base">
            Email
          </Label>
          <Input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter you email"
            required
            style={{ fontSize: "15px" }}
          />
        </div>
        <div className="mb-2">
          <Label htmlFor="password" className="text-base">
            Password
          </Label>
          <Input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
            style={{ fontSize: "15px" }}
          />
        </div>
        <Button type="submit" className="w-full mt-2">
          Register
        </Button>
      </form>
    </div>
  );
};

export default Register;
