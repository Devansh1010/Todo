'use client'

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import { Project } from '@/models/Project.model';
import { Types } from 'mongoose';

// Shadcn
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from '@/components/ui/button';

const ProjectDashboardPage: React.FC = () => {
    const param = useParams();

    const projectId = param.projcetId;

    const [project, setProject] = useState<Partial<Project>>({
        name: '',
        description: '',
        createdBy: new Types.ObjectId(),
        members: [],
        invitedUser: [],
        tasks: []
    });

    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchProject = async () => {
            try {
                setLoading(true);
                console.log("req sending")
                const res = await axios.post(`/api/project/get-project-by-id`, { projectId },
                    { withCredentials: true }
                );
                setProject(res.data.project[0]);
                console.log(res.data.project)
            } catch (error) {
                console.error("Failed to fetch project", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProject();
    }, [projectId]);

    return (
        <div className="max-w-4xl mx-auto flex flex-col">

            {loading ? (
                <div className='mx-auto flex flex-col items-center justify-center'>
                    <Skeleton className="h-10 w-100 m-2 bg-gray-200" />
                    <Skeleton className="h-8 w-120 m-2 bg-gray-200" />
                </div>

            ) : (
                < div className='flex flex-col justify-center items-center mx-auto'>
                    <div >
                        <h1 className="text-4xl text-blue-700 font-bold text-center sm:text-5xl md:text-3xl">{project.name}</h1>
                    </div>
                    <div>
                        <p className="text-gray-600  hidden text-base p-5 text-center sm:text-xl md:text-sm md:block">
                            {project.description || "No description provided."}
                        </p>
                    </div>
                </div>
            )}

            <Dialog>
                <DialogTrigger>Add Templets</DialogTrigger>
                <DialogContent className='h-[40rem] w-[80rem]'>
                    <DialogHeader>
                        <DialogTitle className='text-center text-blue-600 font-bold'>Todos</DialogTitle>
                        <DialogDescription>
                            This action cannot be undone. This will permanently delete your account
                            and remove your data from our servers.
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>


        </div >
    );
};

export default ProjectDashboardPage;
