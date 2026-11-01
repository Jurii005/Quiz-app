import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./Login";
import Register from "./Register";
import Dashboard from "./Dashboard";
import LevelSelect from "./LevelSelect";
import SetSelect from "./SetSelect";
import Quiz from "./Quiz";
import Result from "./Result";
import Review from "./Review";
import Admin from "./Admin";
import RequireAuth from "./RequireAuth";

import "./App.css";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Auth pages */}
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* User pages (login required) */}
                <Route element={<RequireAuth />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/level" element={<LevelSelect />} />
                    <Route path="/sets/:level" element={<SetSelect />} />
                    <Route path="/quiz/:level/:setId" element={<Quiz />} />
                    <Route path="/result" element={<Result />} />
                    <Route path="/review" element={<Review />} />
                </Route>

                {/* Admin page (admin role required) */}
                <Route element={<RequireAuth role="admin" />}>
                    <Route path="/admin" element={<Admin />} />
                </Route>

                {/* Unknown URL -> back to login */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
