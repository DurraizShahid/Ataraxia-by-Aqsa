import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./globals.css";
import { CartProvider } from "@/context/CartContext.tsx"; // Use path alias for consistency

createRoot(document.getElementById("root")!).render(
  <CartProvider> {/* Wrap App with CartProvider */}
    <App />
  </CartProvider>
);