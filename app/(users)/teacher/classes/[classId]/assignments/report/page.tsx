"use client";

import { StudentReportHeader } from "@components/report/student-report-header";
import { StudentPerformanceChart } from "@components/report/student-performance-chart";
import { QuestionPerformance } from "@components/report/question-performance";
import { ClassPerformance } from "@components/report/class-performance";

export default function StudentReport() {
  // Mock student data
  const studentInfo = {
    id: "student-001",
    name: "Sanskar Lamsal",
    email: "sskrlmsl@gmail.com",
    phone: "+977 98467761072",
    enrollmentDate: "September 2023",
    overallGrade: "B+",
    status: "Active" as const,
  };

  // Mock performance metrics
  const performanceMetrics = {
    confidence: 78,
    accuracy: 85,
    hintUsage: 25,
    completionRate: 92,
  };

  // Mock question data
  const questionData = [
    {
      id: "q1",
      question: "What is the derivative of x² + 3x + 2?",
      subject: "Mathematics",
      difficulty: "Medium" as const,
      isCorrect: true,
      confidenceLevel: 85,
      hintsUsed: 1,
      timeSpent: 180,
      attempts: 1,
    },

    {
      id: "q4",
      question: "Solve for x: 2x + 5 = 13",
      subject: "Mathematics",
      difficulty: "Easy" as const,
      isCorrect: true,
      confidenceLevel: 90,
      hintsUsed: 0,
      timeSpent: 45,
      attempts: 1,
    },
  ];

  // Mock class performance data
  const classPerformanceData = [
    {
      className: "Mathematics 101",
      subject: "Mathematics",
      totalAssignments: 12,
      completedAssignments: 11,
      averageScore: 87,
      trend: "up" as const,
      lastActivity: "2 days ago",
      strengths: ["Algebra", "Problem Solving", "Quick Calculations"],
      improvements: ["Geometry", "Word Problems"],
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <StudentReportHeader student={studentInfo} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <StudentPerformanceChart metrics={performanceMetrics} />
          </div>

          <div className="lg:col-span-2">
            <ClassPerformance classData={classPerformanceData} />
          </div>
        </div>

        <QuestionPerformance questions={questionData} />
      </div>
    </div>
  );
}
