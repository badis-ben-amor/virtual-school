"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginThunk } from "@/redux/slices/authSlice";
import { getUserThunk } from "@/redux/slices/userSlice";
import { Appdipatch } from "@/redux/store";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";

const Login = () => {
  const dispatch = useDispatch<Appdipatch>();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e: any) => {
    e.preventDefault();

    dispatch(loginThunk({ email, password }))
      .unwrap()
      .then(() => {
        dispatch(getUserThunk(""));
        router.push("/dashboard");
      })
      .catch((err) => setError(err.message || err));
  };

  return (
    <div className="w-lg mx-auto bg-slate-50 rounded-lg p-4 mt-30">
      <form onSubmit={handleLogin}>
        {error && (
          <div className="text-center">
            <p className="text-red-600">{error}</p>
          </div>
        )}
        <div className="mb-2">
          <Label htmlFor="email" className="text-base">
            Email
          </Label>
          <Input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
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
          Login
        </Button>
      </form>
    </div>
  );
};

export default Login;
