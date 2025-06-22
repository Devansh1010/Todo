'use client';
import React from 'react';



const SignInPage: React.FC = () => {
    return (
        <main className="flex min-h-screen items-center justify-center bg-gray-50">
            <section className="w-full max-w-md p-8 bg-white rounded shadow">
                <h1 className="text-2xl font-bold mb-6 text-center">Sign In</h1>
                <form className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            required
                            className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        Sign In
                    </button>
                </form>
            </section>
        </main>
    );
};

export default SignInPage;