"use client";

import { Button } from "@components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@components/ui/card";
import { Input } from "@components/ui/input";
import { Label } from "@components/ui/label";
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { UserAtom } from "@src/atoms/UserAtom";
import { useAtomValue, useSetAtom } from "jotai";

interface LoginResponse {
  message: string;
  status: string;
  token?: string;
}

export default function LoginForm() {
  const router = useRouter();

  const user = useAtomValue(UserAtom);
  const setUser = useSetAtom(UserAtom);

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "student",
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post("/api/users/login", {
        email: formData.email,
        password: formData.password,
        role: formData.role,
      });
      const data = response.data;

      if (data.status === "success" && data.token) {
        // Store the token
        localStorage.setItem("token", data.token);
        setUser(data.user);
        if (data.user.role === "teacher") {
          router.push("/teacher");
        } else {
          router.push("/student");
        }
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err: any) {
      console.error("Login error:", err);
      setError(err.response?.data?.message || "An error occurred during login");
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <Card
        className="w-full max-w-md shadow-lg"
        style={{
          padding: 16,
        }}
      >
        <form onSubmit={handleSubmit}>
          <CardHeader className="space-y-2 pb-6 px-8 pt-8">
            <CardTitle className="text-2xl font-bold tracking-tight text-center">
              Welcome back
            </CardTitle>
            <CardDescription className="text-slate-600 text-center">
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 px-8">
            {error && (
              <div className="text-red-500 text-sm text-center">{error}</div>
            )}
            <div className="space-y-3">
              <Label htmlFor="email" className="text-sm font-medium">
                Email
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  className="pl-10 h-12 w-full"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  style={{
                    paddingLeft: 16,
                  }}
                />
              </div>
            </div>
            <div
              className="space-y-3"
              style={{
                marginTop: 12,
              }}
            >
              <Label htmlFor="password" className="text-sm font-medium">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="pl-10 pr-10 h-12 w-full"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  style={{
                    paddingLeft: 16,
                  }}
                />

                {/* BUTTON TO TOGGLE ROLE */}

                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <div
              className="flex items-center justify-between text-sm pt-2"
              style={{
                marginTop: 12,
              }}
            >
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="rounded border-slate-300 text-slate-900 focus:ring-slate-500"
                />
                <span className="text-slate-600">Remember me</span>
              </label>
              <a
                href="#"
                className="text-slate-900 hover:text-slate-700 font-medium hover:underline"
              >
                Forgot password?
              </a>
            </div>
            <div>
              <span className="text-slate-600 text-center w-full">
                Who are you?
              </span>

              <div className="flex w-full items-center justify-between text-sm pt-2 gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className={` flex-1 h-12   font-bold text-slate-800
${
  formData.role === "student"
    ? "bg-slate-800 hover:bg-slate-800  text-white hover:text-white"
    : "bg-transparent hover:bg-transparent border-2 border-slate-800  "
}
`}
                  disabled={isLoading}
                  onClick={() => {
                    setFormData({
                      ...formData,
                      role: "student",
                    });
                  }}
                >
                  Student
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className={` flex-1 h-12   font-bold text-slate-800
${
  formData.role === "teacher"
    ? "bg-slate-800 hover:bg-slate-800  text-white hover:text-white"
    : "bg-transparent hover:bg-transparent border-2 border-slate-800  "
}
`}
                  disabled={isLoading}
                  onClick={() => {
                    setFormData({
                      ...formData,
                      role: "teacher",
                    });
                  }}
                >
                  {" "}
                  Teacher
                </Button>
              </div>
            </div>
            {/* END OF BUTTON TO TOGGLE ROLE */}
          </CardContent>
          <CardFooter
            className="flex flex-col space-y-4 pt-4 px-8 pb-8"
            style={{
              marginTop: 12,
            }}
          >
            <Button
              type="submit"
              className="w-full h-12 bg-slate-900 hover:bg-slate-800 text-white font-medium"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </Button>
            <div
              className="text-center text-sm text-slate-600 pt-2"
              style={{
                marginTop: 12,
              }}
            >
              {"Don't have an account? "}
              <a
                href="#"
                className="text-slate-900 hover:text-slate-700 font-medium hover:underline"
              >
                Sign up
              </a>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
