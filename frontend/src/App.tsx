import { Route, Routes, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

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
  const navigate = useNavigate();
  const [user, setUser] = useState<{
    name: string;
    email: string;
  } | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");

    if (savedUser) {
      const userData = JSON.parse(savedUser);
      setUser(userData); // Kullanıcı bilgilerini tekrar state'e yükle
    }
  }, []);

  const handleLogout = () => {
    setUser(null); // Kullanıcı bilgisini sıfırla
    localStorage.removeItem("user"); // LocalStorage'dan sil
    navigate("/");
    window.location.reload();
  };

  const handleLogin = (userData: { name: string; email: string }) => {
    setUser(userData);
  };

  return (
    <div className="App flex flex-col h-screen">
      <Navbar user={user} onLogout={handleLogout} />
      <div className="flex-1 flex main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
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
