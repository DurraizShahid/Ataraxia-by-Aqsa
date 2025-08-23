import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import Index from "./pages/Index";
import About from "./pages/About";
import Services from "./pages/Services";
import Courses from "./pages/Courses";
import Journals from "./pages/Journals";
import ProductDetail from "./pages/ProductDetail";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import BookCall from "./pages/BookCall";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfUse from "./pages/TermsOfUse";
import NotFound from "./pages/NotFound";
import ScrollToTop from "./components/ScrollToTop";
import CartPage from "./pages/CartPage"; // Import the new CartPage component

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/journals" element={<Journals />} />
            <Route path="/journals/:slug" element={<ProductDetail />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/book-call" element={<BookCall />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-use" element={<TermsOfUse />} />
            <Route path="/cart" element={<CartPage />} /> {/* New route for the cart page */}
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;