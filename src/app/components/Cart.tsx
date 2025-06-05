"use client";

import { useCartStore } from "@/sotre";
import { ShoppingCart } from "lucide-react";
import CartDrawer from "./CartDrawer";

export default function Cart() {
  const useStore = useCartStore();

  return (
    <>
      <div 
        onClick={() => useStore.toogleCart()}
        className="flex items-center cursor-pointer relative">
        <ShoppingCart />
        <span className="bg-teal-600 text-sm font-bold rounded-full h-5 w-5 flex items-center justify-center absolute left-3 bottom-3">
          {useStore.cart?.length}
        </span>
      </div>
      {!useStore.isOpen && (<CartDrawer/>)}
    </>
  );
}
