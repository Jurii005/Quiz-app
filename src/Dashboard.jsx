import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser, logoutUser, getResultsForUser } from "./database";

function Dashboard() {
    const navigate = useNavigate();

    // Lazy initial state: localStorage is read once, on the first render.
    // (RequireAuth guarantees a logged-in user before this page renders.)
    const [user] = useState(getCurrentUser);
    const [pastResults] = useState(() => getResultsForUser(user.username));

    const handleLogout = () => {
        logoutUser();
        navigate("/");
    };

    return (
        <div className="dashboard-page">
            <div className="dashboard-header">
                <div>
                    <h2>Welcome, {user.username} 👋</h2>
                    <p className="subtitle">Ready to test your knowledge today?</p>
                </div>
                <button className="btn outline-btn" onClick={handleLogout}>
                    Logout
                </button>
            </div>

            <div className="dashboard-actions">
                <div className="dashboard-card highlight" onClick={() => navigate("/level")}>
                    <h3>Start New Quiz</h3>
                    <p>Pick a difficulty level and set to begin.</p>
                </div>
            </div>

            <div className="dashboard-history">
                <h3>Your Past Attempts</h3>
                {pastResults.length === 0 ? (
                    <p className="empty-text">No attempts yet. Start your first quiz!</p>
                ) : (
                    <table className="history-table">
                        <thead>
                            <tr>
                                <th>Level</th>
                                <th>Set</th>
                                <th>Score</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pastResults.map((result, index) => (
                                <tr key={index}>
                                    <td className="capitalize">{result.level}</td>
                                    <td>{result.set}</td>
                                    <td>{result.score}/{result.total}</td>
                                    <td>{result.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}

export default Dashboard;
