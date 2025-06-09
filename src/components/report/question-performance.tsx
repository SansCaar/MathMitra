"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card";
import { Badge } from "@components/ui/badge";
import { Progress } from "@components/ui/progress";
import { CheckCircle, XCircle, HelpCircle, Clock } from "lucide-react";

interface QuestionData {
  id: string;
  question: string;
  subject: string;
  difficulty: "Easy" | "Medium" | "Hard";
  isCorrect: boolean;
  confidenceLevel: number;
  hintsUsed: number;
  timeSpent: number; // in seconds
  attempts: number;
}

interface QuestionPerformanceProps {
  questions: QuestionData[];
}

export function QuestionPerformance({ questions }: QuestionPerformanceProps) {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-100 text-green-800";
      case "Medium":
        return "bg-yellow-100 text-yellow-800";
      case "Hard":
        return "bg-red-100 text-red-800";
      default:
        return "bg-slate-100 text-slate-800";
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">
          Question-by-Question Analysis
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {questions.map((question, index) => (
            <div key={question.id} className="border rounded-lg p-4 space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-sm font-medium text-slate-600">
                      Q{index + 1}
                    </span>
                    <Badge
                      className={getDifficultyColor(question.difficulty)}
                      variant="secondary"
                    >
                      {question.difficulty}
                    </Badge>
                    <Badge variant="outline">{question.subject}</Badge>
                  </div>
                  <p className="text-sm text-slate-900 mb-2">
                    {question.question}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  {question.isCorrect ? (
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-600" />
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div className="space-y-1">
                  <p className="text-slate-600">Confidence</p>
                  <div className="flex items-center space-x-2">
                    <Progress
                      value={question.confidenceLevel}
                      className="h-2 flex-1"
                    />
                    <span className="text-xs font-medium">
                      {question.confidenceLevel}%
                    </span>
                  </div>
                </div>

                <div className="space-y-1">
                  <p className="text-slate-600">Hints Used</p>
                  <div className="flex items-center space-x-1">
                    <HelpCircle className="h-4 w-4 text-blue-500" />
                    <span className="font-medium">{question.hintsUsed}</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <p className="text-slate-600">Time Spent</p>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4 text-slate-500" />
                    <span className="font-medium">
                      {formatTime(question.timeSpent)}
                    </span>
                  </div>
                </div>

                <div className="space-y-1">
                  <p className="text-slate-600">Attempts</p>
                  <span className="font-medium">{question.attempts}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
