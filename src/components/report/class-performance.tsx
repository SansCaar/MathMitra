"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card";
import { Badge } from "@components/ui/badge";
import { Progress } from "@components/ui/progress";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface ClassPerformanceData {
  className: string;
  subject: string;
  totalAssignments: number;
  completedAssignments: number;
  averageScore: number;
  trend: "up" | "down" | "stable";
  lastActivity: string;
  strengths: string[];
  improvements: string[];
}

interface ClassPerformanceProps {
  classData: ClassPerformanceData[];
}

export function ClassPerformance({ classData }: ClassPerformanceProps) {
  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-green-600" />;
      case "down":
        return <TrendingDown className="h-4 w-4 text-red-600" />;
      default:
        return <Minus className="h-4 w-4 text-slate-600" />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case "up":
        return "text-green-600";
      case "down":
        return "text-red-600";
      default:
        return "text-slate-600";
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">
          Performance by Class
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {classData.map((classInfo, index) => (
            <div key={index} className="border rounded-lg p-4 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-slate-900">
                    {classInfo.className}
                  </h3>
                  <p className="text-sm text-slate-600">{classInfo.subject}</p>
                </div>
                <div className="flex items-center space-x-2"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">
                      Assignment Completion
                    </span>
                    <span className="font-medium">
                      {classInfo.completedAssignments}/
                      {classInfo.totalAssignments}
                    </span>
                  </div>
                  <Progress
                    value={
                      (classInfo.completedAssignments /
                        classInfo.totalAssignments) *
                      100
                    }
                    className="h-2"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Average Score</span>
                    <span
                      className={`font-medium ${getScoreColor(
                        classInfo.averageScore
                      )}`}
                    >
                      {classInfo.averageScore}%
                    </span>
                  </div>
                  <Progress value={classInfo.averageScore} className="h-2" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-medium text-green-700 mb-2">Strengths</p>
                  <div className="space-y-1">
                    {classInfo.strengths.map((strength, idx) => (
                      <Badge
                        key={idx}
                        variant="secondary"
                        className="bg-green-100 text-green-800 mr-1 mb-1"
                      >
                        {strength}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
