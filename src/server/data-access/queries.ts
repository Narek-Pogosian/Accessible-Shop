import "server-only";
import { type ProductsSearchParams } from "@/lib/validations/products-searchparams";
import { PAGE_SIZE } from "@/config";
import { products } from "../schema";
import { db } from "../db";
import { and, asc, desc, eq, gte, lte } from "drizzle-orm";

function getOrderBy(
  orderBy: ProductsSearchParams["orderBy"],
  dir: ProductsSearchParams["dir"],
) {
  const order = dir === "asc" ? asc : desc;

  switch (orderBy) {
    case "name":
      return order(products.name);
    case "price":
      return order(products.price);
    default:
      return order(products.createdAt);
  }
}

export async function getProducts({
  category,
  dir,
  orderBy,
  page,
  maxPrice,
  minPrice,
}: ProductsSearchParams) {
  const query = db
    .select()
    .from(products)
    .offset(Number(page) > 1 ? (Number(page) - 1) * PAGE_SIZE : 0)
    .limit(PAGE_SIZE)
    .where(
      and(
        category ? eq(products.category, category) : undefined,
        maxPrice ? lte(products.price, maxPrice) : undefined,
        minPrice ? gte(products.price, minPrice) : undefined,
      ),
    )
    .orderBy(getOrderBy(orderBy, dir));

  return query;
}

export async function getProductBySlug(slug: string) {
  return db.query.products.findFirst({ where: eq(products.slug, slug) });
}
