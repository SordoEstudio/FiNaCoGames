import React from "react";
import Home from "../pages/Home";
import Results from "../pages/Results";
import GameRules from "../pages/GameRules";
import GamePlay from "../pages/GamePlay";
import { Route, Router, Routes } from "react-router-dom";
import MainLayout from "../pages/layout/MainLayout";
import ErrorPage from "../pages/ErrorPage";
import Test from "../pages/Test";

const AppRouter = () => {
  return (
    <>
        <MainLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/rules/:game" element={<GameRules />} />
            <Route path="/play/:game" element={<GamePlay />} />
            <Route path="/results/:game" element={<Results />} />
            <Route path="*" element={<ErrorPage />} />
            <Route path="/test" element={<Test />} />
          </Routes>
        </MainLayout>
    </>
  );
};

export default AppRouter;
