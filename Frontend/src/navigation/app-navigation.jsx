import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { LoginOrRegisterComponent } from "../components/login-or-register/login-or-register";
import { Dashboard } from "../components/dashboard/dashboard";
import { useEffect, useState } from "react";
import authService from "../services/auth.service";
import { StockDetail } from "../components/stock-detail/stock-detail";

export const AppNavigation = () => {
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    authService.isUserAuthenticated().then(
      (response) => {
        console.log("respose", response);
        if (response.data.auth) {
          setAuth(true);
        }
      },
      (error) => {
        console.log(error);
        setAuth(false);
      }
    );
  }, []);

  if (!auth) {
    return <LoginOrRegisterComponent />;
  }

  return (
    <Router>
      <Routes>
        <Route path="/misAcciones" element={<Dashboard />} />
        <Route path="*" element={<Dashboard />} />
      </Routes>
    </Router>
  );
};
