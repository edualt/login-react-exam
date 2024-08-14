import "./login.css";
import * as Yup from "yup";
import React, {useEffect} from "react";
import { Formik } from "formik";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import useAuth from "../../hooks/useAuth";
import { login } from "../../api/services/auth";
import { useNavigate } from "react-router-dom";
import { Button, TextField } from "@mui/material";
import { paperStyle, btnstyle } from "./loginMuiStyles";

export const Login = () => {
  const navigate = useNavigate();
  const { setAccessToken, authState } = useAuth();

  useEffect(() => {
    if (authState.isAuthenticated) {
      navigate("/");
    }
  }, [authState, navigate]);
  
  const handleSubmit = async (values) => {
    const response = await login(values.username, values.password);

    if (response.status === 200) {
      setAccessToken(response.data.token);
      alert("Inicio de sesion exitoso");
      navigate("/");
      return;
    }

    alert("Usuario o contraseña incorrectos");
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("required"),
    password: Yup.string().required("required"),
  });

  return (
    <Formik
      initialValues={{
        username: "",
        password: "",
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, handleSubmit, handleChange }) => (
        <Grid
          container
          className="gridContainer"
          alignItems="center"
          justifyContent="center"
        >
          <Paper elevation={12} style={paperStyle}>
            <Grid className="alignCenter">
              <img src="/logo-color.png" className="image" alt="" />
              <h2>Login</h2>
            </Grid>
            <TextField
              id="username"
              label="Username"
              variant="standard"
              placeholder="Enter Your Username"
              fullWidth
              required
              onChange={handleChange}
            />
            {errors.username && touched.username && (
              <div className="errorText">El usuario es requerido</div>
            )}
            <TextField
              id="password"
              label="Password"
              variant="standard"
              placeholder="Enter Your Password"
              type="password"
              fullWidth
              required
              onChange={handleChange}
            />
            {errors.password && touched.password && (
              <div className="errorText">La contraseña es requerida</div>
            )}
            <Button
              style={btnstyle}
              type="submit"
              color="primary"
              variant="contained"
              fullWidth
              onClick={handleSubmit}
            >
              Login
            </Button>
          </Paper>
        </Grid>
      )}
    </Formik>
  );
};

export default Login;
