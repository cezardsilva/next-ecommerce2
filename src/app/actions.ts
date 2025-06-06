"use server";

import { stripe } from "@/lib/stripe";

// export async function fetchProducts({
//   lastProductId,
// }: {
//   lastProductId?: string | undefined;
// }) {
//   const params = lastProductId ? { starting_after: lastProductId, limit: 50 } : {};

//   const { data: products, has_more } = await stripe.products.list(params);

//   const formatedProducts = await Promise.all(
//     products.map(async (product) => {
//       const price = await stripe.prices.list({
//         product: product.id,
//       });
//       return {
//         id: product.id,
//         price: price.data[0].unit_amount,
//         name: product.name,
//         image: product.images[0],
//         description: product.description,
//         currency: price.data[0].currency,
//         title: product.name, // or use another appropriate field if available
//         category: product.metadata?.category || "Uncategorized", // fallback if category is not present
//       };
//     })
//   );
// console.log(products);
//   return {formatedProducts, has_more};
// }

export async function fetchProducts({ lastProductId }: { lastProductId?: string }) {
  let formatedProducts: unknown[] = [];
  let hasMore = true;
  let currentLastProductId = lastProductId;

  while (hasMore) {
    const params = currentLastProductId ? { starting_after: currentLastProductId, limit: 8 } : { limit: 10 };
    const { data: products, has_more } = await stripe.products.list(params);

    const newProducts = await Promise.all(
      products.map(async (product) => {
        const price = await stripe.prices.list({
          product: product.id,
        });
        return {
          id: product.id,
          price: price.data[0]?.unit_amount,
          name: product.name,
          image: product.images[0],
          description: product.description,
          currency: price.data[0]?.currency,
          title: product.name,
          category: product.metadata?.category || "Uncategorized",
        };
      })
    );

    formatedProducts = [...formatedProducts, ...newProducts];
    currentLastProductId = products[products.length - 1]?.id;
    hasMore = has_more;
  }

  return { formatedProducts, hasMore };
}

