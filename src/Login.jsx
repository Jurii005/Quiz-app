import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "./database";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault(); // stops the page from refreshing on form submit
        const result = loginUser(username.trim(), password);

        if (!result.success) {
            setError(result.message);
            return;
        }

        // Redirect based on role
        navigate(result.user.role === "admin" ? "/admin" : "/dashboard");
    };

    return (
        <div className="auth-page">
            <div className="auth-card">
                <h2 className="auth-title">Sign In</h2>
                <p className="auth-subtitle">Welcome back! Please login to continue.</p>

                <form onSubmit={handleLogin} className="auth-form">
                    <label htmlFor="login-username">Username</label>
                    <input
                        id="login-username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter your username"
                        autoComplete="username"
                        required
                    />

                    <label htmlFor="login-password">Password</label>
                    <input
                        id="login-password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        autoComplete="current-password"
                        required
                    />

                    {error && <p className="error-text">{error}</p>}

                    <button type="submit" className="btn full-width">
                        Login
                    </button>
                </form>

                <p className="auth-footer">
                    Don&apos;t have an account? <Link to="/register">Register here</Link>
                </p>
                <p className="auth-hint">
                    Demo Admin: admin / admin123 &nbsp;|&nbsp; Demo User: testuser / test123
                </p>
            </div>
        </div>
    );
}

export default Login;
