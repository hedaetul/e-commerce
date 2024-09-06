import React from 'react';

const DashboardCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div className="p-4 bg-white shadow rounded-md">
        <p className="text-gray-600">Earnings (before taxes)</p>
        <h2 className="text-3xl font-bold">$30,450.00</h2>
        <p className="text-sm text-gray-400">after associated vendor fees</p>
      </div>
      <div className="p-4 bg-white shadow rounded-md">
        <p className="text-gray-600">Your balance</p>
        <h2 className="text-3xl font-bold">$4,000.00</h2>
        <p className="text-sm text-gray-400">Will be processed on Feb 15, 2021</p>
      </div>
      <div className="p-4 bg-white shadow rounded-md">
        <p className="text-gray-600">Pending Orders</p>
        <h2 className="text-3xl font-bold">08</h2>
        <p className="text-sm text-gray-400">7/3/2020 - 8/1/2020</p>
      </div>
    </div>
  );
};

export default DashboardCards;
