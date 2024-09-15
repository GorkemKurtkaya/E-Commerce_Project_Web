import "../index.css";
import "../styles/login.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import { useNavigate } from "react-router-dom";

import LeftSide from "../components/LeftSide";
import { Link } from "react-router-dom";
import React, { useState, useContext } from "react";
import { FormEvent } from "react";
import { ProductContext } from "../context/context";

interface LoginProps {
  onLogin: (userData: { name: string; email: string }) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{
    email: string;
    password: string;
  } | null>(null);
  const context = useContext(ProductContext);

  // fetchUser fonksiyonunu context'ten al
  const fetchUser = context?.fetchUser;

  const togglePasswordVisibility = () => {
    setPasswordVisible((prevState) => !prevState);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let formIsValid = true;
    const newErrors = { email: "", password: "" };

    // Email kontrolü
    if (!email) {
      newErrors.email = "Email alanı boş bırakılamaz.";
      formIsValid = false;
    }

    // Şifre kontrolü
    if (!password) {
      newErrors.password = "Şifre alanı boş bırakılamaz.";
      formIsValid = false;
    }

    if (formIsValid) {
      // Formu gönderme işlemi
      if (fetchUser) {
        const user = await fetchUser(email, password); // fetchUser fonksiyonunu kullanarak giriş yapmayı deniyoruz

        if (user) {
          // Giriş başarılı, kullanıcı bilgilerini burada kullanabilirsiniz
          console.log("Giriş başarılı:", user);
          setErrors(null); // Hata mesajlarını sıfırlıyoruz
          onLogin(user);
          navigate("/");
        } else {
          // Giriş başarısız, hata mesajı göster
          setErrors({ email: "", password: "Geçersiz e-posta veya şifre" });
        }
      }
    } else {
      setErrors(newErrors); // Geçersiz girişler için hata mesajlarını ayarla
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen">
      <div className="hidden md:flex items-center justify-center">
        <LeftSide />
      </div>
      <div className="flex items-center justify-start p-4 md:p-6 lg:p-8">
        <div className="w-full max-w-sm md:max-w-md lg:max-w-lg text-left">
          <div className="container px-4 mx-auto">
            <div className="max-w-lg mx-auto">
              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label className="block mb-2 text-[#373A40]">Email</label>
                  <input
                    className="inline-block w-full p-4 leading-6 text-lg placeholder-[#468585] text-[#373A40] bg-white shadow border-2 border-[#468585] rounded focus:outline-none"
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {errors?.email && (
                    <p className="text-red-500 text-sm">{errors.email}</p>
                  )}
                </div>
                <div className="mb-6 relative">
                  <label className="block mb-2 text-[#373A40]">Şifre</label>
                  <div className="relative">
                    <input
                      className="inline-block w-full p-4 leading-6 text-lg placeholder-[#468585] text-[#373A40] bg-white shadow border-2 border-[#468585] rounded pr-12 focus:outline-none"
                      type={passwordVisible ? "text" : "password"}
                      placeholder="Şifre"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                      onClick={togglePasswordVisibility}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-transparent border-none"
                      type="button"
                      aria-label="Toggle password visibility"
                    >
                      <i
                        className={`fas ${
                          passwordVisible ? "fa-eye-slash" : "fa-eye"
                        } text-[#4D869C]`}
                      ></i>
                    </button>
                  </div>
                  {errors?.password && (
                    <p className="text-red-500 text-sm">{errors.password}</p>
                  )}
                </div>
                <div className="flex flex-wrap -mx-4 mb-6 items-center justify-center">
                  <div className="w-auto px-4">
                    <Link
                      className="inline-block hover:underline text-[#373A40]"
                      to="/#"
                    >
                      Şifreni Mi Unuttun?
                    </Link>
                  </div>
                </div>
                <button
                  type="submit"
                  className="inline-block w-full py-4 px-6 mb-6 text-center text-lg leading-6 text-white font-extrabold bg-[#7AB2B2] hover:bg-[#16423C] border-3 border-indigo-900 shadow rounded transition duration-200"
                >
                  Giriş Yap
                </button>
                <p className="text-center text-[#373A40] ">
                  Hesabın Yok Mu?
                  <Link className="text-[#4D869C] hover:underline" to="/signup">
                    Kayıt Ol
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
