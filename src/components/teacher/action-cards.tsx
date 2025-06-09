"use client";

import { useState } from "react";
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Plus, BookOpen, Users } from "lucide-react";
import { CreateClassDialog, type ClassFormData } from "./create-class-dialog";

import { useToast } from "../hooks/use-toast";
import type { Class } from "./my-classes";
import Link from "next/link";

interface ActionCardsProps {
  classes: Class[];
  onClassCreated: (newClass: Class) => void;
}

export function ActionCards({ classes, onClassCreated }: ActionCardsProps) {
  const [isClassDialogOpen, setIsClassDialogOpen] = useState(false);
  const [isAssignmentDialogOpen, setIsAssignmentDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleCreateClass = (classData: ClassFormData) => {
    const newClass = {
      id: `class-${Date.now()}`,
      ...classData,
    };

    onClassCreated(newClass);

    toast({
      title: "Class created",
      description: `${classData.name} has been created successfully.`,
    });
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card className="group hover:shadow-lg transition-all duration-200 border-2 hover:border-slate-200">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                <BookOpen className="h-6 w-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-slate-900 mb-1">
                  Create Assignment
                </h3>
                <p className="text-sm text-slate-600 mb-4">
                  Design and distribute new assignments to your students
                </p>

                <Link
                  href={{
                    pathname: "/teacher/assignments/create",
                    query: { classes: JSON.stringify(classes) },
                  }}
                >
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    <Plus className="mr-2 h-4 w-4" />
                    New Assignment
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="group hover:shadow-lg transition-all duration-200 border-2 hover:border-slate-200">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-slate-900 mb-1">
                  Create Class
                </h3>
                <p className="text-sm text-slate-600 mb-4">
                  Set up a new class and invite students to join
                </p>
                <Button
                  onClick={() => setIsClassDialogOpen(true)}
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  New Class
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <CreateClassDialog
        open={isClassDialogOpen}
        onOpenChange={setIsClassDialogOpen}
        onCreateClass={handleCreateClass}
      />
    </>
  );
}
