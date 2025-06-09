"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Users, MoreHorizontal, UserPlus, FileText } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { TMyClassesAtom } from "@src/atoms/UserAtom";

export interface Class {
  id: string;
  name: string;
  subject: string;
  section: string;
  description: string;
  studentsCount?: number;
  assignmentsCount?: number;
  classCode?: string;
}

interface MyClassesProps {
  classes: TMyClassesAtom;
  onCreateClass: () => void;
}

export function MyClasses({ classes, onCreateClass }: MyClassesProps) {
  // Add mock data for student and assignment counts if not provided
  const classesWithCounts = classes.map((cls) => ({
    ...cls,
    studentsCount: cls.studentsCount || Math.floor(Math.random() * 30) + 10,
    assignmentsCount: cls.assignmentsCount || Math.floor(Math.random() * 5),
  }));

  // Get subject color based on subject name for visual distinction
  const getSubjectColor = (subject: string) => {
    const subjectMap: Record<string, string> = {
      Mathematics: "bg-blue-100 text-blue-800 hover:bg-blue-200",
      Science: "bg-green-100 text-green-800 hover:bg-green-200",
      English: "bg-purple-100 text-purple-800 hover:bg-purple-200",
      History: "bg-amber-100 text-amber-800 hover:bg-amber-200",
      Geography: "bg-emerald-100 text-emerald-800 hover:bg-emerald-200",
      Art: "bg-pink-100 text-pink-800 hover:bg-pink-200",
      Music: "bg-indigo-100 text-indigo-800 hover:bg-indigo-200",
      "Physical Education": "bg-orange-100 text-orange-800 hover:bg-orange-200",
    };

    // Find a match or partial match
    const match = Object.keys(subjectMap).find((key) =>
      subject.toLowerCase().includes(key.toLowerCase())
    );

    return match
      ? subjectMap[match]
      : "bg-slate-100 text-slate-800 hover:bg-slate-200";
  };

  return (
    <div className="mb-10">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-slate-900">My Classes</h2>
        <Button variant="outline" size="sm" onClick={onCreateClass}>
          <Users className="mr-2 h-4 w-4" />
          Create Class
        </Button>
      </div>

      {classesWithCounts.length === 0 ? (
        <Card className="border-dashed border-2 bg-slate-50/50">
          <CardContent className="py-8">
            <div className="flex flex-col items-center justify-center text-center space-y-3">
              <Users className="h-12 w-12 text-slate-400" />
              <h3 className="text-lg font-medium text-slate-900">
                No classes yet
              </h3>
              <p className="text-sm text-slate-600 max-w-sm">
                You haven't created any classes yet. Create your first class to
                start adding assignments.
              </p>
              <Button onClick={onCreateClass} className="mt-2">
                <Users className="mr-2 h-4 w-4" />
                Create Your First Class
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {classesWithCounts.map((cls) => (
              <Card key={cls.id} className="hover:shadow-md transition-shadow gap-2">
              <CardHeader className=" pt-4 px-4">
                <div className="flex items-start justify-between">
                  <div className="w-full">
                    <div className="flex items-center justify-between w-full mb-1">
                      <Badge
                        className={getSubjectColor(cls.subject)}
                        variant="secondary"
                      >
                        {cls.subject}
                      </Badge>
                      <Badge className="bg-blue-500 text-white hover:bg-blue-600 ml-auto">
                        Class Code: {cls?.classCode}
                      </Badge>
                    </div>
                    <CardTitle className="text-base font-medium text-slate-900">
                      {cls.name}
                    </CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pb-2 px-4">
                {cls.description ? (
                  <p className="text-sm text-slate-600 line-clamp-2">
                    {cls.description}
                  </p>
                ) : (
                  <p className="text-sm text-slate-500 italic">
                    No description provided
                  </p>
                )}
              </CardContent>
              <CardFooter className="pt-0 px-4 mt-auto">
                <div className="flex items-center justify-between w-full text-sm">
                  <div className="flex items-center space-x-1 text-slate-600">
                    <Users className="h-4 w-4" />
                    <span>{cls.studentsCount} students</span>
                  </div>
                  <div className="flex items-center space-x-1 text-slate-600">
                    <FileText className="h-4 w-4" />
                    <span>{cls.assignmentsCount} submissions</span>
                  </div>
                </div>
              </CardFooter>
              <div className="px-4 pb-3">
                <Button variant="outline" size="sm" className="w-full">
                  <FileText className="mr-2 h-3 w-3" />
                  Assignments
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
