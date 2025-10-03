import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CartProvider } from "./contexts/CartContext";
import Loader from "./components/Loader";
import ScrollToTop from "./components/ScrollToTop";
import StartPageTop from "./components/StartPageTop";
import Layout from "./Layout";
import { WishlistProvider } from "./contexts/WishlistContext";
import FooterLegalPage from "./pages/FooterLegalPage";

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
          <Sonner />
          <ScrollToTop />
          <BrowserRouter>
            <StartPageTop />
            <Suspense fallback={<Loader />}>
              <Routes>
                <Route path="/" element={<Layout />}>
                  <Route index element={<Index />} />
                  <Route path="product/:id" element={<ProductDetail />} />
                  <Route path="checkout" element={<Checkout />} />
                  <Route path="shop" element={<Shop />} />
                  <Route path="contact" element={<ContactUs />} />
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
