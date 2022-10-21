import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import AuthProvider from "../contexts/auth";
import Movements from "../pages/Movements";
import EditBalance from "../pages/EditBalance";
import MonthMovements from "../pages/MonthMovements";

import { RequireAuth } from "./requireAuth";
import GitHubRedirect from "../components/GitHubRedirect";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <>
            <Route
              path="*"
              element={
                <RequireAuth>
                  <Home />
                </RequireAuth>
              }
            />
            <Route path="login" element={<Login />} />
            <Route
              path="home"
              element={
                <RequireAuth>
                  <Home />
                </RequireAuth>
              }
            />
            <Route
              path="movements"
              element={
                <RequireAuth>
                  <Movements />
                </RequireAuth>
              }
            />
            <Route
              path="edit-balance"
              element={
                <RequireAuth>
                  <EditBalance />
                </RequireAuth>
              }
            />
            <Route
              path="month-movements"
              element={
                <RequireAuth>
                  <MonthMovements />
                </RequireAuth>
              }
            />
            <Route path="/git-hub" element={<GitHubRedirect />} />
          </>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
