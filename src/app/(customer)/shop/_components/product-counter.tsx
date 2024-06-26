"use client";

import { type Product } from "@/server/schema/products";
import { ShoppingBag } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import { announce } from "@react-aria/live-announcer";
import Counter from "@/components/counter";

interface ProductCounterProps {
  product: Product;
}

function ProductCounter({ product }: ProductCounterProps) {
  const { addToCart } = useCart();
  const [count, setCount] = useState(1);

  function handleAddToCart() {
    addToCart({ product, quantity: count, productId: product.id });
    announce(`Added ${count} ${product.name} to cart`, "assertive");
    setCount(1);
  }

  function increment() {
    setCount((prevCount) => prevCount + 1);
  }

  function decrement() {
    setCount((prevCount) => prevCount - 1);
  }

  return (
    <div className="flex w-full items-center gap-6">
      <Counter count={count} decrement={decrement} increment={increment} />
      <Button className="relative" onClick={handleAddToCart}>
        <ShoppingBag className="size-6" aria-hidden />
        <span className="ml-2">Add to cart</span>
      </Button>
    </div>
  );
}

export default ProductCounter;
