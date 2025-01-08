import "./App.css";
import Onboarding from "./pages/Onboarding";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import Header from "./component/base/Footer";
import { ProductDetail } from "./component/product/ProductDetail";
import Search from "./component/search/Search";
import MostPopular from "./pages/MostPopular";
import WishList from "./pages/WishList";
import Brand from "./pages/Brand";
import Auth from "./pages/auth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Cart from "./pages/Cart";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
const queryClient = new QueryClient();
import { LoginPage } from "./pages/Login/LoginPage";
import { SignInPage } from "./pages/Sign-in/SingnInPage";
import CheckoutPage from "./pages/Checkout";
import Payment from "./pages/Payment";
import { Provider } from "react-redux";
import { persistor, store } from "./config/store";
import Orders from "./pages/Orders";
import { PersistGate } from "redux-persist/integration/react";
import ChooseShipping from "./component/checkout/ChooseShipping";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={<div>loading...</div>} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <Routes>
            <Route path="/" element={<Header />}>
              <Route index element={<Home />} />
              <Route path="on" element={<Onboarding />} />
              <Route path="on" element={<Onboarding />} />
              <Route path="search" element={<Search />} />
              <Route path="popular" element={<MostPopular />} />
              <Route path="wishlist" element={<WishList />} />
              <Route path="auth" element={<Auth />} />
              <Route path="brand/:brand" element={<Brand />} />
              <Route path="cart/" element={<Cart />} />
              <Route path="orders/" element={<Orders />} />
              <Route path="product/:id" element={<ProductDetail />} />
            </Route>
            <Route path="payment/" element={<Payment />} />
            <Route path="ChooseShipping" element={<ChooseShipping />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="checkout" element={<CheckoutPage />} />
            <Route path="signin" element={<SignInPage />} />
          </Routes>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
