import "../index.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import LeftSide from "../components/LeftSide";
import { useState, useContext } from "react";
import { FormEvent } from "react";
import { ProductContext } from "../context/context";

function Signup() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password1: "",
    password2: "",
    checkbox: "",
  });

  const context = useContext(ProductContext);
  const fetchSignupUser = context?.fetchSignupUser;

  const togglePasswordVisibility = () => {
    setPasswordVisible((passwordVisible) => !passwordVisible);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let formIsValid = true;
    const newErrors = {
      name: "",
      email: "",
      password1: "",
      password2: "",
      checkbox: "",
    };

    // Ad Soyad kontrolü
    if (!name) {
      newErrors.name = "Ad soyad alanı boş bırakılamaz.";
      formIsValid = false;
    }

    // Email kontrolü
    if (!email) {
      newErrors.email = "Email alanı boş bırakılamaz.";
      formIsValid = false;
    }

    // Şifre kontrolü
    if (!password1) {
      newErrors.password1 = "Şifre alanı boş bırakılamaz.";
      formIsValid = false;
    }

    // Şifreyi onaylama kontrolü
    if (!password2) {
      newErrors.password2 = "Şifreyi onayla alanı boş bırakılamaz.";
      formIsValid = false;
    } else if (password1 !== password2) {
      newErrors.password2 = "Şifreler eşleşmiyor.";
      formIsValid = false;
    }

    // Checkbox kontrolü
    if (!isChecked) {
      newErrors.checkbox =
        "Kişisel verilerin işlenmesine yönelik metni okuduğunuzu onaylamalısınız.";
      formIsValid = false;
    }

    if (formIsValid) {
      // Formu gönderme işlemi
      console.log("Form gönderildi");
      if (fetchSignupUser) {
        const response = await fetchSignupUser(name, email, password1); // fetchUser fonksiyonunu kullanarak giriş yapmayı deniyoruz

        if (response) {
          // Giriş başarılı, kullanıcı bilgilerini burada kullanabilirsiniz
          console.log("Kayıt başarılı:", response);
        } else {
          // Giriş başarısız, hata mesajı göster
          console.log("Kayıt Başarısız");
        }
      }
    } else {
      setErrors(newErrors); // Geçersiz girişler için hata mesajlarını ayarla
    }
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Form alanına göre güncelleme
    switch (name) {
      case "name":
        setName(value);
        setErrors((prevErrors) => ({ ...prevErrors, name: "" }));
        break;
      case "email":
        setEmail(value);
        setErrors((prevErrors) => ({ ...prevErrors, email: "" }));
        break;
      case "password1":
        setPassword1(value);
        setErrors((prevErrors) => ({ ...prevErrors, password1: "" }));
        break;
      case "password2":
        setPassword2(value);
        setErrors((prevErrors) => ({ ...prevErrors, password2: "" }));
        break;
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked);
    setErrors((prevErrors) => ({ ...prevErrors, checkbox: "" }));
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
                  <label className="block mb-2 text-[#373A40]">Ad Soyad</label>
                  <input
                    name="name"
                    className="inline-block w-full p-4 leading-6 text-lg placeholder-[#468585] text-[#468585] bg-white shadow border-2 border-[#468585] rounded focus:outline-none"
                    type="text"
                    placeholder="İsim"
                    value={name}
                    onChange={handleInputChange}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm">{errors.name}</p>
                  )}
                </div>
                <div className="mb-6">
                  <label className="block mb-2 text-[#373A40]">Email</label>
                  <input
                    name="email"
                    className="inline-block w-full p-4 leading-6 text-lg placeholder-[#468585] text-[#468585] bg-white shadow border-2 border-[#468585] rounded focus:outline-none"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={handleInputChange}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm">{errors.email}</p>
                  )}
                </div>
                <div className="mb-6 relative">
                  <label className="block mb-2 text-[#373A40]">Şifre</label>
                  <div className="relative">
                    <input
                      name="password1"
                      className="inline-block w-full p-4 leading-6 text-lg placeholder-[#468585] text-[#468585] bg-white shadow border-2 border-[#468585] rounded pr-12 focus:outline-none"
                      type={passwordVisible ? "text" : "password"}
                      placeholder="Şifre"
                      value={password1}
                      onChange={handleInputChange}
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
                  {errors.password1 && (
                    <p className="text-red-500 text-sm">{errors.password1}</p>
                  )}
                </div>
                <div className="mb-6 relative">
                  <label className="block mb-2 text-[#373A40]">
                    Şifreyi Onayla
                  </label>
                  <div className="relative">
                    <input
                      name="password2"
                      className="inline-block w-full p-4 leading-6 text-lg placeholder-[#468585] text-[#468585] bg-white shadow border-2 border-[#468585] rounded pr-12 focus:outline-none"
                      type={passwordVisible ? "text" : "password"}
                      placeholder="Şifre"
                      value={password2}
                      onChange={handleInputChange}
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
                  {errors.password2 && (
                    <p className="text-red-500 text-sm">{errors.password2}</p>
                  )}
                </div>

                <div className="w-full lg:w-auto px-4 mb-4 lg:mb-0">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      className="mr-2 w-4 h-4"
                      checked={isChecked}
                      onChange={handleCheckboxChange}
                    />
                    <label className="ml-2 mb-2 flex items-center">
                      <div>
                        Kişisel verilerimin işlenmesine yönelik{" "}
                        <a
                          href="/conditions"
                          className="underline"
                          target="_blank"
                        >
                          aydınlatma metni ve açık rıza metnini
                        </a>{" "}
                        okudum ve anladım.
                      </div>
                    </label>
                  </div>
                  {errors.checkbox && (
                    <p className="text-red-500 text-sm">{errors.checkbox}</p>
                  )}
                </div>

                <button className="inline-block w-full py-4 px-6 mb-6 mt-4 text-center text-lg leading-6 text-white font-extrabold bg-[#7AB2B2] hover:bg-[#16423C] border-3 border-indigo-900 shadow rounded transition duration-200">
                  Kayıt Ol
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
