import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import AuthProvider from "../contexts/auth";
import Movements from "../pages/Movements";
import EditBalance from "../pages/EditBalance";
import MonthMovements from "../pages/MonthMovements";

import { RequireAuth } from "./requireAuth";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <>
            <Route path="*" element={<Login />} />
            <Route
              path="Home"
              element={
                <RequireAuth>
                  <Home />
                </RequireAuth>
              }
            />
            <Route
              path="Movements"
              element={
                <RequireAuth>
                  <Movements />
                </RequireAuth>
              }
            />
            <Route
              path="EditBalance"
              element={
                <RequireAuth>
                  <EditBalance />
                </RequireAuth>
              }
            />
            <Route
              path="MonthMovements"
              element={
                <RequireAuth>
                  <MonthMovements />
                </RequireAuth>
              }
            />
          </>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
