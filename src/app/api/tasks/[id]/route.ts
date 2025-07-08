import { type NextRequest, NextResponse } from "next/server"
import { dbConnect } from "@/lib/dbConnect"
import TaskModel from "@/models/Task.model"

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await dbConnect()
    const body = await request.json()

    const task = await TaskModel.findByIdAndUpdate(params.id, { ...body, updatedAt: new Date() }, { new: true })

    if (!task) {
      return NextResponse.json({ success: false, message: "Task not found" }, { status: 404 })
    }

    return NextResponse.json({ task })
  } catch (error) {
    console.error("Error updating task:", error)
    return NextResponse.json({ success: false, message: "Failed to update task" }, { status: 500 })
  }
}
