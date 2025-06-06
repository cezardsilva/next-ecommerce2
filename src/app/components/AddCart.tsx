"use client";

import { ProductType } from "@/types/ProductType";
import { useCartStore } from "@/sotre";

export default function Product({ product }: { product: ProductType }) {
  const { addProduct } = useCartStore();

  return (
<button
  onClick={(event) => {
    event.stopPropagation(); // Impede que o clique afete o <Link>
    event.preventDefault(); // Impede comportamentos padrão, como o redirecionamento
    addProduct(product);
  }}
  className="rounded-md bg-teal-600 text-white p-3.5 py-2.5 text-sm text-center cursor-pointer"
>
  Adicionar ao Carrinho
</button>

  );
}
