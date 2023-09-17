import React, { useCallback, useEffect } from "react";
import "./App.css";
import {
  AppBar,
  Button,
  CircularProgress,
  Container,
  IconButton,
  LinearProgress,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { TodolistsList } from "features/TodolistsLists/TodolistsList";
import { useSelector } from "react-redux";
import { AppRootStateType, useAppDispatch } from "./store";
import { initializeAppTC, RequestStatusType } from "./app-reducer";
import { ErrorSnackbar } from "components/SnackBar";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Login } from "features/Login/Login";
import { logOutTC } from "features/Login/auth-reducer";

const App = () => {
  const status = useSelector<AppRootStateType, RequestStatusType>(
    (state) => state.app.status,
  );
  const initialized = useSelector<AppRootStateType, boolean>(
    (state) => state.app.isInitialized,
  );
  const isLoggedIn = useSelector<AppRootStateType, boolean>(
    (state) => state.auth.isLoggedIn,
  );
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(initializeAppTC());
  }, []);
  const logOutHandler = useCallback(() => {
    dispatch(logOutTC());
  }, []);
  if (!initialized) {
    return (
      <div
        style={{
          position: "fixed",
          top: "30%",
          textAlign: "center",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <CircularProgress />
      </div>
    );
  }

  return (
    <BrowserRouter>
      <div>
        <ErrorSnackbar />
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              News
            </Typography>
            {isLoggedIn && (
              <Button onClick={logOutHandler} color="inherit">
                Log out
              </Button>
            )}
          </Toolbar>
          {status === "loading" && <LinearProgress />}
        </AppBar>
        <Container fixed>
          <Routes>
            <Route path="/" element={<TodolistsList />} />
            <Route index path="/login" element={<Login />} />
            <Route path="*" element={<Navigate to="/404" />} />
            <Route path="/404" element={<h1>404 PAGE NOT FOUND</h1>} />
          </Routes>
        </Container>
      </div>
    </BrowserRouter>
  );
};

export default App;
