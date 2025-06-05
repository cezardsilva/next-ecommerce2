"use client"

import { formatPrice } from "@/lib/util";
import { useCartStore } from "@/sotre";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

type CheckoutButtonProps = {
    totalPrice: number
};

export default function CheckoutButton({ totalPrice }: CheckoutButtonProps) {
    const router = useRouter();
    const { user } = useUser();
    const cartStore = useCartStore();

    const handleCheckout = async () => {
        if (!user) {
            cartStore.toogleCart();
            router.push('/sign-in')
            return;
        }
        cartStore.setCheckout('checkout'); 
    }

    return (
        <div>
        <p className="text-teal-600 font-bold">
            Total: {formatPrice(totalPrice)}
        </p>
        <button 
        onClick={handleCheckout} 
        className="w-full py-2 mt-2 rounded-md bg-teal-600 text-white cursor-pointer"
        >
            Finalizar Compra
        </button>
        </div>
    );
}