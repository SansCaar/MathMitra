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
import { useAtomValue, useSetAtom } from "jotai";
import { UserAtom } from "@src/atoms/UserAtom";
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
];

export function RecentAssignments() {
  const user = useAtomValue(UserAtom);

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

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-slate-900">
          Recent Assignments
        </h2>
        <Button variant="outline" size="sm">
          View All
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {mockAssignments.map((assignment) => (
          <Card
            key={assignment.id}
            className="hover:shadow-md transition-shadow"
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-base font-medium text-slate-900 mb-1">
                    {assignment.title}
                  </CardTitle>
                  <p className="text-sm text-slate-600">{assignment.subject}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge
                    variant="secondary"
                    className={getStatusColor(assignment.status)}
                  >
                    {assignment.status.charAt(0).toUpperCase() +
                      assignment.status.slice(1)}
                  </Badge>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
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
  );
}
