import { Toaster } from 'react-hot-toast';

import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import Loader from "./components/Loader";
import StartPageTop from "./components/StartPageTop";
import { CartProvider } from "./contexts/CartContext";
import { WishlistProvider } from "./contexts/WishlistContext";
import FooterLegalPage from "./pages/FooterLegalPage";
import OurStory from "./pages/OurStory";
import Products from "./pages/Products";

// 👇 Lazy imports for pages
const Index = lazy(() => import("./pages/Index"));
const NotFound = lazy(() => import("./pages/NotFound"));
const ProductDetail = lazy(() => import("./pages/ProductDetails"));
const Checkout = lazy(() => import("./pages/Checkout"));
const Shop = lazy(() => import("./pages/Shop"));
const ContactUs = lazy(() => import("./pages/ContactUs"));
const FAQ = lazy(() => import("./pages/FAQ"));
// Query Client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any,
  },
});
const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <WishlistProvider>
        <CartProvider>
          
          <Toaster />
          <BrowserRouter>
            <StartPageTop />
            <Suspense fallback={<Loader />}>
              <Routes>
                <Route path="/" element={<Layout />}>
                  <Route index element={<Index />} />
                  <Route path="product/:slug" element={<ProductDetail />} />
                  <Route path="checkout" element={<Checkout />} />
                  <Route path="shop" element={<Shop />} />
                  <Route path="contact" element={<ContactUs />} />
                  <Route path="/our-story" element={<OurStory />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/legals/:slug" element={<FooterLegalPage />} />
                  <Route path="faq" element={<FAQ />} />
                  <Route path="*" element={<NotFound />} />
                </Route>
              </Routes>
            </Suspense>
          </BrowserRouter>
        </CartProvider>
      </WishlistProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
