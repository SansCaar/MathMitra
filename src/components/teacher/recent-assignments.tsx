"use client";

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Calendar, Clock, Users, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useAtomValue } from "jotai";
import { UserAtom } from "@src/atoms/UserAtom";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";


interface Assignment {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  classCode: number;
  teacherId: string;
  dueDate: string;
  submissionCount: number;
}

const mockAssignments = [
  {
    id: "1",
    title: "Assignment 1",
    subject: "Math",
    dueDate: "2023-03-01",
    studentsCount: 2,
    status: "active",
    createdAt: "2023-02-01",
  },
];

{
  /* i/api/assignments/viewAll */
}
export function RecentAssignments() {
  const user = useAtomValue(UserAtom);
  const router = useRouter();

  const [assignments, setAssignments] = useState<Assignment[]>([]);

  useEffect(() => {
    console.log("USER", JSON.stringify(user));
    const fetchAssignments = async () => {
      try {
        const response = await fetch("/api/assignments/viewAll", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ teacherId: user?.id }),
        });
        if (!response.ok) {
          throw new Error("Failed to fetch assignments");
        }
        const data = await response.json();
        let dataArray: Assignment[] = [];
        Object.keys(data.body).forEach((key) => {
          dataArray[Number(key)] = data.body[key];
        });
        console.log(dataArray);
        setAssignments(dataArray);
      } catch (error) {
        console.error("Error fetching assignments:", error);
        return null;
      }
    };
    fetchAssignments();
  }, [user]);

  const getStatusColor = (status: string) => {
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

  // Only show the first 3 assignments
  const recentAssignments = mockAssignments.slice(0, 3);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-slate-900">
          Recent Assignments
        </h2>
        <Button
          variant="outline"
          size="sm"
          onClick={() => router.push("/teacher/assignments")}
        >
          View All
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {assignments.map((assignment: Assignment) => {
          let status =
            new Date(assignment.dueDate).getTime() > new Date().getTime()
              ? "active"
              : new Date(assignment.dueDate).getTime() < new Date().getTime()
              ? "completed"
              : "completed";

          return (
            <Card
              key={`${assignment.id}`}
              className="hover:shadow-md transition-shadow"
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-base font-medium text-slate-900 mb-1">
                      {assignment.title}
                    </CardTitle>
                    <p className="text-sm text-slate-600">
                      {assignment.description}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge
                      variant="secondary"
                      className={getStatusColor(status)}
                    >
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </Badge>
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
                      <span>{assignment.submissionCount} students</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>Created {formatDate(assignment.createdAt)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
