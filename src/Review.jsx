import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { getCurrentUser, getLastAttempt } from "./database";

function Review() {
    const navigate = useNavigate();
    const [attempt] = useState(getLastAttempt);
    const user = getCurrentUser();

    // No attempt yet, or it belongs to someone else -> back to dashboard
    if (!attempt || !user || attempt.username !== user.username) {
        return <Navigate to="/dashboard" replace />;
    }

    return (
        <div className="page-container">
            <h2 className="page-title">Answer Review</h2>
            <p className="page-subtitle capitalize">{attempt.level} Level - {attempt.set}</p>

            <div className="review-list">
                {attempt.details.map((item, index) => (
                    <div
                        key={index}
                        className={`review-card ${item.isCorrect ? "correct" : "incorrect"}`}
                    >
                        <p className="review-question">
                            {index + 1}. {item.question}
                        </p>

                        {/* Show every option, highlighting correct/wrong ones */}
                        <div className="review-options">
                            {item.options.map((opt) => {
                                let className = "review-option";
                                if (opt === item.correctAnswer) className += " correct-answer";
                                if (opt === item.userAnswer && !item.isCorrect) className += " wrong-answer";

                                return (
                                    <div key={opt} className={className}>
                                        {opt}
                                    </div>
                                );
                            })}
                        </div>

                        <p className="review-status">
                            {item.isCorrect ? "✅ Correct" : `❌ Your answer: ${item.userAnswer || "Skipped"}`}
                        </p>
                    </div>
                ))}
            </div>

            <button className="btn" onClick={() => navigate("/dashboard")}>
                Back to Dashboard
            </button>
        </div>
    );
}

export default Review;
