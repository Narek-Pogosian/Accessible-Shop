import { getProducts } from "@/server/data-access/queries";
import { ProductCard, ProductCardSkeleton } from "./product-card";

interface ProductsListProps {
  searchParams: PageProps["searchParams"];
}

export async function ProductsList({ searchParams }: ProductsListProps) {
  console.log(searchParams);
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const products = await getProducts();

  return (
    <ul className="xs:grid-cols-2 grid grow gap-6 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <li key={product.id}>
          <ProductCard product={product} />
        </li>
      ))}
    </ul>
  );
}

export function ProductsListSkeleton() {
  const products = new Array(20).fill(null);

  return (
    <ul className="xs:grid-cols-2 grid grow gap-6 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((_, index) => (
        <li key={index}>
          <ProductCardSkeleton />
        </li>
      ))}
    </ul>
  );
}
