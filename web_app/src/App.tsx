import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/landingPage/LandingPage";
import LoginPage from "./pages/Loging/loginPage";
import SingUpPage from "./pages/SingUp/singUpPage";

import * as React from "react";
import { PaletteMode } from "@mui/material";
import getLPTheme from "./themes/theme";
import AppAppBar from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import RoutePaths from "./config";

function App() {
  const [mode, setMode] = React.useState<PaletteMode>("light");
  const LPtheme = createTheme(getLPTheme(mode));

  const toggleColorMode = () => {
    setMode((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const shouldShowAppBar = !["/login", "/signup"].includes(location.pathname);
  const shouldShowBottomBar = !["/login", "/signup"].includes(
    location.pathname
  );

  return (
    <ThemeProvider theme={LPtheme}>
      {shouldShowAppBar && (
        <AppAppBar mode={mode} toggleColorMode={toggleColorMode} />
      )}
      <Routes>
        <Route path={RoutePaths.home} element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SingUpPage />} />
      </Routes>
      {shouldShowBottomBar && <Footer />}
    </ThemeProvider>
  );
}

export default App;
