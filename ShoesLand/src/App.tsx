import { useState } from "react";
import "./App.css";
import { useEffect } from "react";
import Onboarding from "./pages/Onboarding";
import Home from "./pages/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./component/base/Header";
import { ProductDetail } from "./component/product/ProductDetail";

function App() {
  return (
    // <Onboarding />;

    <Routes>
      <Route path="/" element={<Header />}>
        <Route index element={<Home />} />
        <Route path="product/:id" element={<ProductDetail />} />
      </Route>
    </Routes>
  );
}

export default App;
