/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./public/index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontFamily: {
      // font-sans를 Pretendard로 설정 (후보 폰트로 system-ui와 sans-serif를 추가)
      sans: ['Pretendard', 'system-ui', 'sans-serif'],
    },
    extend: {},
  },
  plugins: [
    require('@tailwindcss/postcss'),
    require('autoprefixer'),
  ],
}

