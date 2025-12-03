'use client';

import React, { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

function Login() {
    const router = useRouter();
    const [employeeID, setEmployeeID] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [loginMsg, setLoginMsg] = useState<string>('');

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        
        if (!employeeID || !password) {
            setLoginMsg("Please enter both Employee ID and Password.");
            return;
        }
        setLoginMsg(`Logging in...`);
        const sessionData = {
            id: employeeID,
            password: '####',
            loginTime: new Date().toISOString(),
            status: 'Active'
        };
        
        localStorage.setItem('currentSession', JSON.stringify(sessionData));
        setTimeout(() => {
            router.push('/dashboard');
        }, 500);
    };

    return (
        <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
            
            <header className="header">
                <div className="header-left">
                    <h1><span className="brand">TARUMART</span> <span className="tagline">Kasir</span></h1>
                </div>
            </header>

            <main className="flex flex-col items-center justify-center min-h-[calc(100vh-60px)] p-4">
                <div className="bg-white border border-gray-200 p-8 rounded-xl shadow-md w-full max-w-md">
                    <h1 className="text-2xl font-bold text-center mb-6 text-gray-900">Employee Login</h1>
                    
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-1">
                            <label htmlFor="employeeID" className="text-xs font-bold uppercase text-gray-500">Employee ID</label>
                            <input
                                type="text"
                                id="employeeID"
                                name="employeeID"
                                className="w-full bg-white border border-gray-300 rounded p-2 text-sm text-gray-900 outline-none focus:border-[var(--maroon)]"
                                required
                                value={employeeID}
                                onChange={(e) => setEmployeeID(e.target.value)}
                            />
                        </div>

                        <div className="space-y-1">
                            <label htmlFor="employeePassword" className="text-xs font-bold uppercase text-gray-500">Password</label>
                            <input
                                type="password"
                                id="employeePassword"
                                name="employeePassword"
                                className="w-full bg-white border border-gray-300 rounded p-2 text-sm text-gray-900 outline-none focus:border-[var(--maroon)]"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <button 
                            type="submit" 
                            className="w-full bg-[var(--maroon)] text-white font-bold py-3 rounded-lg hover:bg-[var(--hover)] transition-opacity mt-4 shadow-md"
                        >
                            Login
                        </button>
                    </form>

                    {loginMsg && (
                        <p className="mt-4 text-center text-sm text-red-600 font-medium animate-pulse">
                            {loginMsg}
                        </p>
                    )}
                </div>
            </main>
        </div>
    );
}

export default Login;