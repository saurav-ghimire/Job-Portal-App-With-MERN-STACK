"use client";

import { Provider } from "react-redux";
import { Toaster } from "@/components/ui/sonner";
import Header from "./Header";
import store from "@/redux/store";


export default function ClientLayout({ children }) {
  return (
    <Provider store={store}>
      <Header />
      <div className="w-[85%] m-auto">
        {children}
      </div>
      <Toaster />
    </Provider>
  );
}
