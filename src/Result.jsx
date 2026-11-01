import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { getCurrentUser, getLastAttempt } from "./database";

function Result() {
    const navigate = useNavigate();
    const [attempt] = useState(getLastAttempt);
    const user = getCurrentUser();

    // No attempt yet, or it belongs to someone else -> back to dashboard
    if (!attempt || !user || attempt.username !== user.username) {
        return <Navigate to="/dashboard" replace />;
    }

    const percentage = Math.round((attempt.score / attempt.total) * 100);

    return (
        <div className="page-container">
            <div className="card center-text">
                <h2>Quiz Completed!</h2>
                <p className="capitalize">{attempt.level} Level - {attempt.set}</p>

                <div className="score-circle">
                    <span>{percentage}%</span>
                </div>

                <p className="score-text">
                    You scored {attempt.score} out of {attempt.total}
                </p>

                <div className="result-buttons">
                    <button className="btn" onClick={() => navigate("/review")}>
                        Review Answers
                    </button>
                    <button className="btn outline-btn" onClick={() => navigate("/dashboard")}>
                        Back to Dashboard
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Result;
