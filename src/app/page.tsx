import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckSquare, Users, Calendar, BarChart3 } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Task Management System</h1>
          <p className="text-xl text-gray-600 mb-8">Organize, track, and complete your tasks with ease</p>
          <Link href="/tasks">
            <Button size="lg" className="px-8 py-3">
              Get Started
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card>
            <CardHeader className="text-center">
              <CheckSquare className="h-12 w-12 mx-auto text-blue-600 mb-2" />
              <CardTitle>Task Creation</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-center">
                Create detailed tasks with priorities, due dates, and subtasks
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="text-center">
              <Users className="h-12 w-12 mx-auto text-green-600 mb-2" />
              <CardTitle>Team Assignment</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-center">Assign tasks to team members with specific roles</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="text-center">
              <Calendar className="h-12 w-12 mx-auto text-purple-600 mb-2" />
              <CardTitle>Due Dates</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-center">Set and track due dates to stay on schedule</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="text-center">
              <BarChart3 className="h-12 w-12 mx-auto text-orange-600 mb-2" />
              <CardTitle>Progress Tracking</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-center">Monitor task progress with status updates</p>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <Link href="/tasks">
            <Button variant="outline" size="lg">
              View All Tasks
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
