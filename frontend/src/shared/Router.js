import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "../pages/Main";
import Kidle from "../pages/Kidle";
import Kimantle from "../pages/Kimantle";
import StockUpDown from "../pages/StockUpDown";
import FinanceQuiz from "../pages/FinanceQuiz";
import StockDraw from "../pages/StockDraw";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp"
import Ranking from "../pages/Ranking";
import PointHistory from "../pages/PointHistory";


const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="kidle" element={<Kidle />} />
        <Route path="kimantle" element={<Kimantle />} />
        <Route path="updown" element={<StockUpDown />} />
        <Route path="quiz" element={<FinanceQuiz />} />
        <Route path="draw" element={<StockDraw />} />
        <Route path="point" element={<PointHistory />} />
        <Route path="rank" element={<Ranking />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
