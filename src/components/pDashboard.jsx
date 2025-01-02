import React from "react";
import Dashboard from "../pages/Dashboard";
import { ProtectedRoute } from "./pRoute";

 const SecuredDashboard = () => {
    return (
        <ProtectedRoute>
            <Dashboard/>
        </ProtectedRoute>
    );
};


export default SecuredDashboard;