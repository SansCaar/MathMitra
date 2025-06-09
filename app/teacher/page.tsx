"use client";

import { useState, useEffect } from "react";
import { MyClasses } from "@components/teacher/my-classes";
import { RecentAssignments } from "@components/teacher/recent-assignments";
import type { Class } from "@components/teacher/my-classes";
import { ActionCards } from "@components/teacher/action-cards";
import { MyClassesAtom, UserAtom } from "@src/atoms/UserAtom";
import { useAtomValue, useSetAtom } from "jotai";

export default function TeacherDashboard() {
  const teacherData = {
    id: "121323",
    name: "Dr. Sarah Johnson",
    email: "sarah.johnson@school.edu",
  };

  const user = useAtomValue(UserAtom);
  const setUser = useSetAtom(UserAtom);

  const classes = useAtomValue(MyClassesAtom);
  const setClasses = useSetAtom(MyClassesAtom);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await fetch("/api/classes/fetchClasses", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ teacherId: teacherData.id }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch classes");
        }

        const data = await response.json();
        setClasses(data.data);
      } catch (error) {
        console.error("Error fetching classes:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchClasses();
  }, [teacherData.id]);

  const handleClassCreated = (newClass: Class) => {
    setClasses((prev) => [...prev, newClass]);
  };

  return (
    <div className="min-h-screen bg-slate-50">
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

        {isLoading ? (
          <div className="text-center py-8">Loading classes...</div>
        ) : (
          <MyClasses classes={classes} onCreateClass={() => {}} />
        )}

        <RecentAssignments />
      </main>
    </div>
  );
}
