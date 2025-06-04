import AddCart from "@/app/components/AddCart";
import ProductImage from "@/app/components/ProductImage";
import { formatPrice } from "@/lib/util";
import Stripe from "stripe";

type ProductPageProps = {
  params: {
    id: string;
  };
};

async function getProduct(id: string) {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: "2025-05-28.basil",
    });

    const produto = await stripe.products.retrieve(id);
    const price = await stripe.prices.list({
      product: produto.id,
    });

    return {
      id: produto.id,
      price: price.data[0]?.unit_amount || 0,
      name: produto.name,
      image: produto.images[0] || "",
      description: produto.description || "Sem descrição disponível.",
      currency: price.data[0]?.currency || "usd",
    };
  } catch (error) {
    console.error("Erro ao buscar produto:", error);
    return null;
  }
}

export default async function ProductPage({
  params: { id },
}: ProductPageProps) {
  const product = await getProduct(id);

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold text-red-600">
          Produto não encontrado.
        </h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row items-center max-w-7xl mx-auto gap-8 p-10">
      {product && <ProductImage product={product} />}
      <div className="flex flex-col">
        <div className="pb-4">
          <h1 className="text-2xl font-bold text-gray-300">{product.name}</h1>
          <h2 className="text-xl text-teal-600 font-bold">
            {formatPrice(product.price)}
          </h2>
        </div>
        <div className="pb-4">
          <p className="text-sm text-gray-400">{product.description}</p>
        </div>
        <AddCart product={product} />
      </div>
    </div>
  );
}
