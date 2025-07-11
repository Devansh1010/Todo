"use client"
import { useEffect, useState } from "react";
import NavigationPage from "./navigation/page";
import axios from "axios";
import { useSession } from "next-auth/react";

// * Ui Cards
import { Skeleton } from "@/components/ui/skeleton"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Project } from "@/models/Project.model";

import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import Link from "next/link";




const DashboardPage = () => {

  const { data: session } = useSession();

  const [projects, setProjects] = useState<Project[]>([])
  const [isGetingProjects, setIsGettingProjects] = useState(false)

  const [selectedProject, setSelectedProject] = useState('')



  useEffect(() => {
    const getProjects = async () => {
      setIsGettingProjects(true)
      try {
        const res = await axios.post(`/api/project/get-projects`, {}, {
          withCredentials: true,
        })

        setProjects(res.data?.projects)
        console.log(projects)
      } catch (error) {
        return Response.json({
          message: "Error getting projects"
        })
      } finally {
        setIsGettingProjects(false)
      }
    }
    getProjects()
  }, [session])

  return (

    <div>
      <NavigationPage />

      <div className="container w-screen h-full flex flex-col items-center justify-center">

        <div className="max-w-4xl flex flex-col items-center">
          <div className="project-container h-full w-full flex justify-center gap-2">
            {/* Handle testCase if no proects are created */}
            {isGetingProjects ?
              (
                <div className="flex flex-col space-y-3">
                  <Skeleton className="h-[125px] w-[250px] rounded-xl" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-[250px]" />
                    <Skeleton className="h-4 w-[200px]" />
                  </div>
                </div>
              ) :
              (
                projects.map((proj: Project) => (
                  <Card key={proj._id as string} className="w-[450px] h-[260px] flex flex-col justify-between rounded-2xl shadow-md border border-gray-200 bg-white hover:shadow-lg transition-shadow duration-200">
                    <CardHeader className="p-4">
                      <CardTitle className="text-xl font-semibold text-gray-800 tracking-tight text-center">
                        {proj.name}
                      </CardTitle>
                      <CardDescription className="text-sm text-gray-500 mt-1 text-center">
                        {proj.description}
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="px-4 text-sm text-gray-600">
                      {/* dynamic content */}
                    </CardContent>

                    <CardFooter className="flex items-center justify-start p-4 pt-0 mt-auto">
                      <div className="flex -space-x-2">
                        {proj.members.slice(0, 4).map((n: any, i: number) => (
                          <div
                            key={i}
                            className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold text-xs border-2 border-white shadow-sm"
                            title={n.name}
                          >
                            {n.name.slice(0, 2).toUpperCase()}
                          </div>
                        ))}
                        {proj.members.length > 4 && (
                          <div className="h-8 w-8 rounded-full bg-gray-400 flex items-center justify-center text-white text-xs font-semibold border-2 border-white shadow-sm">
                            +{proj.members.length - 4}
                          </div>
                        )}
                      </div>
                    </CardFooter>
                  </Card>

                ))
              )
            }
          </div>


          <Link href=''>
            <Button
              className="m-3 px-6 py-2 bg-blue-600 text-white hover:bg-blue-700 hover:shadow-md transition duration-200 ease-in-out rounded-lg font-semibold flex items-center gap-2"
            >
              <PlusCircle className="w-4 h-4" />
              Create Project
            </Button>
          </Link>

        </div>
      </div>
    </div>

  )

};

export default DashboardPage;