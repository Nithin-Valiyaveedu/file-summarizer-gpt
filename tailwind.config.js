/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/tw-elements/dist/js/**/*.js"
  ],
  plugins: [require("tw-elements/dist/plugin.cjs")],
  theme: {
    screens: {
      "370px": "370px",
      "500px": "500px",
      sm: "640px",
      md: "768px",
      "850px": "850px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
      textColor: {
        primaryColor: "#C37C2A",
        secondaryColor: "#8D8D8D"
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'login-gradient': 'linear-gradient(160.22deg, #373737 21.98%, #000000 86.77%);',
        'primary-button': 'linear-gradient(90deg, #BE7627 0%, #E3A53F 100%)',
      },
      backgroundColor: {
        default: '#FFF6E4',
        closeCross: '#F3F3F3',
        signupCard: '#F9F9F9',
        youtubCard: '#3C3C3C',
        dashboard: '#F8F8F8',
        answerPrompt: "#F5E4DF",
        projectClicked: "#EFEFEF"

      },
      borderColor: {
        primaryBorder: "#E6E6E6",
        loginButton: "#EAEAEA",
        inputField: "#E9E9E9",
        uploadField: "#E2A43F",
        buttonBorder: "#BE7627",
      },
      boxShadow: {
        loginButton: "0px 4px 6px rgba(0, 0, 0, 0.07)",
        inputField: "0px 4px 8px 0px #0000000D",
        uploadField: "0px 0px 50px 0px #E0A13D1A inset",
        createProject: "0px 4px 8px 0px #0000000D"
      },
      animation: {
        TopToBottom: "toBottom 0.5s ease-in",
      },
    },
  },
  plugins: [],
}
