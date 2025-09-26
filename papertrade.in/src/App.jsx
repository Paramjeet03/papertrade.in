import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./components/header/navbar";
import F_dialogue from "./components/frontDialgoues/frontDialgoues";
import Herols from "./components/herosectionlist/heroSectionls";
import ThreeSteps from "./components/3Steps/3steps";
import Subfoot from "./components/subFoot/subFoot";
import Footer from "./components/Footer/Footer";
import AboutUs from "../../papertrade.in/src/components/About us/aboutus";  
import SignupPage from "./components/Signup/Signup";
import MarketPage from "./components/Market/market";
import Login from "./components/login/login";
import Dash from "./components/Dashboad/dashboad";

// 🔹 ScrollToTop component
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);  
  }, [pathname]);

  return null;
}

function App() {
  const location = useLocation();
  const hideNavbarPaths = ["/Dashboard"]; 

  return (
    <>
      {!hideNavbarPaths.includes(location.pathname) && <Navbar />}
      <ScrollToTop />

      <Routes>
        <Route
          path="/"
          element={
            <>
              <F_dialogue />
              <Herols />
              <ThreeSteps />
              <Subfoot />
              <Footer />
            </>
          }
        />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/Signup" element={<SignupPage />} />
        <Route path="/Market" element={<MarketPage />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Dashboard" element={<Dash />} />
      </Routes>
    </>
  );
}

export default App;
