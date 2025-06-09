"use client";

import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { ChevronDown, LogOut, Settings, User } from "lucide-react";
import Link from "next/link";
import { useAtomValue, useSetAtom } from "jotai";
import { UserAtom } from "@src/atoms/UserAtom";
import { useRouter } from "next/navigation";

interface TeacherHeaderProps {
  teacherName: string;
  teacherEmail: string;
}

export function TeacherHeader({
  teacherName,
  teacherEmail,
}: TeacherHeaderProps) {

  const user = useAtomValue(UserAtom);
  const setUser =useSetAtom(UserAtom);
  const router = useRouter();


  const initials = teacherName
    .split(" ")
    .map((name) => name[0])
    .join("")
    .toUpperCase();

  return (
    <header className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href={ `/${user?.role}` }>
            <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
            </Link>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex items-center space-x-2 hover:bg-slate-100"
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src="/placeholder.svg?height=32&width=32"
                    alt={teacherName}
                  />
                  <AvatarFallback className="bg-slate-900 text-white text-sm">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <span className="font-medium text-slate-900">
                  {teacherName}
                </span>
                <ChevronDown className="h-4 w-4 text-slate-500" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <div className="px-2 py-1.5">
                <p className="text-sm font-medium">{teacherName}</p>
                <p className="text-xs text-slate-500">{teacherEmail}</p>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer">
                <User className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer text-red-600 focus:text-red-600" 
                  onClick={()=>{
                  alert("Logging out...")
                  setUser(null)
                  router.push("/auth/login")
                }
                }
              >
                <LogOut 
                  className="mr-2 h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
