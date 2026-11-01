import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "./database";

function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const navigate = useNavigate();

    // Redirect to login shortly after a successful registration.
    // The cleanup cancels the timer if the user leaves the page first.
    useEffect(() => {
        if (!success) return;
        const timerId = setTimeout(() => navigate("/"), 1500);
        return () => clearTimeout(timerId);
    }, [success, navigate]);

    const handleRegister = (e) => {
        e.preventDefault();
        setError("");

        const cleanName = username.trim();
        if (!cleanName) {
            setError("Username cannot be empty");
            return;
        }
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        const result = registerUser(cleanName, password);
        if (!result.success) {
            setError(result.message);
            return;
        }

        setSuccess("Account created! Redirecting to login...");
    };

    return (
        <div className="auth-page">
            <div className="auth-card">
                <h2 className="auth-title">Create Account</h2>
                <p className="auth-subtitle">Sign up to start taking quizzes.</p>

                <form onSubmit={handleRegister} className="auth-form">
                    <label htmlFor="reg-username">Username</label>
                    <input
                        id="reg-username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Choose a username"
                        autoComplete="username"
                        required
                    />

                    <label htmlFor="reg-password">Password</label>
                    <input
                        id="reg-password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Choose a password"
                        autoComplete="new-password"
                        required
                    />

                    <label htmlFor="reg-confirm">Confirm Password</label>
                    <input
                        id="reg-confirm"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Re-enter password"
                        autoComplete="new-password"
                        required
                    />

                    {error && <p className="error-text">{error}</p>}
                    {success && <p className="success-text">{success}</p>}

                    <button type="submit" className="btn full-width" disabled={!!success}>
                        Register
                    </button>
                </form>

                <p className="auth-footer">
                    Already have an account? <Link to="/">Login here</Link>
                </p>
            </div>
        </div>
    );
}

export default Register;
