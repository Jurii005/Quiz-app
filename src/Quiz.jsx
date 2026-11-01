import React, { useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import questionsData from "./questions";
import { getCurrentUser, saveResult, saveLastAttempt } from "./database";

// ---------- Question Component (reusable) ----------
function Question({ questionText, questionNumber, total }) {
    return (
        <div className="question-box">
            <p className="question-count">
                Question {questionNumber} of {total}
            </p>
            <h3 className="question-text">{questionText}</h3>
        </div>
    );
}

// ---------- Options Component (reusable) ----------
function Options({ options, selectedOption, onSelect }) {
    return (
        <div className="options-box">
            {options.map((option) => (
                <button
                    key={option}
                    type="button"
                    className={`option-btn ${selectedOption === option ? "selected" : ""}`}
                    onClick={() => onSelect(option)}
                >
                    {option}
                </button>
            ))}
        </div>
    );
}

function Quiz() {
    const { level, setId } = useParams(); // e.g. level="easy", setId="set1"
    const navigate = useNavigate();

    // Optional chaining: an invalid URL gives undefined instead of crashing
    const questions = questionsData[level]?.[setId];

    // All hooks must run before any early return
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState("");
    const [userAnswers, setUserAnswers] = useState([]); // stores full detail per question

    if (!questions) {
        return <Navigate to="/level" replace />;
    }

    const currentQuestion = questions[currentIndex];

    const handleNext = () => {
        const isCorrect = selectedOption === currentQuestion.answer;

        // Save full detail (needed later for the Review page)
        const answerRecord = {
            question: currentQuestion.question,
            options: currentQuestion.options,
            correctAnswer: currentQuestion.answer,
            userAnswer: selectedOption,
            isCorrect,
        };

        const updatedAnswers = [...userAnswers, answerRecord];
        setUserAnswers(updatedAnswers);

        if (currentIndex + 1 < questions.length) {
            setCurrentIndex(currentIndex + 1);
            setSelectedOption("");
        } else {
            // Quiz finished — calculate score using filter
            const correctCount = updatedAnswers.filter((a) => a.isCorrect).length;
            const user = getCurrentUser();

            const attempt = {
                username: user.username,
                level,
                set: setId,
                score: correctCount,
                total: questions.length,
                date: new Date().toLocaleDateString(),
                details: updatedAnswers, // needed for Review page
            };

            saveResult(attempt);      // permanent history (for dashboard)
            saveLastAttempt(attempt); // temporary "latest attempt" (for result/review pages)

            navigate("/result");
        }
    };

    return (
        <div className="page-container">
            <div className="card">
                <p className="level-tag capitalize">{level} - {setId}</p>
                <Question
                    questionText={currentQuestion.question}
                    questionNumber={currentIndex + 1}
                    total={questions.length}
                />
                <Options
                    options={currentQuestion.options}
                    selectedOption={selectedOption}
                    onSelect={setSelectedOption}
                />
                <button className="btn" disabled={!selectedOption} onClick={handleNext}>
                    {currentIndex + 1 === questions.length ? "Submit" : "Next"}
                </button>
            </div>
        </div>
    );
}

export default Quiz;
