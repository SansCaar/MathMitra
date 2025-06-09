"use client";

import { useState, useEffect } from "react";
import { MyClasses } from "@components/teacher/my-classes";
import { RecentAssignments } from "@components/teacher/recent-assignments";
import type { Class } from "@components/teacher/my-classes";
import { ActionCards } from "@components/teacher/action-cards";
import { fetchClasses, MyClassesAtom, UserAtom } from "@src/atoms/UserAtom";
import { useAtomValue, useSetAtom } from "jotai";
import { CreateClassDialog } from "@components/teacher/create-class-dialog";

export default function TeacherDashboard() {
  const user = useAtomValue(UserAtom);

  const [isClassDialogOpen, setIsClassDialogOpen] = useState(false);

  const classes = useAtomValue(MyClassesAtom);

  const setClasses = useSetAtom(MyClassesAtom);
  console.log(classes);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user)
      fetchClasses({ userId: user.id, setMyClasses: setClasses }).then(() =>
        setIsLoading(false)
      );
  }, [user]);

  const handleClassCreated = (newClass: Class) => {
    setClasses((prev) => [...prev, newClass]);
    setIsLoading(true);
    fetchClasses({ userId: user.id, setMyClasses: setClasses }).then(() =>
      setIsLoading(false)
    );
  };
  const combined = `To solve the quadratic equation, we use: \\( x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a} \\), which is valid for any quadratic.`;

  return (
    <div className="min-h-screen bg-slate-50">
      <main className="container mx-auto px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Welcome back, {user ? user?.name?.split(" ")[1] : "User"}! 👋
          </h1>
        </div>

        <ActionCards classes={classes} onClassCreated={handleClassCreated} />

        {isLoading ? (
          <div className="text-center py-8">Loading classes...</div>
        ) : (
          <MyClasses
            classes={classes}
            onCreateClass={() => setIsClassDialogOpen(true)}
          />
        )}

        <RecentAssignments />
        <CreateClassDialog
          open={isClassDialogOpen}
          onOpenChange={setIsClassDialogOpen}
          onCreateClass={(newClass: Class) => handleClassCreated(newClass)}
        />
      </main>
    </div>
  );
}
