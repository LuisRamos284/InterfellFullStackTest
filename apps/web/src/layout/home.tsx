"use client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Navigation from "../components/navigation";
import ClientRegister from "../pages/clientRegister";
import WalletRecharge from "../pages/walletRecharge";
import Pay from "../pages/pay/pay";
import CheckBalance from "../pages/checkBalance/checkBalance";

export default function Home() {
  return (
    <BrowserRouter>
      <div className="min-h-screen h-full bg-blue-50 p-6 flex">
        <div className="container mx-auto flex flex-col">
          <h1 className="text-3xl font-bold text-blue-800 text-center mb-6">
            Wallet Management System
          </h1>

          <Navigation />

          <div className="mt-6 flex flex-col flex-1">
            <Routes>
              <Route path="/client-register" element={<ClientRegister />} />
              <Route path="/wallet-recharge" element={<WalletRecharge />} />
              <Route path="/pay" element={<Pay />} />
              <Route path="/check-balance" element={<CheckBalance />} />
              <Route
                path="/"
                element={<Navigate to="/client-register" replace />}
              />
            </Routes>
          </div>

          <footer className="mt-8 text-center text-blue-600 text-sm">
            &copy; {new Date().getFullYear()}
          </footer>
        </div>
      </div>
    </BrowserRouter>
  );
}
