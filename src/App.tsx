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
import Blog from "./pages/Blog";
import BookCall from "./pages/BookCall";
import PrivacyPolicy from "./pages/PrivacyPolicy"; // New import
import TermsOfUse from "./pages/TermsOfUse";       // New import
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/journals" element={<Journals />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/book-call" element={<BookCall />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} /> {/* New route */}
            <Route path="/terms-of-use" element={<TermsOfUse />} />       {/* New route */}
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;