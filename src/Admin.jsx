import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { logoutUser, getAllUsers, getAllResults } from "./database";

function Admin() {
    const navigate = useNavigate();
    // Lazy initial state: localStorage is read once, on the first render.
    // (RequireAuth guarantees an admin is logged in before this page renders.)
    const [users] = useState(getAllUsers);
    const [results] = useState(getAllResults);
    const [activeTab, setActiveTab] = useState("users"); // "users" or "results"

    const handleLogout = () => {
        logoutUser();
        navigate("/");
    };

    // Quick stats using array methods
    const totalUsers = users.filter((u) => u.role === "user").length;
    const totalAttempts = results.length;
    const avgScore =
        results.length > 0
            ? Math.round(
                (results.reduce((sum, r) => sum + r.score / r.total, 0) / results.length) * 100
            )
            : 0;

    return (
        <div className="dashboard-page">
            <div className="dashboard-header">
                <div>
                    <h2>Admin Panel</h2>
                    <p className="subtitle">Manage users and monitor quiz activity.</p>
                </div>
                <button className="btn outline-btn" onClick={handleLogout}>
                    Logout
                </button>
            </div>

            {/* Stat cards */}
            <div className="admin-stats">
                <div className="stat-card">
                    <h3>{totalUsers}</h3>
                    <p>Registered Users</p>
                </div>
                <div className="stat-card">
                    <h3>{totalAttempts}</h3>
                    <p>Quiz Attempts</p>
                </div>
                <div className="stat-card">
                    <h3>{avgScore}%</h3>
                    <p>Average Score</p>
                </div>
            </div>

            {/* Tabs to switch between Users and Results tables */}
            <div className="admin-tabs">
                <button
                    className={`tab-btn ${activeTab === "users" ? "active" : ""}`}
                    onClick={() => setActiveTab("users")}
                >
                    Users
                </button>
                <button
                    className={`tab-btn ${activeTab === "results" ? "active" : ""}`}
                    onClick={() => setActiveTab("results")}
                >
                    Quiz Results
                </button>
            </div>

            {activeTab === "users" ? (
                <table className="history-table">
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((u) => (
                            <tr key={u.username}>
                                <td>{u.username}</td>
                                <td className="capitalize">{u.role}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <table className="history-table">
                    <thead>
                        <tr>
                            <th>User</th>
                            <th>Level</th>
                            <th>Set</th>
                            <th>Score</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {results.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="empty-text">No attempts recorded yet.</td>
                            </tr>
                        ) : (
                            results.map((r, index) => (
                                <tr key={index}>
                                    <td>{r.username}</td>
                                    <td className="capitalize">{r.level}</td>
                                    <td>{r.set}</td>
                                    <td>{r.score}/{r.total}</td>
                                    <td>{r.date}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default Admin;