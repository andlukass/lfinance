import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RequireAuth } from "./requireAuth";

import Header from "../components/Header";
import Home from "../pages/Home";
import Login from "../pages/Login";
import AuthProvider from "../contexts/auth";
import Movements from "../pages/Movements";
import EditBalance from "../pages/EditBalance";
import MonthMovements from "../pages/MonthMovements";
import GitHubRedirect from "../components/GitHubRedirect";

import GlobalStyles from "./styling/global";
import { ThemeProvider } from "styled-components";
import dark from "./styling/themes/dark";
import light from "./styling/themes/ligth";

import useLocalStorage from "../hooks/useLocalStorage";

export default function AppRoutes() {
  const [theme, setTheme] = useLocalStorage("theme", dark);

  const toggleTheme = () => {
    setTheme(theme.title === "dark" ? light : dark);
  };
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <BrowserRouter>
          <AuthProvider>
            <Header toggleTheme={toggleTheme} theme={theme.title} />
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
      </ThemeProvider>
    </>
  );
}
