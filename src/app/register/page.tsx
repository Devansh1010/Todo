"use client"
import React from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { signUpValidation } from '@/schemas/signUpValidation';


const RegisterPage: React.FC = () => {
    const [username, setUsername] = React.useState('');
    const [isUsernameChecking, setIsUsernameChecking] = React.useState(false);
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);
    const [isSubmiting, setIsSubmiting] = React.useState(false);

    const router = useRouter();

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ username, email, password })
            });

            const data = await res.json();
            console.log("Response data:", data);

            if (data.success) {
                // Handle successful registration (e.g., redirect to login page)
                console.log("Registration successful:", data.message);
            } else {
                // Handle registration error
                console.error("Registration failed:", data.message);
            }

            setIsLoading(false);

        } catch (error) {
            console.error("Registration error:", error);

        }
    }

    const form = useForm<z.infer<typeof signUpValidation>>({
        resolver: zodResolver(signUpValidation),
        defaultValues: {
            username: '',
            email: '',
            password: '',
        }
    })
    return (
        <main>
            <h1>Register</h1>
            
        </main>
    );
};

export default RegisterPage;