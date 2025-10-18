import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./globals.css";
import { CartProvider } from "@/context/CartContext.tsx";
import "./lib/initializeSampleData"; // Initialize sample data on app load

createRoot(document.getElementById("root")!).render(
  <CartProvider>
    <App />
  </CartProvider>
);