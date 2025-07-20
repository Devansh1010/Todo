"use client"

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useState } from "react";
import { Form, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { DProjectSchema } from "@/schemas/projectValidation";
import { Checkbox } from "@/components/ui/checkbox";

// TODO: Members are pending
interface DProject {
    name: string,
    description: string,
    templetes: ("kanban" | "todo" | "calendar" | "announcements")[];

}

type DProjectType = z.infer<typeof DProjectSchema>;


const CreateProjectPage: React.FC = () => {

    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm<DProjectType>({
        resolver: zodResolver(DProjectSchema),
        defaultValues: {
            name: 'Sample Project',
            description: '',
            templetes: []
        }
    })

    const templateOptions = ["kanban", "todo", "calendar", "announcements"] as const;


    const onSubmit = async (data: DProject) => {
        setIsSubmitting(true)
        try {
            const res = await axios.post(`/api/project/create-project`, data, {
                withCredentials: true
            })

            if (res.data.success) {
                toast.success("Project created Successfully")
            }
        } catch (error) {

            console.log("Error creating project", error)
            toast.error("Faild to create project")
        } finally {
            setIsSubmitting(false)
        }
    }
    return (
        <main className="flex flex-col justify-baseline items-baseline">
            <Dialog>
                <DialogTrigger>Create Project</DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create Form</DialogTitle>
                        <DialogDescription>
                            <div>
                                <Form {...form}>
                                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

                                        <FormField
                                            control={form.control}
                                            name="name"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Project Title</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="UX/UI Design" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="description"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Project Description</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="UX desingner tasks and projects details" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="templetes"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Select Templetes</FormLabel>
                                                    <div className="flex flex-col space-y-2">
                                                        {templateOptions.map((option) => (
                                                            <div
                                                                key={option}
                                                                className="flex items-center space-x-2"
                                                            >
                                                                <Checkbox
                                                                    checked={field.value?.includes(option)}
                                                                    onCheckedChange={(checked) => {
                                                                        if (checked) {
                                                                            field.onChange([...field.value, option]);
                                                                        } else {
                                                                            field.onChange(field.value?.filter((val) => val !== option));
                                                                        }
                                                                    }}
                                                                />
                                                                <FormLabel className="font-normal">{option}</FormLabel>
                                                            </div>
                                                        ))}
                                                    </div>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <Button type="submit">Submit</Button>
                                    </form>
                                </Form>
                            </div>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>

        </main>
    );
};

export default CreateProjectPage;