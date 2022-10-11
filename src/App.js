import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import AuthProvider from "./contexts/auth";
import Movements from "./pages/Movements";
import EditBalance from "./pages/EditBalance";

import "./App.css";
import { RequireAuth } from "./services/requireAuth";

function App() {
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
          </>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
