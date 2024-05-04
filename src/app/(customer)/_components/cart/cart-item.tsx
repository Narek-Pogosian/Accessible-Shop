"use client";

import { type CartItemType } from "@/context/cart-context/cart.types";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import { currency } from "@/lib/utils";
import { Trash } from "lucide-react";
import { announce } from "@react-aria/live-announcer";
import { forwardRef } from "react";
import Counter from "@/components/counter";
import Link from "next/link";

interface CartItemProps {
  cartItem: CartItemType;
}

const CartItem = forwardRef<HTMLAnchorElement, CartItemProps>(
  ({ cartItem }, ref) => {
    const { deleteFromCart, decrementCartItem, incrementCartItem } = useCart();

    function handleRemoveProductFromCart(productId: number) {
      deleteFromCart(productId);
      announce("Product removed from cart", "polite");
    }

    return (
      <li key={cartItem.productId} className="flex gap-4">
        {cartItem.product.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={cartItem.product.image ?? ""}
            width={130}
            height={90}
            alt={cartItem.product.altText ?? ""}
            className="rounded"
            aria-hidden
          />
        ) : (
          <div
            className="h-[80px] w-[120px] rounded bg-accent"
            aria-hidden
          ></div>
        )}
        <div className="flex w-full flex-col pr-1 pt-1">
          <div className="flex w-full justify-between">
            <Link
              href={`/shop/${cartItem.product.slug}`}
              className="text-lg font-semibold"
              ref={ref}
            >
              {cartItem.product.name}
            </Link>
            <Button
              variant="destructive"
              size="icon"
              className="size-8"
              onClick={() => handleRemoveProductFromCart(cartItem.productId)}
            >
              <Trash className="size-5" aria-hidden />
              <span className="sr-only">Remove</span>
            </Button>
          </div>

          <div className="mt-auto flex w-full items-center justify-between">
            <div className="font-medium text-muted-foreground">
              <p className="sr-only">
                Price is{" "}
                {currency(
                  parseFloat(cartItem.product.price) * cartItem.quantity,
                )}
              </p>
              <p aria-hidden>
                {currency(
                  parseFloat(cartItem.product.price) * cartItem.quantity,
                )}
              </p>
            </div>

            <Counter
              count={cartItem.quantity}
              decrement={() => decrementCartItem(cartItem.productId)}
              increment={() => incrementCartItem(cartItem.productId)}
            />
          </div>
        </div>
      </li>
    );
  },
);

CartItem.displayName = "CartItem";

export default CartItem;