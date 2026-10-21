import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function CheckoutEmptyState() {
  const router = useRouter();

  return (
    <div className="w-full h-svh flex flex-col gap-4 justify-center items-center">
      <h1 className="text-center text-xl md:text-2xl font-semibold">Please select a product to checkout</h1>
      <div className="flex gap-4">
        <Button onClick={() => router.back()}>Go Back</Button>
        <Button onClick={() => router.push("/menu")}>Go to Menu</Button>
        <Button onClick={() => router.push("/cart")}>Go to Cart</Button>
      </div>
    </div>
  );
}
