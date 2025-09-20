// src/pages/DashboardPage.jsx
import React from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import DashboardLayout from "../components/DashboardPage/Dashboard/DashboardLayout";

const DashboardPage = () => {
    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <Sidebar />

            {/* Main content */}
            <div className="flex flex-col flex-1">
                {/* Navbar */}
                <Navbar />

                {/* Dashboard content */}
                <main className="p-6 overflow-y-auto">
                    <DashboardLayout />
                </main>
            </div>
        </div>
    );
};

export default DashboardPage;
