"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "../ui/alert";

interface CreateAssignmentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreateAssignment: (assignmentData: AssignmentFormData) => void;
  classes: ClassOption[];
}

interface ClassOption {
  id: string;
  name: string;
}

export interface AssignmentFormData {
  title: string;
  description: string;
  classId: string;
  dueDate: string;
}

export function CreateAssignmentDialog({
  open,
  onOpenChange,
  onCreateAssignment,
  classes,
}: CreateAssignmentDialogProps) {
  const [formData, setFormData] = useState<AssignmentFormData>({
    title: "",
    description: "",
    classId: "",
    dueDate: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, classId: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      onCreateAssignment(formData);
      setIsSubmitting(false);
      onOpenChange(false);
      setFormData({
        title: "",
        description: "",
        classId: "",
        dueDate: "",
      });
    }, 1000);
  };

  // Get tomorrow's date in YYYY-MM-DD format for the min date attribute
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split("T")[0];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        {classes.length === 0 ? (
          <div className="py-6">
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                You need to create at least one class before creating
                assignments.
              </AlertDescription>
            </Alert>
            <Button
              className="w-full"
              onClick={() => {
                onOpenChange(false);
                // This would ideally trigger the class creation dialog
              }}
            >
              Create a Class First
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <DialogHeader>
              <DialogTitle>Create New Assignment</DialogTitle>
              <DialogDescription>
                Create a new assignment for your students. Select a class and
                set a due date.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="classId">Select Class</Label>
                <Select
                  name="classId"
                  value={formData.classId}
                  onValueChange={handleSelectChange}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a class" />
                  </SelectTrigger>
                  <SelectContent>
                    {classes.map((classOption) => (
                      <SelectItem key={classOption.id} value={classOption.id}>
                        {classOption.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="title">Assignment Title</Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="e.g. Chapter 5 Homework"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dueDate">Due Date</Label>
                <Input
                  id="dueDate"
                  name="dueDate"
                  type="date"
                  min={minDate}
                  value={formData.dueDate}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Instructions</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Provide instructions for this assignment"
                  value={formData.description}
                  onChange={handleChange}
                  rows={3}
                  required
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Creating..." : "Create Assignment"}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
