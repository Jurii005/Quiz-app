import React from "react";
import { useNavigate } from "react-router-dom";

const levels = [
    { id: "easy", label: "Easy", desc: "Basic HTML, CSS & JS concepts" },
    { id: "medium", label: "Medium", desc: "React fundamentals & hooks" },
    { id: "hard", label: "Hard", desc: "Advanced React & JS concepts" },
];

function LevelSelect() {
    const navigate = useNavigate();

    const handleSelectLevel = (levelId) => {
        // Pass the chosen level forward via the URL itself
        navigate(`/sets/${levelId}`);
    };

    return (
        <div className="page-container">
            <h2 className="page-title">Choose Difficulty Level</h2>
            <p className="page-subtitle">Select a level to see available question sets.</p>

            <div className="level-grid">
                {levels.map((level) => (
                    <div
                        key={level.id}
                        className={`level-card level-${level.id}`}
                        onClick={() => handleSelectLevel(level.id)}
                    >
                        <h3>{level.label}</h3>
                        <p>{level.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default LevelSelect;
