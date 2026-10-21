import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function CheckoutErrorState() {
  const router = useRouter();

  return (
    <div className="w-full h-svh flex flex-col gap-4 justify-center items-center">
      <h1 className="text-center text-xl text-semibold">Something went wrong loading your cart</h1>
      <Button onClick={() => router.back}>Back</Button>
    </div>
  );
}
