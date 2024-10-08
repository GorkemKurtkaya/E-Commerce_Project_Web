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
import PurchasedProductsItem from "./views/PurchasedProductsItem";
import Admin from "./views/Admin";
import { ProductContext } from "./context/context";
import { useContext, useEffect, useState } from "react";







import "./App.css";
import "./index.css";


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState("");
  const [isLoading, setIsLoading] = useState(true); // Yeni state

  const context = useContext(ProductContext);

  if (!context) {
    throw new Error("ProductContext must be used within a ProductProvider");
  }

  const AuthCheck = context?.AuthCheck;
  const userData = context?.fetchUserInfos;

  useEffect(() => {
    const checkAuth = async () => {
      if (AuthCheck) {
        const isAuthenticated = await AuthCheck();
        setIsLoggedIn(isAuthenticated);
      }
    };

    const fetchUserData = async () => {
      const user = await userData();
      if (user) {
        setRole(user.role);
      }
      setIsLoading(false); // Yüklenme durumu sona erdi
    };

    checkAuth();
    fetchUserData();
  }, []);

  if (isLoading) {
    return <div className="text-center text-2xl">Yükleniyor...</div>; // Yüklenme ekranı
  }

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


          
          

            
          {isLoggedIn ? (
            <>

              {role === "user" ? (
                <>
                  <Route path="/account" element={<Account />} />
                  <Route
                    path="/purchasedProductsItem/:id"
                    element={<PurchasedProductsItem />}
                  />
                </>
              ) : role === "admin" ? (
                <>
                  <Route path="/admin" element={<Admin />} />
                </>
              ) : null}
              
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
