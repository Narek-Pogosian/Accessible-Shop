import { getProductBySlug } from "@/server/data-access/queries";
import { notFound } from "next/navigation";
import { formatCurrency } from "@/lib/utils";
import PageTitle from "@/components/page-title";
import ProductCounter from "../_components/product-counter";

async function ProductPage({ params }: PageProps<"slug">) {
  // Problably stupid but adding a tiny delay to make the navigation to details page smoother.
  // Remove if the skeleton shell is changed to something else like a spinner.
  await new Promise((resolve) => setTimeout(resolve, 50));

  const product = await getProductBySlug(params.slug);

  if (!product) notFound();

  return (
    <div className="container">
      <PageTitle>{product.name}</PageTitle>

      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <p className="sr-only">
            Price is {formatCurrency(parseFloat(product.price))}
          </p>
          <p aria-hidden className="mb-2 text-xl font-bold">
            {formatCurrency(parseFloat(product.price))}
          </p>
          <p className="mb-8 max-w-lg text-lg text-muted-foreground">
            {product.description}
          </p>
          <ProductCounter product={product} />
        </div>
        {product.image && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={product.image}
            alt={product.altText ?? ""}
            className="aspect-[3/2] rounded object-cover"
          />
        )}
      </div>
    </div>
  );
}

export default ProductPage;
