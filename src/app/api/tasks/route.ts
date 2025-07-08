import { type NextRequest, NextResponse } from "next/server"
import mongoose from "mongoose"
import { dbConnect } from "@/lib/dbConnect"
import TaskModel from "@/models/Task.model"

export async function GET() {
  try {
    await dbConnect()
    const tasks = await TaskModel.find({}).sort({ createdAt: -1 })
    return NextResponse.json({ tasks })
  } catch (error) {
    console.error("Error fetching tasks:", error)
    return NextResponse.json({ error: "Failed to fetch tasks" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect()
    const body = await request.json()

    
    const taskData = {
      ...body,
      createdBy: body.createdBy,
      workspaceId: body.workspaceId || new mongoose.Types.ObjectId(),
      dueDate: body.dueDate,
    }

    const task = new TaskModel(taskData)
    await task.save()

    return NextResponse.json({success: true, message: "Task created",  task }, { status: 201 })
  } catch (error) {
    console.error("Error creating task:", error)
    return NextResponse.json({success: false, message: "faild to create task", error: "Failed to create task" }, { status: 500 })
  }
}
