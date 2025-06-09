"use client";

import { useState } from "react";
import { TeacherHeader } from "../../src/components/teacher/teacher-header";
import { MyClasses } from "../../src/components/teacher/my-classes";
import { RecentAssignments } from "../../src/components/teacher/recent-assignments";
import type { Class } from "../../src/components/teacher/my-classes";
import { ActionCards } from "../../src/components/teacher/action-cards";

export default function TeacherDashboard() {
  const teacherData = {
    name: "Dr. Sarah Johnson",
    email: "sarah.johnson@school.edu",
  };

  // Sample classes for demonstration
  const [classes, setClasses] = useState<Class[]>([
    {
      id: "class-1",
      name: "Mathematics 101",
      subject: "Mathematics",
      section: "A",
      description:
        "Introduction to algebra, geometry, and calculus fundamentals",
      studentsCount: 28,
      assignmentsCount: 5,
    },
    {
      id: "class-2",
      name: "Physics Fundamentals",
      subject: "Science",
      section: "B",
      description:
        "Basic principles of mechanics, thermodynamics, and electromagnetism",
      studentsCount: 24,
      assignmentsCount: 3,
    },
    {
      id: "class-3",
      name: "English Literature",
      subject: "English",
      section: "C",
      description: "Analysis of classic and contemporary literary works",
      studentsCount: 30,
      assignmentsCount: 4,
    },
  ]);

  const handleClassCreated = (newClass: Class) => {
    setClasses((prev) => [...prev, newClass]);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <TeacherHeader
        teacherName={teacherData.name}
        teacherEmail={teacherData.email}
      />

      <main className="container mx-auto px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Welcome back, {teacherData.name.split(" ")[1]}! 👋
          </h1>
          <p className="text-slate-600">
            Here's what's happening with your classes today.
          </p>
        </div>

        <ActionCards classes={classes} onClassCreated={handleClassCreated} />

        <MyClasses classes={classes} onCreateClass={() => {}} />

        <RecentAssignments />
      </main>
    </div>
  );
}
