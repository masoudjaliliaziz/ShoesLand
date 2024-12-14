import "./App.css";
import Onboarding from "./pages/Onboarding";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import Header from "./component/base/Header";
import { ProductDetail } from "./component/product/ProductDetail";
import Api from "./component/base/Api";

function App() {
  return (
    // <Onboarding />;
    <Api>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route index element={<Home />} />
          <Route path="product/:id" element={<ProductDetail />} />
        </Route>
      </Routes>
    </Api>
  );
}

export default App;
