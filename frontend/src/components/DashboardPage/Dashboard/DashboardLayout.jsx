// src/pages/DashboardLayout.jsx
import React from "react";
import StatCard from "./StatCard";
import TransactionChart from "./TransactionChart";
import UserTable from "./UserTable";

const DashboardLayout = () => {
    return (
        <div className="space-y-6">
            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard title="Users" value="1,245" />
                <StatCard title="Transactions" value="3,567" />
                <StatCard title="Revenue" value="$12,345" />
            </div>

            {/* Chart */}
            <TransactionChart />

            {/* Table */}
            <UserTable />
        </div>
    );
};

export default DashboardLayout;
