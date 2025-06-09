"use client";

import { Card, CardContent } from "@components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@components/ui/avatar";
import { Badge } from "@components/ui/badge";
import { Button } from "@components/ui/button";
import { Calendar, Mail, Phone, Download, Share } from "lucide-react";

interface StudentInfo {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  enrollmentDate: string;
  overallGrade: string;
  status: "Active" | "Inactive" | "At Risk";
}

interface StudentReportHeaderProps {
  student: StudentInfo;
}

export function StudentReportHeader({ student }: StudentReportHeaderProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800";
      case "At Risk":
        return "bg-red-100 text-red-800";
      case "Inactive":
        return "bg-slate-100 text-slate-800";
      default:
        return "bg-slate-100 text-slate-800";
    }
  };

  const getGradeColor = (grade: string) => {
    if (grade.startsWith("A")) return "text-green-600";
    if (grade.startsWith("B")) return "text-blue-600";
    if (grade.startsWith("C")) return "text-yellow-600";
    return "text-red-600";
  };

  const initials = student.name
    .split(" ")
    .map((name) => name[0])
    .join("")
    .toUpperCase();

  return (
    <Card className="mb-6">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Avatar className="h-16 w-16">
              <AvatarImage
                src={"https://pujanpokharel.com.np/images/hon_3.jpg"}
                alt={student.name}
              />
              <AvatarFallback className="bg-slate-900 text-white text-lg">
                {initials}
              </AvatarFallback>
            </Avatar>

            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <h1 className="text-2xl font-bold text-slate-900">
                  {student.name}
                </h1>
                <Badge
                  className={getStatusColor(student.status)}
                  variant="secondary"
                >
                  {student.status}
                </Badge>
              </div>

              <div className="flex items-center space-x-4 text-sm text-slate-600">
                <div className="flex items-center space-x-1">
                  <Mail className="h-4 w-4" />
                  <span>{student.email}</span>
                </div>
                {student.phone && (
                  <div className="flex items-center space-x-1">
                    <Phone className="h-4 w-4" />
                    <span>{student.phone}</span>
                  </div>
                )}
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>Enrolled: {student.enrollmentDate}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="text-right space-y-3">
            <div>
              <p className="text-sm text-slate-600">Overall Grade</p>
              <p
                className={`text-3xl font-bold ${getGradeColor(
                  student.overallGrade
                )}`}
              >
                {student.overallGrade}
              </p>
            </div>

            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
              <Button variant="outline" size="sm">
                <Share className="mr-2 h-4 w-4" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
