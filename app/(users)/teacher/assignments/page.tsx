"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card";
import { Badge } from "@components/ui/badge";
import { Button } from "@components/ui/button";
import {
  Calendar,
  Clock,
  Users,
  MoreHorizontal,
  Plus,
  ArrowLeft,
  BarChart2,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";
import { useAtomValue } from "jotai";
import { UserAtom } from "@src/atoms/UserAtom";
import { useRouter } from "next/navigation";
import { useMemo } from "react";

interface Assignment {
  id: string;
  title: string;
  subject: string;
  dueDate: string;
  studentsCount: number;
  status: "active" | "draft" | "completed";
  createdAt: string;
}

const mockAssignments: Assignment[] = [
  {
    id: "1",
    title: "Mathematics Quiz - Algebra Basics",
    subject: "Mathematics",
    dueDate: "2024-01-15",
    studentsCount: 28,
    status: "active",
    createdAt: "2024-01-08",
  },
  {
    id: "2",
    title: "Science Project - Solar System",
    subject: "Science",
    dueDate: "2024-01-20",
    studentsCount: 25,
    status: "active",
    createdAt: "2024-01-05",
  },
  {
    id: "3",
    title: "English Essay - Creative Writing",
    subject: "English",
    dueDate: "2024-01-12",
    studentsCount: 30,
    status: "completed",
    createdAt: "2024-01-01",
  },
  {
    id: "4",
    title: "History Research - World War II",
    subject: "History",
    dueDate: "2024-01-25",
    studentsCount: 22,
    status: "draft",
    createdAt: "2024-01-07",
  },
  // Add more mock assignments here
];

export default function AllAssignments() {
  const user = useAtomValue(UserAtom);
  const router = useRouter();

  const getStatusColor = (status: Assignment["status"]) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 hover:bg-green-200";
      case "draft":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200";
      case "completed":
        return "bg-slate-100 text-slate-800 hover:bg-slate-200";
      default:
        return "bg-slate-100 text-slate-800";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const sortedAssignments = useMemo(() => {
    return [...mockAssignments].sort(
      (a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
    );
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6">
        {/* Header Section */}
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 flex items-center gap-3">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                <Calendar className="w-5 h-5 md:w-6 md:h-6 text-white" />
              </div>
              All Assignments
            </h1>
            <p className="text-base md:text-lg text-gray-600">
              View and manage all your assignments
            </p>
          </div>

          <div className="flex items-center gap-4">
            <Button
              onClick={() => router.back()}
              className="group border-black bg-transparent border-2 hover:bg-black p-4 aspect-square rounded-full"
            >
              <ArrowLeft className="w-6 h-6 text-black group-hover:text-white" />
            </Button>
            <Button
              onClick={() => router.push("/teacher/assignments/create")}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="w-5 h-5 mr-2" />
              New Assignment
            </Button>
          </div>
        </div>

        {/* Assignments Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {sortedAssignments.map((assignment) => (
            <Card
              key={assignment.id}
              className="hover:shadow-md transition-shadow"
            >
              <CardHeader className="pb-3">
                  <div className="flex-1">
                    <CardTitle className="text-base font-medium text-slate-900 mb-1">
                      {assignment.title}
                    </CardTitle>
                    <p className="text-sm text-slate-600">
                      {assignment.subject}
                    </p>
                  </div>
                  <div className="flex gap-2 items-center">
        
                  <div className="flex items-center space-x-2">
                   
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Duplicate</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center justify-between text-sm text-slate-600">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>Due {formatDate(assignment.dueDate)}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4" />
                      <span>{assignment.studentsCount} students</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>Created {formatDate(assignment.createdAt)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
