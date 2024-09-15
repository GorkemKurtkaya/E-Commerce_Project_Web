/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    screens: {
      xs: "540px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
    },
    extend: {
      width: {
        "1/10": "10%",
        "1/6": "16.666667%",
        "1/5": "20%",
        "1/3": "33.333333%",
        // Diğer özel genişlikler ekleyebilirsiniz
      },
    },
  },
  plugins: [],
};
