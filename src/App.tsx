import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import MainLayout from "./components/MainLayout";
import Index from "./pages/Index";
import About from "./pages/About";
import Services from "./pages/Services";
import Courses from "./pages/Courses";
import CourseDetail from "./pages/CourseDetail";
import Journals from "./pages/Journals";
import ProductDetail from "./pages/ProductDetail";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import BookCall from "./pages/BookCall";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfUse from "./pages/TermsOfUse";
import NotFound from "./pages/NotFound";
import ScrollToTop from "./components/ScrollToTop";
import CartPage from "./pages/CartPage";
import Checkout from "./pages/Checkout";

// Admin Pages
import AdminLogin from "./pages/admin/Login";
import AdminLayout from "./components/admin/AdminLayout";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminBlogs from "./pages/admin/Blogs";
import AdminCourses from "./pages/admin/Courses";
import AdminJournals from "./pages/admin/Journals";
import AdminOrders from "./pages/admin/Orders";
import AdminSiteContent from "./pages/admin/SiteContent";
import AdminSettings from "./pages/admin/Settings";
import AdminImageManager from "./pages/admin/ImageManager";
import { SiteImagesProvider } from "./context/SiteImagesContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <SiteImagesProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            {/* Public Routes */}
            <Route element={<MainLayout />}>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/courses/:slug" element={<CourseDetail />} />
              <Route path="/journals" element={<Journals />} />
              <Route path="/journals/:slug" element={<ProductDetail />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/book-call" element={<BookCall />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-of-use" element={<TermsOfUse />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<Checkout />} />
            </Route>

            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="blogs" element={<AdminBlogs />} />
              <Route path="courses" element={<AdminCourses />} />
              <Route path="journals" element={<AdminJournals />} />
              <Route path="orders" element={<AdminOrders />} />
              <Route path="site-content" element={<AdminSiteContent />} />
              <Route path="images" element={<AdminImageManager />} />
              <Route path="settings" element={<AdminSettings />} />
            </Route>

            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
      </SiteImagesProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;