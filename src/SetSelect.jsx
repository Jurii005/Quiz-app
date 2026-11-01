import React from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import questionsData from "./questions";

function SetSelect() {
    const { level } = useParams(); // reads ":level" from the URL, e.g. "easy"
    const navigate = useNavigate();

    // Unknown level in the URL -> send the user back to pick a valid one
    if (!Object.hasOwn(questionsData, level)) {
        return <Navigate to="/level" replace />;
    }

    // Set names (set1, set2, set3) come straight from the data object
    const availableSets = Object.keys(questionsData[level]);

    const handleSelectSet = (setId) => {
        navigate(`/quiz/${level}/${setId}`);
    };

    return (
        <div className="page-container">
            <h2 className="page-title capitalize">{level} Level - Choose a Set</h2>
            <p className="page-subtitle">Pick a set to start the quiz.</p>

            <div className="set-grid">
                {availableSets.map((setId, index) => (
                    <div key={setId} className="set-card" onClick={() => handleSelectSet(setId)}>
                        <h3>Set {index + 1}</h3>
                        <p>{questionsData[level][setId].length} Questions</p>
                    </div>
                ))}
            </div>

            <button className="btn outline-btn" onClick={() => navigate("/level")}>
                ← Back to Levels
            </button>
        </div>
    );
}

export default SetSelect;
