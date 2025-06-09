import { Suspense } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card"
import { Badge } from "@\components/ui/badge"
import { Button } from "@components/ui/button"
import {
  Play,
  Users,
  BookOpen,
  Plus,
  Calendar,
  Clock,
  CheckCircle,
  Code,
  FileText,
  Target,
  TrendingUp,
  User,
  Filter,
} from "lucide-react"
import { JoinClassDialog } from "@components/student/join-class-dialog"
import { DashboardSkeleton } from "@components/student/dashboard-skeleton"

// Types
interface StudentProfile {
  id: string
  name: string
  email: string
}

interface ClassData {
  id: string
  name: string
  code: string
  subject: string
  teacher: string
  studentCount: number
  assignmentCount: number
}

interface Assignment {
  id: string
  title: string
  subject: string
  className: string
  classCode: string
  dueDate: string
  createdDate: string
  status: "active" | "completed" | "overdue"
  questionCount: number
  completedQuestions: number
}

interface PracticeSession {
  id: string
  title: string
  questionCount: number
  lastAccessed: string
  progress: number
}

// Server-side data fetching functions
async function getStudentProfile(): Promise<StudentProfile> {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 100))
  return {
    id: "1",
    name: "Alex",
    email: "alex@example.com",
  }
}

async function getClasses(): Promise<ClassData[]> {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 150))
  return [
    {
      id: "1",
      name: "Mathematics - Algebra Basics",
      code: "24640",
      subject: "Mathematics",
      teacher: "Ms. Johnson",
      studentCount: 23,
      assignmentCount: 5,
    },
    {
      id: "2",
      name: "Science - Physics 101",
      code: "35821",
      subject: "Science",
      teacher: "Mr. Smith",
      studentCount: 19,
      assignmentCount: 3,
    },
  ]
}

async function getAssignments(): Promise<Assignment[]> {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 200))
  return [
    {
      id: "1",
      title: "Quadratic Equations Practice",
      subject: "Mathematics",
      className: "Mathematics - Algebra Basics",
      classCode: "24640",
      dueDate: "Jan 20, 2024",
      createdDate: "Jan 8, 2024",
      status: "active",
      questionCount: 15,
      completedQuestions: 8,
    },
    {
      id: "2",
      title: "Newton's Laws Quiz",
      subject: "Science",
      className: "Science - Physics 101",
      classCode: "35821",
      dueDate: "Jan 18, 2024",
      createdDate: "Jan 5, 2024",
      status: "active",
      questionCount: 10,
      completedQuestions: 10,
    },
    {
      id: "3",
      title: "Linear Functions Test",
      subject: "Mathematics",
      className: "Mathematics - Algebra Basics",
      classCode: "24640",
      dueDate: "Jan 15, 2024",
      createdDate: "Jan 2, 2024",
      status: "completed",
      questionCount: 12,
      completedQuestions: 12,
    },
  ]
}

async function getPracticeSessions(): Promise<PracticeSession[]> {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 120))
  return [
    {
      id: "1",
      title: "Algebra Practice Set",
      questionCount: 25,
      lastAccessed: "2 hours ago",
      progress: 68,
    },
    {
      id: "2",
      title: "Physics Problems",
      questionCount: 18,
      lastAccessed: "1 day ago",
      progress: 45,
    },
  ]
}

