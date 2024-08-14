import React from "react";
import "./App.css";
import { Login } from "./views/Login/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthProvider from "./providers/authProvider";
import AuthRoute from "./components/AuthRoute";
import { Profile } from "./views/Profile/Profile";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route element={<AuthRoute />}>
            <Route path={"/"} element={<Profile />} />
          </Route>
          <Route path={"/login"} element={<Login />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
