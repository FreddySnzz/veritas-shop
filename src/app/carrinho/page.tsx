import { Header } from "@/components/Header";
import Cart from "@/components/Cart";

export default function CartPage() {
  return (
    <div className="flex flex-col h-dvh overflow-hidden">
      <Header mode="cart" />
      <main className="flex-1 flex flex-col bg-background-alternative overflow-hidden mt-14">
        <Cart />
      </main>
    </div>
  );
};