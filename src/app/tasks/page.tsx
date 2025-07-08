"use client"

import { useState } from "react"
import { TaskForm } from "@/components/task-form"
import { TaskList } from "@/components/task-list"

export default function TasksPage() {
  const [refreshTrigger, setRefreshTrigger] = useState(0)

  const handleTaskCreated = () => {
    setRefreshTrigger((prev) => prev + 1)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Task Management</h1>
          <p className="text-gray-600">Create and manage your tasks efficiently</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <TaskForm onTaskCreated={handleTaskCreated} />
          </div>

          <div className="lg:col-span-2">
            <TaskList refreshTrigger={refreshTrigger} />
          </div>
        </div>
      </div>
    </div>
  )
}
