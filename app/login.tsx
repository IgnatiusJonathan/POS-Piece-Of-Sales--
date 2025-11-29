'use client'
import React, { useState, FormEvent } from 'react';

function Login() {
    const [employeeID, setEmployeeID] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [loginMsg, setLoginMsg] = useState<string>('');
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (!employeeID || !password) {
            setLoginMsg("Please enter both Employee ID and Password.");
            return;
        }
        setLoginMsg(`Attempting login for ID: ${employeeID}...`);
    };
    return (
        <>
            <header className="header">
                <div className="header-left">
                    <h1><span className="brand">TARUMART</span> <span className="tagline">Kasir</span></h1>
                </div>
            </header>
            <main>
                <h1>Enter your account info</h1>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="employeeID">Employee ID: </label>
                    <input
                        type="number"
                        id="employeeID"
                        name="employeeID"
                        min="0"
                        max="9999"
                        required
                        value={employeeID}
                        onChange={(e) => setEmployeeID(e.target.value)}
                    />
                    <br />
                    <label htmlFor="employeePassword">Password: </label>
                    <input
                        type="password"
                        id="employeePassword"
                        name="employeePassword"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <br />
                    <button type="submit">Login</button>
                </form>
                <p id="loginMsg">{loginMsg}</p>
            </main>
        </>
    );
}

export default Login;
