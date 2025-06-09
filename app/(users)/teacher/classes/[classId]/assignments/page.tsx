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
  FileText,
  BookOpen,
  GraduationCap,
  BarChart2,
} from "lucide-react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";
import { useAtomValue } from "jotai";
import { UserAtom } from "@src/atoms/UserAtom";
import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";
import { MyClassesAtom } from "@src/atoms/UserAtom";
import axios from "axios";

interface Question {
  id: string;
  question: string;
  answer: string;
  submissionsCount: number;
}

interface Assignment {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  createdAt: string;
  questions: Question[];
  submissionsCount: number;
}

// Mock data - replace with actual API call
const mockClassData = {
  id: "1",
  name: "Advanced Mathematics",
  subject: "Mathematics",
  section: "A",
  description:
    "Advanced mathematics course covering calculus and linear algebra",
  studentCount: 28,
  assignmentsCount: 5,
  classCode: "MATH101",
  createdAt: "2024-01-01",
};

const mockAssignments: Assignment[] = [
  {
    id: "1",
    title: "Algebra Basics Quiz",
    description: "Test your understanding of basic algebraic concepts",
    dueDate: "2024-01-15",
    createdAt: "2024-01-08",
    submissionsCount: 25,
    questions: [
      {
        id: "q1",
        question: "Solve for x: 2x + 5 = 13",
        answer: "x = 4",
        submissionsCount: 25,
      },
      {
        id: "q2",
        question: "Factor the expression: x² + 5x + 6",
        answer: "(x + 2)(x + 3)",
        submissionsCount: 23,
      },
    ],
  },
  {
    id: "2",
    title: "Geometry Practice",
    description: "Practice problems on basic geometry concepts",
    dueDate: "2024-01-20",
    createdAt: "2024-01-10",
    submissionsCount: 20,
    questions: [
      {
        id: "q1",
        question: "Find the area of a circle with radius 5cm",
        answer: "78.54 cm²",
        submissionsCount: 20,
      },
      {
        id: "q2",
        question:
          "Calculate the perimeter of a rectangle with length 8cm and width 6cm",
        answer: "28 cm",
        submissionsCount: 18,
      },
    ],
  },
];

export default function ClassAssignments({
  params,
}: {
  params: { classId: string };
}) {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [questions, setQuestions] = useState<Record<string, Question[]>>({});
  const user = useAtomValue(UserAtom);
  const classes = useAtomValue(MyClassesAtom);
  const router = useRouter();
  const myclassData = classes?.find((c) => c.id === params.classId);

  useEffect(() => {
    const getAssinments = async (classCode: string) => {
      if (!classCode) return;
      try {
        const response = await axios.post("/api/assignments/viewAll", {
          classCode: classCode,
          returnResBy: "classCode",
        });
        setAssignments(response.data.body);
      } catch (error) {
        console.error("Error fetching assignments:", error);
      }
    };

    getAssinments(myclassData?.classCode || "");
  }, [myclassData]);

  useEffect(() => {
    const getQuestions = async () => {
      if (assignments.length === 0) return;

      try {
        const questionsPromises = assignments.map(async (assignment) => {
          console.log(assignment.id);
          const response = await axios.post("/api/questions/viewAll", {
            assignmentId: assignment.id,
            groupBy: "assignmentId",
          });
          return { assignmentId: assignment.id, questions: response.data.body };
        });

        const results = await Promise.all(questionsPromises);
        const newQuestions = results.reduce(
          (acc, { assignmentId, questions }) => {
            acc[assignmentId] = questions;
            return acc;
          },
          {} as Record<string, Question[]>
        );

        setQuestions(newQuestions);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    getQuestions();
  }, [assignments]);

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

    return (
      subjectMap[subject] || "bg-slate-100 text-slate-800 hover:bg-slate-200"
    );
  };

  const handleBack = () => {
    router.back();
  };

  const handleNewAssignment = () => {
    router.push(`/teacher/assignments/create?classId=${params.classId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6">
        {/* Header Section */}
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 flex items-center gap-3">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                <BookOpen className="w-5 h-5 md:w-6 md:h-6 text-white" />
              </div>
              {myclassData?.name}
            </h1>
            <p className="text-base md:text-lg text-gray-600">
              {myclassData?.description}
            </p>
          </div>

          <div className="flex items-center gap-4">
            <Button
              onClick={handleBack}
              className="group border-black bg-transparent border-2 hover:bg-black p-4 aspect-square rounded-full"
            >
              <ArrowLeft className="w-6 h-6 text-black group-hover:text-white" />
            </Button>
            <Button
              onClick={handleNewAssignment}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="w-5 h-5 mr-2" />
              New Assignment
            </Button>
          </div>
        </div>

        {/* Class Info Card */}
        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Class Code</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {myclassData?.classCode}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                  <Users className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Students</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {myclassData?.studentCount ? myclassData?.studentCount : 0}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
                  <FileText className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Assignments</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {myclassData?.assignmentsCount
                      ? myclassData?.assignmentsCount
                      : 0}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-amber-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Created</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {formatDate(myclassData?.createdAt)}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Assignments Grid */}
        <div className="grid grid-cols-1 gap-4">
          {assignments.map((assignment) => (
            <Card
              key={assignment.id}
              className="hover:shadow-lg transition-all duration-200 border-0"
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge
                        variant="secondary"
                        className={getSubjectColor(myclassData?.subject || "")}
                      >
                        {myclassData?.subject}
                      </Badge>
                      <Badge
                        variant="secondary"
                        className="bg-blue-100 text-blue-800"
                      >
                        {questions[assignment.id]?.length || 0} Questions
                      </Badge>
                    </div>
                    <CardTitle className="text-xl font-semibold text-gray-900 mb-2">
                      {assignment.title}
                    </CardTitle>
                    <p className="text-sm text-gray-600">
                      {assignment.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <Button
                      onClick={() =>
                        router.push(
                          `/teacher/classes/123/assignments/report`
                        )
                      }
                      className="w-full bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold rounded-xl"
                    >
                      <BarChart2 className="w-4 h-4 mr-2" />
                      See Report
                    </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem>View Submissions</DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center justify-between text-sm text-gray-600 mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>Due {formatDate(assignment.dueDate)}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4" />
                      <span>
                        {assignment.submissionsCount || 0} submissions
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>Created {formatDate(assignment.createdAt)}</span>
                  </div>
                </div>

                {/* Questions Section */}
                <div className="mt-4 space-y-3">
                  <h3 className="text-sm font-medium text-gray-900">
                    Questions
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {questions[assignment.id]?.map((question) => (
                      <div
                        key={question.id}
                        className="bg-gray-50 rounded-xl p-4 border border-gray-200 hover:border-gray-300 transition-colors"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900 mb-2">
                              {question.question}
                            </p>
                            <div className="flex items-center gap-2">
                              <Badge
                                variant="secondary"
                                className="bg-gray-200 text-gray-700"
                              >
                                Answer: {question.answer}
                              </Badge>
                              <Badge
                                variant="secondary"
                                className="bg-blue-100 text-blue-800"
                              >
                                {question.submissionsCount || 0} submissions
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    {(!questions[assignment.id] ||
                      questions[assignment.id].length === 0) && (
                      <div className="col-span-2 text-center py-4 text-gray-500">
                        No questions added yet
                      </div>
                    )}
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
