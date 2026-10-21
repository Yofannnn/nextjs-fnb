import Link from "next/link";
import { Eczar, Poppins } from "next/font/google";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/class-name.util";
import { ChevronLeftIcon } from "lucide-react";

const eczar = Eczar({ variable: "--font-eczar", weight: "400", subsets: ["latin"] });
const poppins = Poppins({ variable: "--font-poppins", weight: "400", subsets: ["latin"] });

export default function NotFoundPage() {
  return (
    <main className="relative h-svh overflow-hidden bg-background p-4">
      <Button variant="outline" size="lg" asChild>
        <Link href="/">
          <ChevronLeftIcon className="size-6" />
          Home
        </Link>
      </Button>
      <div className="relative h-full select-none">
        <h1
          className={cn(
            eczar.className,
            "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-45 text-[min(75svh,75svw)] leading-none tracking-wide text-[oklch(0.22_0_0)] transition-all duration-700 ease-in-out hover:text-[oklch(0.9_0_0)]",
          )}
        >
          404
        </h1>
      </div>
      <p
        className={cn(
          poppins.className,
          "fixed bottom-4 right-6 m-0 w-[70%] text-right text-[calc(1rem+3vmin)] text-[oklch(0.9_0_0)] drop-shadow-[1px_1px_0_oklch(0.15_0_0)] sm:w-1/2 lg:w-[30%] xl:w-1/4",
        )}
      >
        The page you&apos;re looking for does not exist.
      </p>
    </main>
  );
}