// Helper functions
function getStatusColor(status: string) {
  switch (status) {
    case "active":
      return "bg-blue-100 text-blue-800"
    case "completed":
      return "bg-green-100 text-green-800"
    case "overdue":
      return "bg-red-100 text-red-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

function getProgressPercentage(completed: number, total: number) {
  return Math.round((completed / total) * 100)
}

// Main Dashboard Component
async function StudentDashboard() {
  // Fetch all data in parallel
  const [studentProfile, classes, assignments, practiceSessions] = await Promise.all([
    getStudentProfile(),
    getClasses(),
    getAssignments(),
    getPracticeSessions(),
  ])

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-8">
        {/* Header Section */}
        <div className="space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 flex items-center gap-3">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-primary rounded-xl flex items-center justify-center">
              <User className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </div>
            Welcome back, {studentProfile.name}! 👋
          </h1>
          <p className="text-base md:text-lg text-gray-600">Here's what's happening with your studies today.</p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Practice Playground */}
          <Card className="border-0 shadow-lg rounded-2xl overflow-hidden hover:shadow-xl transition-shadow">
            <CardContent className="p-6 md:p-8">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                  <Play className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Practice Playground</h3>
                  <p className="text-gray-600">Create and practice with your own questions</p>
                </div>
              </div>
              <Button className="w-full bg-primary hover:bg-blue-600 text-white font-semibold rounded-xl h-12">
                <Code className="w-5 h-5 mr-2" />
                Start Practicing
              </Button>
            </CardContent>
          </Card>

          {/* Join Class */}
          <Card className="border-0 shadow-lg rounded-2xl overflow-hidden hover:shadow-xl transition-shadow">
            <CardContent className="p-6 md:p-8">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-success rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Join Class</h3>
                  <p className="text-gray-600">Enter a class code to join a new class</p>
                </div>
              </div>
              <JoinClassDialog />
            </CardContent>
          </Card>

          {/* Study Stats */}
          <Card className="border-0 shadow-lg rounded-2xl overflow-hidden hover:shadow-xl transition-shadow">
            <CardContent className="p-6 md:p-8">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Study Progress</h3>
                  <p className="text-gray-600">Track your learning journey</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">This Week</span>
                  <span className="font-semibold">12 questions solved</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-purple-500 h-2 rounded-full" style={{ width: "75%" }}></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* My Classes Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">My Classes</h2>
            <Button variant="outline" size="sm" className="rounded-xl">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {classes.map((classItem) => (
              <Card key={classItem.id} className="border-0 shadow-lg rounded-2xl overflow-hidden">
                <CardHeader className="bg-white border-b border-gray-100 pb-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Badge className="bg-blue-100 text-blue-800 mb-2">{classItem.subject}</Badge>
                      <CardTitle className="text-lg font-bold text-gray-900">{classItem.name}</CardTitle>
                      <p className="text-gray-600 text-sm">Teacher: {classItem.teacher}</p>
                    </div>
                    <Badge className="bg-primary text-white">Code: {classItem.code}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-6 bg-white">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>{classItem.studentCount} students</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <FileText className="w-4 h-4" />
                        <span>{classItem.assignmentCount} assignments</span>
                      </div>
                    </div>
                  </div>
                  <Button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold rounded-xl">
                    <BookOpen className="w-4 h-4 mr-2" />
                    View Assignments
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Recent Assignments Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Recent Assignments</h2>
            <Button variant="outline" size="sm" className="rounded-xl">
              View All
            </Button>
          </div>

          <div className="space-y-4">
            {assignments.map((assignment) => (
              <Card key={assignment.id} className="border-0 shadow-lg rounded-2xl overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-bold text-gray-900">{assignment.title}</h3>
                        <Badge className={getStatusColor(assignment.status)}>
                          {assignment.status.charAt(0).toUpperCase() + assignment.status.slice(1)}
                        </Badge>
                      </div>
                      <p className="text-gray-600 mb-3">{assignment.className}</p>
                      <div className="flex items-center gap-6 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>Due {assignment.dueDate}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Target className="w-4 h-4" />
                          <span>
                            {assignment.completedQuestions}/{assignment.questionCount} questions
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>Created {assignment.createdDate}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="text-sm font-medium text-gray-900">
                          {getProgressPercentage(assignment.completedQuestions, assignment.questionCount)}% Complete
                        </div>
                        <div className="w-24 bg-gray-200 rounded-full h-2 mt-1">
                          <div
                            className="bg-primary h-2 rounded-full"
                            style={{
                              width: `${getProgressPercentage(assignment.completedQuestions, assignment.questionCount)}%`,
                            }}
                          ></div>
                        </div>
                      </div>
                      <Button
                        className={`rounded-xl font-semibold ${
                          assignment.status === "completed"
                            ? "bg-green-100 hover:bg-green-200 text-green-800"
                            : "bg-primary hover:bg-blue-600 text-white"
                        }`}
                      >
                        {assignment.status === "completed" ? (
                          <>
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Review
                          </>
                        ) : (
                          <>
                            <Play className="w-4 h-4 mr-2" />
                            Continue
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Practice Sessions Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">My Practice Sessions</h2>
            <Button className="bg-primary hover:bg-blue-600 text-white rounded-xl">
              <Plus className="w-4 h-4 mr-2" />
              New Session
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {practiceSessions.map((session) => (
              <Card key={session.id} className="border-0 shadow-lg rounded-2xl overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{session.title}</h3>
                      <p className="text-gray-600 text-sm">{session.questionCount} questions</p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-gray-900">{session.progress}% Complete</div>
                      <div className="text-xs text-gray-500">Last: {session.lastAccessed}</div>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                    <div className="bg-primary h-2 rounded-full" style={{ width: `${session.progress}%` }}></div>
                  </div>
                  <Button className="w-full bg-primary hover:bg-blue-600 text-white font-semibold rounded-xl">
                    <Play className="w-4 h-4 mr-2" />
                    Continue Practice
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// Main Page Component with Suspense
export default function DashboardPage() {
  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <StudentDashboard />
    </Suspense>
  )
}

export const metadata = {
  title: "Student Dashboard | Learning Platform",
  description: "View your classes, assignments, and practice sessions",
}
