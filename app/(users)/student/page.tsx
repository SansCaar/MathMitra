"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card";
import { Badge } from "@components/ui/badge";
import { Button } from "@components/ui/button";
import {
  Play,
  Users,
  BookOpen,
  Calendar,
  Clock,
  CheckCircle,
  Code,
  FileText,
  Target,
  User,
  Filter,
  Plus,
} from "lucide-react";
import { JoinClassDialog } from "@components/student/join-class-dialog";
import { useAtomValue, useSetAtom } from "jotai";
import { fetchClasses, MyClassesAtom, UserAtom } from "@src/atoms/UserAtom";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@components/ui/dialog";

// Types

interface Assignment {
  id: string;
  title: string;
  subject: string;
  className: string;
  classCode: string;
  dueDate: string;
  createdDate: string;
  status: "active" | "completed" | "overdue";
  questionCount: number;
  completedQuestions: number;
}

function getProgressPercentage(completed: number, total: number) {
  return Math.round((completed / total) * 100);
}

// Main Dashboard Component
export default function StudentDashboard() {
  const router = useRouter();
  const classes = useAtomValue(MyClassesAtom);
  console.log(classes);
  const setClasses = useSetAtom(MyClassesAtom);
  const user = useAtomValue(UserAtom);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [isJoinDialogOpen, setIsJoinDialogOpen] = useState(false);

  const fetchAssignments = async () => {
    const response = await fetch("/api/assignments/viewAll", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        returnResBy: "studentId",
        studentId: user?.id,
      }),
    });
    const data = await response.json();
    setAssignments(data.data);
  };

  useEffect(() => {
    if (!user) return;

    if (user?.id && user?.role) {
      fetchClasses({
        userId: user?.id,
        role: user?.role,
        setMyClasses: setClasses,
      });
      fetchAssignments();
    }
  }, [user]);

  const handleClassJoin = async (classCode: number) => {
    fetchClasses({
      userId: user?.id ?? "",
      role: user?.role,
      setMyClasses: setClasses,
    });
    fetchAssignments();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-4 md:p-8 space-y-10">
        {/* Header Section with Stats */}
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="space-y-2">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 flex items-center gap-3">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-primary rounded-xl flex items-center justify-center">
                  <User className="w-5 h-5 md:w-6 md:h-6 text-white" />
                </div>
                Welcome back, {user?.name}! 👋
              </h1>
              <p className="text-base md:text-lg text-gray-600">
                Here's what's happening with your studies today.
              </p>
            </div>
            <div className="flex gap-4">
              <div className="bg-blue-50 rounded-xl p-4 flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-blue-600 font-medium">
                    Active Classes
                  </p>
                  <p className="text-xl font-bold text-blue-900">
                    {classes?.length || 0}
                  </p>
                </div>
              </div>
              <div className="bg-green-50 rounded-xl p-4 flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Target className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-green-600 font-medium">
                    Assignments
                  </p>
                  <p className="text-xl font-bold text-green-900">
                    {assignments?.length || 0}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Practice Playground */}
          <Card className="border-0 flex-1 shadow-lg rounded-2xl overflow-hidden hover:shadow-xl transition-shadow lg:col-span-2">
            <CardContent className="px-6 py-8 h-full flex flex-col">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                  <Play className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    Practice Playground
                  </h3>
                  <p className="text-gray-600">
                    Create and practice with your own questions
                  </p>
                </div>
              </div>
              <div className="flex-1 flex items-end">
                <Button className="w-full bg-primary hover:bg-slate-800 text-white font-semibold rounded-xl h-12">
                  <Code className="w-5 h-5 mr-2" />
                  Start Practicing
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Join Class */}
          <Card
            className="border-0 shadow-lg rounded-2xl overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
            onClick={() => setIsJoinDialogOpen(true)}
          >
            <CardContent className="px-6 py-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    Join Class
                  </h3>
                  <p className="text-gray-600">
                    Enter a class code to join a new class
                  </p>
                </div>
              </div>
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl h-12">
                <Plus className="w-5 h-5 mr-2 text-white" />
                Join Class
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* My Classes Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">My Classes</h2>
              <p className="text-gray-600 mt-1">
                Manage and access your enrolled classes
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {classes?.map((classItem) => (
              <Card
                key={classItem.id}
                className="border-0 shadow-lg rounded-2xl overflow-hidden hover:shadow-xl transition-shadow"
              >
                <CardHeader className="bg-white border-b border-gray-100 px-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <Badge className="bg-blue-100 text-blue-800 mb-2">
                        {classItem.subject}
                      </Badge>
                      <CardTitle className="text-lg font-bold text-gray-900">
                        {classItem.name}
                      </CardTitle>
                      <p className="text-gray-600 text-sm mt-1">
                        {classItem.description}
                      </p>
                    </div>
                    <Badge className="bg-primary text-white">
                      Code: {classItem?.classCode ?? "No Code"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="px-6">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>
                          {classItem.studentCount ? classItem.studentCount : 0}{" "}
                          students
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <FileText className="w-4 h-4" />
                        <span>
                          {classItem?.assignmentsCount ?? 0} assignments
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex ">
                    <Button
                      className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold rounded-xl"
                      onClick={() =>
                        router.push(
                          `/student/classes/${classItem?.id}/assignments`
                        )
                      }
                    >
                      <BookOpen className="w-4 h-4 mr-2" />
                      View Assignments
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Dialog */}
        <Dialog open={isJoinDialogOpen} onOpenChange={setIsJoinDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold">
                Join a Class
              </DialogTitle>
            </DialogHeader>
            <JoinClassDialog onJoinClass={handleClassJoin}>
              <div className="hidden" />
            </JoinClassDialog>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
