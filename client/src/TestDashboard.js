import React from 'react';
import AdminDashboard from './pages/dashboard/AdminDashboard';
import DashboardContent from './pages/dashboard/DashboardContent';

const TestDashboard = () => {
  return (
    <div style={{ backgroundColor: '#F8FAFC', minHeight: '100vh' }}>
      <h1 style={{ padding: '20px', color: '#1E293B' }}>Testing Admin Dashboard</h1>
      <AdminDashboard>
        <DashboardContent />
      </AdminDashboard>
    </div>
  );
};

export default TestDashboard;