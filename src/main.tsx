import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./globals.css";
import { CartProvider } from "@/context/CartContext.tsx";
import "./lib/initializeSampleData"; // Initialize sample data on app load
import { initTheme } from "@/lib/theme";
import { HelmetProvider } from "react-helmet-async";

initTheme();

createRoot(document.getElementById("root")!).render(
  <CartProvider>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </CartProvider>
);