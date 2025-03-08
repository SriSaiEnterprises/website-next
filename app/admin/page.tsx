"use client"; // Mark this as a Client Component
import { ProtectedRoute } from '@/components/ProtectedAuth';
import ProductDashboard from '@/dashboard-components/ProductDashboard';

const Admin = () => {
  return (
    <ProtectedRoute>
      <ProductDashboard />
    </ProtectedRoute>
  );
};

export default Admin;