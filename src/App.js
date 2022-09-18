// import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { AuthContext, AuthContextProvider } from "./context/AuthContext";
import { useContext } from "react";
import { TableContextProvider } from "./context/TableContext";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const myTheme = createTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#25316D",
    },
    secondary: {
      main: "#5F6F94",
    },
    text: {
      primary: "black",
    },
  },
});

function App() {
  const ProtectedRoute = ({ children }) => {
    const { user } = useContext(AuthContext);
    if (!user) {
      return <Navigate to="/login" />;
    }

    return children;
  };

  return (
    <ThemeProvider theme={myTheme}>
      <AuthContextProvider>
        <TableContextProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </BrowserRouter>
        </TableContextProvider>
      </AuthContextProvider>
    </ThemeProvider>
  );
}

export default App;
