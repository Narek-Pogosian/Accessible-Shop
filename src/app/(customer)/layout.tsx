import Header from "./_components/header";
import Footer from "./_components/footer";
import SkipLink from "./_components/skip-link";
import { CartProvider } from "@/context/cart-context";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <div className="flex min-h-full flex-col">
        <SkipLink />
        <Header />
        <main className="flex-1 pb-10" tabIndex={-1}>
          {children}
        </main>
        <Footer />
      </div>
    </CartProvider>
  );
}
