// src/App.tsx

import React from "react";
import { AuthProvider } from "./context/AuthContext";
import { AppRoutes } from "./routes/AppRoutes";
import Header from "./components/Header";

const App: React.FC = () => (
  <AuthProvider>
    <Header />
    <AppRoutes />
  </AuthProvider>
);

export default App;
