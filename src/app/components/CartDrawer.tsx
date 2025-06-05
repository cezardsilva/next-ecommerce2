"use client";

import { formatPrice } from "@/lib/util";
import { useCartStore } from "@/sotre";
import Image from "next/image";
import CheckoutButton from "./CheckoutButton";
import Checkout from "./Checkout";

export default function CartDrawer() {
  const useStore = useCartStore();

  const totalPrice = useStore.cart.reduce((acc, item) => {
    return acc + item.price! * item.quantity!;
  }, 0);

  return (
    <div
      onClick={() => useStore.toogleCart()}
      className="fixed w-full h-screen bg-black/25 left-0 top-0 z-50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="absolute bg-slate-600 right-0 top-0 w-1/3 h-screen p-8 overflow-y-scroll"
      >
        <button
          onClick={() => useStore.toogleCart()}
          className="font-bold text-sm text-teal-600 cursor-pointer"
        >
          Voltar para loja
        </button>
        <div className="border-t border-gray-400 my-4"></div>

        {useStore.onCheckout === "cart" && (
          <>
            {useStore.cart.map((item) => (
              <div key={item.id} className="flex gap-4 py-4">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={120}
                  height={120}
                  className="object-cover w-24"
                />
                <div>
                  <h2 className="w-42 truncate">{item.name}</h2>
                  <h2>Quantidade: {item.quantity}</h2>
                  <p className="text-teal-600 text-sm font-bold">
                    {formatPrice(item.price)}
                  </p>
                  <button
                    className="px-2 py-1 border rounded-md mr-2 mt-2 text-sm cursor-pointer"
                    onClick={() => useStore.addProduct(item)}
                  >
                    Adicionar
                  </button>
                  <button
                    onClick={() => useStore.removeProduct(item)}
                    className="px-2 py-1 border rounded-md mt-2 text-sm cursor-pointer"
                  >
                    Remover
                  </button>
                </div>
              </div>
            ))}
          </>
        )}

        {useStore.cart.length > 0 && useStore.onCheckout === "cart" && (
          <CheckoutButton totalPrice={totalPrice} />
        )}

        {useStore.onCheckout === "checkout" && <Checkout />}
      </div>
    </div>
  );
}
