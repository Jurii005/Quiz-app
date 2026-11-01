import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getCurrentUser } from "./database";

// Route guard: renders the nested routes only for logged-in users
// (and only for the given role, if one is passed).
function RequireAuth({ role }) {
    const user = getCurrentUser();

    if (!user || (role && user.role !== role)) {
        return <Navigate to="/" replace />;
    }
    return <Outlet />;
}

export default RequireAuth;
