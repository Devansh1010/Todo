"use client"
import { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { Separator } from "@/components/ui/separator"

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

import { useRouter } from "next/navigation";
import CreateProjectPage from "./project/create-project/page";
import AssignmentsPage from "./project/assignments/page";




const DashboardPage = () => {

  const { data: session } = useSession();

  const [projects, setProjects] = useState<Project[]>([])
  const [isGetingProjects, setIsGettingProjects] = useState(false)
  const router = useRouter()

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

    <div className="mx-10 md:mx-20 md:max-w-7xl max-w-400">
      <div className="container md:h-full flex flex-col items-center justify-center mx-auto">
        <div className="w-full flex flex-col items-center justify-center">
          <div className="project-container md:h-full w-full md:flex justify-center gap-2 flex-wrap items-center ">
            {/* Handle testCase if no proects are created */}
            {isGetingProjects ?
              (
                <div className="flex flex-col space-y-3 absolute top-20">
                  <Skeleton className="md:h-[250px] md:w-[500px] rounded-xl h-[125px] w-[250px]" />
                  <div className="space-y-2">
                  </div>
                </div>
              ) :
              (
                projects.map((proj: Project) => (
                  <Card key={proj._id as string} onClick={() => router.replace(`/dashboard/project/${proj._id as string}`)} className="md:w-[450px] md:h-[260px] w-[300px] flex flex-col justify-between rounded-2xl shadow-md border border-gray-200 bg-white hover:shadow-lg transition-shadow duration-200 absolute top-20">
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


          <div className="flex items-end justify-center md:min-h-[20rem] md:p-5 min-h-[20rem] ">
            <CreateProjectPage />
            
          </div>
          <Separator className="md:min-w-[70rem] min-w-[15rem] m-5" />


          <div className="w-full flex gap-4 flex-col md:flex-row justify-center items-center mx-auto">
            <div className="md:w-1/2  border border-gray-700 rounded-xl p-4 shadow-md md:h-[25rem] h-[20rem] w-[20rem] mx-auto m-5">
              <p className="text-white">Left Card</p>
            </div>

            <div className="md:w-1/2 border border-gray-700 rounded-xl p-4 shadow-md md:h-[25rem] h-[20rem] w-[20rem] mx-auto flex">
              <AssignmentsPage />
            </div>
          </div>

        </div>
      </div>
    </div>

  )

};

export default DashboardPage;