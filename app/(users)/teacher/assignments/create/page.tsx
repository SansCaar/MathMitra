"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import { Label } from "@components/ui/label";
import { Textarea } from "@components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card";
import { Badge } from "@components/ui/badge";
import { Alert, AlertDescription } from "@components/ui/alert";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/ui/select";
import {
  Plus,
  Trash2,
  Lock,
  Edit3,
  Loader2,
  CheckCircle,
  AlertCircle,
  BookOpen,
  FileText,
  ClipboardList,
  CheckSquare,
  ArrowRight,
  Users,
  Calendar,
  ArrowLeft,
} from "lucide-react";
import { fetchClasses, MyClassesAtom, UserAtom } from "@src/atoms/UserAtom";
import { useAtomValue, useSetAtom } from "jotai";
interface Question {
  id: string;
  question: string;
  solution: string;
}

interface ClassOption {
  id: string;
  name: string;
  classCode: string;
  studentsCount: number;
}
import axios from "axios";

export default function CreateAssignment() {
  const user = useAtomValue(UserAtom);
  const setUser = useSetAtom(UserAtom);
  const classes = useAtomValue(MyClassesAtom);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [assignmentName, setAssignmentName] = useState("");
  const [assignmentDescription, setAssignmentDescription] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [isAssignmentFixed, setIsAssignmentFixed] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  useEffect(() => {
    // const classesData = searchParams.get("classes");
    // if (classesData) {
    //   try {
    //     const parsedClasses = JSON.parse(classesData);
    //     setClasses(parsedClasses);
    //   } catch (error) {
    //     console.error("Error parsing classes data:", error);
    //   }
    // }
  }, [searchParams]);

  const handleFixAssignment = () => {
    if (
      assignmentName.trim() &&
      assignmentDescription.trim() &&
      selectedClass &&
      dueDate
    ) {
      setIsAssignmentFixed(true);
    }
  };

  const handleEditAssignment = () => {
    setIsAssignmentFixed(false);
    setSubmitStatus({ type: null, message: "" });
  };

  const addQuestion = () => {
    const newQuestion: Question = {
      id: Date.now().toString(),
      question: "",
      solution: "",
    };
    setQuestions([...questions, newQuestion]);
  };

  const updateQuestion = (id: string, field: keyof Question, value: string) => {
    setQuestions(
      questions.map((q) => (q.id === id ? { ...q, [field]: value } : q))
    );
  };

  const removeQuestion = (id: string) => {
    setQuestions(questions.filter((q) => q.id !== id));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      if (!classes) {
        throw new Error("No classes available");
      }

      const classData = classes.find((c) => c?.id === selectedClass);
      if (!classData) {
        throw new Error("Selected class not found");
      }
      alert(classData.classCode);

      const CreateAssignmentResponse = await axios.post(
        "/api/assignments/create",
        {
          title: assignmentName,
          description: assignmentDescription,
          classId: selectedClass,
          teacherId: user?.id || "",
          submissionCount: 0,
          classCode: classData.classCode,
          dueDate: dueDate,
        }
      );

      console.log(CreateAssignmentResponse?.data?.body?.id);

      await Promise.all(
        questions?.map(async (question) => {
          const createQuestion = await axios.post("/api/questions/create", {
            assignmentId: CreateAssignmentResponse?.data?.body?.id,
            teacherId: user?.id,
            classCode: classData.classCode,
            submissionsCount: 0,
            question: question.question,
            answer: question?.solution,
          });
          console.log(createQuestion);
        })
      );

      setSubmitStatus({
        type: "success",
        message: "Assignment created successfully",
      });

      // Reset form and redirect after success
      // setTimeout(() => {
      //   setAssignmentName("");
      //   setAssignmentDescription("");
      //   setSelectedClass("");
      //   setIsAssignmentFixed(false);
      //   setQuestions([]);
      //   setSubmitStatus({ type: null, message: "" });
      //   router.push("/teacher");
      // }, 2000);
    } catch (error) {
      console.error("Error creating assignment:", error);
      setSubmitStatus({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedClassData = classes?.find((c) => c.id === selectedClass);

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
              Create Assignment
            </h1>
            <p className="text-base md:text-lg text-gray-600">
              Design and distribute new assignments to your students
            </p>
          </div>

          <Button
            onClick={() => router.back()}
            className="group border-black bg-transparent border-2 hover:bg-black  p-4 aspect-square  rounded-full"
          >
            <ArrowLeft className="w-24 h-24 text-black hover:text-gray-50 group-hover:text-white" />
          </Button>
        </div>

        {/* Status Alert */}
        {submitStatus.type && (
          <Alert
            className={`border-2 ${
              submitStatus.type === "success"
                ? "border-success bg-green-50"
                : "border-red-400 bg-red-50"
            }`}
          >
            {submitStatus.type === "success" ? (
              <CheckCircle className="h-5 w-5 text-success" />
            ) : (
              <AlertCircle className="h-5 w-5 text-red-500" />
            )}
            <AlertDescription
              className={`text-base font-medium ${
                submitStatus.type === "success"
                  ? "text-green-800"
                  : "text-red-800"
              }`}
            >
              {submitStatus.message}
            </AlertDescription>
          </Alert>
        )}

        {/* Two Column Layout Container */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Column - Assignment Details */}
          <div className="w-full lg:w-5/12 lg:sticky lg:top-6 lg:self-start">
            <Card className="border-0 shadow-lg rounded-2xl overflow-hidden">
              <CardHeader className="bg-white border-b border-gray-100 flex flex-row items-center justify-between space-y-0 pb-6">
                <CardTitle className="text-xl md:text-2xl font-bold text-gray-900 flex items-center gap-3">
                  Assignment Details
                  {isAssignmentFixed && (
                    <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-100 flex items-center gap-1.5 px-3 py-1">
                      <Lock className="w-3.5 h-3.5" />
                      Fixed
                    </Badge>
                  )}
                </CardTitle>
                {isAssignmentFixed && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleEditAssignment}
                    disabled={isSubmitting}
                    className="border-gray-300 hover:bg-gray-50"
                  >
                    <Edit3 className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                )}
              </CardHeader>
              <CardContent className="px-6 md:px-8 space-y-6 bg-white">
                <div className="space-y-3">
                  <Label
                    htmlFor="class-select"
                    className="text-base font-semibold text-gray-900"
                  >
                    Select Class
                  </Label>
                  <Select
                    value={selectedClass}
                    onValueChange={setSelectedClass}
                    disabled={isAssignmentFixed || isSubmitting}
                  >
                    <SelectTrigger
                      className={`h-20 text-base border-2 rounded-xl ${
                        isAssignmentFixed
                          ? "bg-gray-50 border-gray-200"
                          : "border-gray-300 focus:border-primary"
                      }`}
                    >
                      <SelectValue placeholder="Choose a class for this assignment" />
                    </SelectTrigger>
                    <SelectContent>
                      {(classes || []).map((classItem) => (
                        <SelectItem key={classItem.id} value={classItem.id}>
                          <div className="flex items-center justify-between w-full">
                            <span className="font-medium">
                              {classItem.name}
                            </span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {selectedClassData && (
                    <div className="p-3 bg-blue-50 rounded-xl border border-blue-200">
                      <div className="flex items-center gap-2 text-sm text-blue-800">
                        <Users className="w-4 h-4" />
                        <span className="font-medium">
                          Selected: {selectedClassData.name}
                        </span>
                      </div>
                      <div className="text-xs text-blue-600 mt-1">
                        Class Code: {selectedClassData.classCode} •{" "}
                        {selectedClassData.studentCount || 0} students
                      </div>
                    </div>
                  )}
                </div>
                <div className="space-y-3">
                  <Label
                    htmlFor="assignment-name"
                    className="text-base font-semibold text-gray-900"
                  >
                    Assignment Name
                  </Label>
                  <Input
                    id="assignment-name"
                    placeholder="Enter assignment name"
                    value={assignmentName}
                    onChange={(e) => setAssignmentName(e.target.value)}
                    disabled={isAssignmentFixed || isSubmitting}
                    className={`h-12 text-base border-2 rounded-xl ${
                      isAssignmentFixed
                        ? "bg-gray-50 border-gray-200"
                        : "border-gray-300 focus:border-primary"
                    }`}
                  />
                </div>

                <div className="space-y-3">
                  <Label
                    htmlFor="assignment-description"
                    className="text-base font-semibold text-gray-900"
                  >
                    Description
                  </Label>
                  <Textarea
                    id="assignment-description"
                    placeholder="Enter assignment description"
                    value={assignmentDescription}
                    onChange={(e) => setAssignmentDescription(e.target.value)}
                    disabled={isAssignmentFixed || isSubmitting}
                    className={`min-h-24 text-base border-2 rounded-xl resize-none ${
                      isAssignmentFixed
                        ? "bg-gray-50 border-gray-200"
                        : "border-gray-300 focus:border-primary"
                    }`}
                    rows={4}
                  />
                </div>

                <div className="space-y-3">
                  <Label
                    htmlFor="due-date"
                    className="text-base font-semibold text-gray-900"
                  >
                    Due Date
                  </Label>
                  <div className="relative">
                    <Input
                      id="due-date"
                      type="datetime-local"
                      value={dueDate}
                      onChange={(e) => setDueDate(e.target.value)}
                      disabled={isAssignmentFixed || isSubmitting}
                      className={`h-12 text-base border-2 rounded-xl pl-10 ${
                        isAssignmentFixed
                          ? "bg-gray-50 border-gray-200"
                          : "border-gray-300 focus:border-primary"
                      }`}
                      min={new Date().toISOString().slice(0, 16)}
                    />
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                  </div>
                </div>

                {!isAssignmentFixed && (
                  <Button
                    onClick={handleFixAssignment}
                    disabled={
                      !assignmentName.trim() ||
                      !assignmentDescription.trim() ||
                      !selectedClass ||
                      !dueDate ||
                      isSubmitting
                    }
                    className="w-full h-12 bg-blue-600 hover:bg-blue-700"
                  >
                    <Lock className="w-5 h-5 mr-2" />
                    Create Assignment
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* Submit Button - Only visible on desktop when fixed and has questions */}
            {isAssignmentFixed && questions.some((q) => q.question.trim()) && (
              <div className="mt-6 hidden lg:block">
                <Button
                  onClick={handleSubmit}
                  size="lg"
                  className="w-full py-4 bg-primary hover:bg-blue-600 text-white font-bold rounded-2xl text-lg h-auto"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-3 animate-spin" />
                      Creating Assignment...
                    </>
                  ) : (
                    "Create Assignment"
                  )}
                </Button>
              </div>
            )}
          </div>

          {/* Right Column - Questions or Illustration */}
          <div className="w-full lg:w-7/12">
            {isAssignmentFixed ? (
              <Card className="border-0 shadow-lg rounded-2xl overflow-hidden">
                <CardHeader className="bg-white border-b border-gray-100 flex flex-row items-center justify-between space-y-0 pb-6">
                  <CardTitle className="text-xl md:text-2xl font-bold text-gray-900">
                    Questions ({questions.length})
                  </CardTitle>
                  <Button
                    onClick={addQuestion}
                    size="sm"
                    disabled={isSubmitting}
                    className="bg-green-400 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded-xl"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Question
                  </Button>
                </CardHeader>
                <CardContent className="p-6 md:p-8 space-y-6 bg-white">
                  {questions.length === 0 ? (
                    <div className="text-center py-12 text-gray-500">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Plus className="w-8 h-8 text-gray-400" />
                      </div>
                      <p className="text-lg font-medium">
                        No questions added yet
                      </p>
                      <p className="text-base">
                        Click "Add Question" to get started
                      </p>
                    </div>
                  ) : (
                    questions.map((question, index) => (
                      <Card
                        key={question.id}
                        className="border-2 border-gray-200 rounded-2xl overflow-hidden"
                      >
                        <CardHeader className="bg-gray-50 border-b border-gray-200 flex flex-row items-center justify-between space-y-0 pb-4">
                          <h4 className="text-lg font-bold text-gray-900">
                            Question {index + 1}
                          </h4>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeQuestion(question.id)}
                            className="text-red-500 hover:text-red-700 hover:bg-red-50 rounded-xl"
                            disabled={isSubmitting}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </CardHeader>
                        <CardContent className="p-6 space-y-6 bg-white">
                          <div className="space-y-3">
                            <Label
                              htmlFor={`question-${question.id}`}
                              className="text-base font-semibold text-gray-900"
                            >
                              Question
                            </Label>
                            <Textarea
                              id={`question-${question.id}`}
                              placeholder="Enter your question here..."
                              value={question.question}
                              onChange={(e) =>
                                updateQuestion(
                                  question.id,
                                  "question",
                                  e.target.value
                                )
                              }
                              rows={3}
                              disabled={isSubmitting}
                              className="text-base border-2 border-gray-300 focus:border-primary rounded-xl resize-none"
                            />
                          </div>
                          <div className="space-y-3">
                            <Label
                              htmlFor={`solution-${question.id}`}
                              className="text-base font-semibold text-gray-900"
                            >
                              Solution{" "}
                              <span className="text-gray-500 font-normal">
                                (Optional)
                              </span>
                            </Label>
                            <Textarea
                              id={`solution-${question.id}`}
                              placeholder="Enter the solution or answer key (optional)..."
                              value={question.solution}
                              onChange={(e) =>
                                updateQuestion(
                                  question.id,
                                  "solution",
                                  e.target.value
                                )
                              }
                              rows={3}
                              disabled={isSubmitting}
                              className="text-base border-2 border-gray-300 focus:border-primary rounded-xl resize-none"
                            />
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  )}
                </CardContent>
              </Card>
            ) : (
              <Card className="border-0 shadow-lg rounded-2xl overflow-hidden h-full">
                <CardContent className="p-6 md:p-8 flex flex-col items-center justify-center min-h-[400px] bg-white">
                  <div className="text-center space-y-6">
                    {/* Assignment Illustration */}
                    <div className="relative mx-auto">
                      {/* Background Circle */}
                      <div className="w-40 h-40 rounded-full bg-blue-50 flex items-center justify-center">
                        {/* Document Icon */}
                        <div className="w-20 h-24 bg-white rounded-lg shadow-md relative flex flex-col items-center justify-center border-2 border-primary">
                          <div className="w-12 h-1 bg-gray-300 mb-1 rounded-full"></div>
                          <div className="w-12 h-1 bg-gray-300 mb-1 rounded-full"></div>
                          <div className="w-8 h-1 bg-gray-300 rounded-full"></div>
                          <FileText className="absolute -top-4 -right-4 w-10 h-10 text-primary bg-white rounded-full p-1 shadow-lg border-2 border-primary" />
                        </div>
                        {/* Floating Elements */}
                        <div className="absolute top-2 left-2">
                          <ClipboardList className="w-8 h-8 text-success" />
                        </div>
                        <div className="absolute bottom-4 right-0">
                          <CheckSquare className="w-6 h-6 text-primary" />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h3 className="text-2xl font-bold text-gray-900">
                        Create Your Assignment
                      </h3>
                      <p className="text-gray-600 max-w-md">
                        Fill in the assignment details and select a class on the
                        left, then click "Fix Assignment Details" to start
                        adding questions.
                      </p>
                    </div>

                    <div className="flex flex-col items-center space-y-4">
                      <div className="flex items-center text-primary font-medium text-sm">
                        <span>Step 1: Fill details & select class</span>
                        <ArrowRight className="w-4 h-4 mx-2" />
                        <span>Step 2: Add questions</span>
                      </div>

                      <div className="hidden lg:block">
                        <Button
                          disabled={false}
                          className="bg-primary hover:bg-primary  text-white font-semibold rounded-xl"
                        >
                          <Lock className="w-5 h-5 mr-2" />
                          Create Assignment
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Submit Button - Only visible on mobile when fixed and has questions */}
        {isAssignmentFixed && questions.some((q) => q.question.trim()) && (
          <div className="flex justify-center pb-8 lg:hidden">
            <Button
              onClick={handleSubmit}
              size="lg"
              className="w-full md:w-auto md:px-12 py-4 bg-primary hover:bg-blue-600 text-white font-bold rounded-2xl text-lg h-auto"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 mr-3 animate-spin" />
                  Creating...
                </>
              ) : (
                "Create"
              )}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
