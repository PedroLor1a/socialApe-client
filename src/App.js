import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from "./components/Navbar";
import { jwtDecode } from "jwt-decode";
// import AuthRoute from "./util/AuthRoute";

const theme = createTheme({
  palette: {
    primary: {
      light: "#757ce8",
      main: "#482880",
      dark: "#002884",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ff7961",
      main: "#efeafd",
      dark: "#cbb8fa",
      contrastText: "#000",
    },
  },
});

// let authenticated;
// const token = localStorage.FBIdToken;
// if (token) {
//   const decodedToken = jwtDecode(token);
//   if (decodedToken.exp * 1000 < Date.now()) {
//     window.location.href = "/login";
//     authenticated = false;
//   } else {
//     authenticated = true;
//   }
// }

function App() {
  const token = localStorage.FBIdToken;
  const isAuthenticated = token && jwtDecode(token).exp * 1000 > Date.now();
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            {/* <AuthRoute
              exact
              path="/login"
              element={<Login />}
              authenticated={authenticated}
            />
            <AuthRoute
              exact
              path="/signup"
              element={<Signup />}
              authenticated={authenticated}
            /> */}

            {!isAuthenticated && <Route path="/login" element={<Login />} />}
            {!isAuthenticated && <Route path="/signup" element={<Signup />} />}
            {isAuthenticated && (
              <Route path="/login" element={<Navigate to="/" />} />
            )}
            {isAuthenticated && (
              <Route path="/signup" element={<Navigate to="/" />} />
            )}
          </Routes>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
