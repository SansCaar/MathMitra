"use client";

import { useState } from "react";
import { Button } from "@components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@components/ui/dialog";
import { Textarea } from "@components/ui/textarea";
import { Label } from "@components/ui/label";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
interface PracticeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function PracticeDialog({ open, onOpenChange }: PracticeDialogProps) {
  const [question, setQuestion] = useState("");
  const [solution, setSolution] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const handleSubmit = async () => {
    if (!question.trim()) {
      alert("Please enter a question");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("/api/questions/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: question.trim(),
          solution: solution.trim(),
        }),
      });
      let data = await response.json();
      if (!response.ok) {
        throw new Error("Failed to create question");
      }

      // Clear form and close dialog on success
      setQuestion("");
      setSolution("");

      router.push(`${data.data.id}/playground`);
      // onOpenChange(false);

      // Show success message
    } catch (err) {
      console.error("Error creating question:", err);
      alert("Failed to create question. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900">
            Create Practice Question
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <Label
              htmlFor="question"
              className="text-sm font-medium text-gray-700"
            >
              Question (LaTeX Supported)
            </Label>
            <Textarea
              id="question"
              placeholder="Enter your practice question here..."
              className="min-h-[120px] resize-none rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500"
              onChange={(e) => setQuestion(e.target.value)}
              disabled={isLoading}
            />
          </div>
          <div className="space-y-2">
            <Label
              htmlFor="solution"
              className="text-sm font-medium text-gray-700"
            >
              Sample Solution (Optional)
            </Label>
            <Textarea
              id="solution"
              placeholder="Enter the sample solution here..."
              className="min-h-[120px] resize-none rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500"
              onChange={(e) => setSolution(e.target.value)}
              disabled={isLoading}
            />
          </div>
          <div className="flex justify-end">
            <Button
              onClick={handleSubmit}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl px-6"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Creating...
                </>
              ) : (
                "Create Practice"
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
