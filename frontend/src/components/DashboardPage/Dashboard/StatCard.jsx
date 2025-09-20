import React from "react";

const StatCard = ({ title, value, icon }) => {
  return (
    <div className="bg-white p-4 rounded-2xl shadow-md flex items-center gap-4">
      {/* Icon (nếu có) */}
      {icon && <div className="text-indigo-600 text-3xl">{icon}</div>}

      {/* Nội dung */}
      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <h3 className="text-xl font-bold text-gray-800">{value}</h3>
      </div>
    </div>
  );
};

export default StatCard;
