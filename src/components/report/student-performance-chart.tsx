"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card";
import { Progress } from "@components/ui/progress";

interface PerformanceMetrics {
  confidence: number;
  accuracy: number;
  hintUsage: number;
  completionRate: number;
}

interface StudentPerformanceChartProps {
  metrics: PerformanceMetrics;
}

export function StudentPerformanceChart({
  metrics,
}: StudentPerformanceChartProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getProgressColor = (score: number) => {
    if (score >= 80) return "bg-green-500";
    if (score >= 60) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">
          Performance Overview
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium">Answer Accuracy</p>
              <p className="text-xs text-slate-600">
                Percentage of correct answers
              </p>
            </div>
            <span
              className={`text-2xl font-bold ${getScoreColor(
                metrics.accuracy
              )}`}
            >
              {metrics.accuracy}%
            </span>
          </div>
          <Progress value={metrics.accuracy} className="h-2" />
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium">Hint Independence</p>
              <p className="text-xs text-slate-600">
                Lower usage indicates better understanding
              </p>
            </div>
            <span
              className={`text-2xl font-bold ${getScoreColor(
                100 - metrics.hintUsage
              )}`}
            >
              {metrics.hintUsage}%
            </span>
          </div>
          <Progress value={100 - metrics.hintUsage} className="h-2" />
        </div>
      </CardContent>
    </Card>
  );
}
