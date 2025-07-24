// src/pages/DashboardPage.tsx

import React from "react";
import { useAuth } from "../hooks/useAuth";

export const DashboardPage: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <div>
      <h2>Welcome, {user?.email}</h2>
      <button onClick={logout}>Logout</button>

    </div>
  );
};
