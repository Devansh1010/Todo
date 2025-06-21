"use client"
import React from 'react';


const RegisterPage: React.FC = () => {
    const [isLoading, setIsLoading] = React.useState(false);
    const [username, setUsername] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');

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
    return (
        <main>
            <h1>Register</h1>
            {/* Registration form will go here */}
        </main>
    );
};

export default RegisterPage;