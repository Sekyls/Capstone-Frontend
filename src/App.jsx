import { BrowserRouter, Routes, Route } from "react-router-dom";
import { appRoutes } from "../appRoutes";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CustomerDashboard from "./pages/Dashboard/CustomerDashboard";
import RestaurantDashboard from "./pages/Dashboard/RestaurantDashboard";
import Hero from "./components/HeroSection";
import Header from "./components/Header";
import "./styles/app.css";
import Restaurants from "./pages/Restaurants";
import AboutPage from "./pages/About";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path={appRoutes.Home} element={<Hero />} />
        <Route path={appRoutes.Register} element={<Register />} />
        <Route path={appRoutes.Login} element={<Login />} />
        <Route
          path={appRoutes.CustomerDashboard}
          element={<CustomerDashboard />}
        />
        <Route
          path={appRoutes.RestaurantDashboard}
          element={<RestaurantDashboard />}
        />
        <Route path={appRoutes.Restaurant} element={<Restaurants />} />
        <Route path={appRoutes.About} element={<AboutPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
