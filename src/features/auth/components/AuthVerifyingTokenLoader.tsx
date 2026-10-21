import { LoadingSpinner } from "@/components/ui/loader";

export function AuthVerifyingTokenLoader() {
  return (
    <main className="flex h-svh flex-col items-center justify-center gap-5">
      <LoadingSpinner />
      <h1 className="text-center text-xl md:text-2xl font-semibold">Please wait...</h1>
    </main>
  );
}
