import "./App.css";
import Onboarding from "./pages/Onboarding";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import Header from "./component/base/Header";
import { ProductDetail } from "./component/product/ProductDetail";
import Api from "./component/base/Api";
import Search from "./component/search/Search";
import MostPopular from "./pages/MostPopular";
import WishList from "./pages/WishList";
import Brand from "./pages/Brand";
import Auth from './pages/auth';
import SignIn from "./pages/SignIn";


function App() {
  return (
    // <Onboarding />;
    <Api>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route index element={<Home />} />
          <Route path="search" element={<Search />} />
          <Route path="popular" element={<MostPopular />} />
          <Route path="wishlist" element={<WishList />} />
          <Route path="auth" element={<Auth />} />
          <Route path="signin" element={<SignIn />} />
          <Route path="brand/:brand" element={<Brand />} />
          <Route path="product/:id" element={<ProductDetail />} />
        </Route>
      </Routes>
    </Api>
  );
}

export default App;
