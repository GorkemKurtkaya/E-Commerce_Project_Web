import { Route, Routes } from "react-router-dom";

import Success from "./components/paymentComponents/Success";
import Pay from "./components/paymentComponents/Pay";
import Home from "./views/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./views/Login";
import Signup from "./views/Signup";
import Conditions from "./views/Conditions";
import ProductPage from "./views/ProductPage";
import Shopping from "./views/Shopping";
import Account from "./views/Account";
import PurchasedProductsItem from "./views/PurchasedProductsItem";
import { ProductContext } from "./context/context";
import { useContext, useEffect, useState } from "react";

import "./App.css";
import "./index.css";


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const context = useContext(ProductContext);
  const AuthCheck = context?.AuthCheck;

  useEffect(() => {
    const checkAuth = async () => {
      if (AuthCheck) {
        const isAuthenticated = await AuthCheck();
        setIsLoggedIn(isAuthenticated);
      }
    };

    checkAuth();
  }, [AuthCheck]);

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
          <Route path="/pay" element={<Pay/>} />
          <Route path="/success" element={<Success/>} />

          
          

            
          {isLoggedIn ? (
            <>
              
              <Route path="/account" element={<Account />} />
              <Route
                path="/purchasedProductsItem/:id"
                element={<PurchasedProductsItem />}
              />
            </>
          ) : (
            <Route
              path="*"
              element={
                <div className="text-center text-2xl">Sayfa Yükleniyor</div>
              }
            />
          )}
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
