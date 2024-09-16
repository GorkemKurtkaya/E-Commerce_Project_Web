import { Route, Routes } from "react-router-dom";

import Home from "./views/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./views/Login";
import Signup from "./views/Signup";
import Conditions from "./views/Conditions";
import ProductPage from "./views/ProductPage";
import Shopping from "./views/Shopping";
import Account from "./views/Account";

import "./App.css";
import "./index.css";

function App() {
  return (
    <div className="App flex flex-col h-screen">
      <Navbar />
      <div className="flex-1 flex main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/conditions" element={<Conditions />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/shopping" element={<Shopping />} />
          <Route path="/account" element={<Account />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
