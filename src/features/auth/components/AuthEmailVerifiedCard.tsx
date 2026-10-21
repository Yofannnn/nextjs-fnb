import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRightIcon, CheckCircle, HomeIcon, MailCheck } from "lucide-react";

export function AuthEmailVerifiedCard() {
  return (
    <Card className="max-w-md w-full mx-4 my-10 shadow-lg">
      <CardHeader className="text-center space-y-5">
        <div className="mx-auto relative">
          <div className="relative mx-auto flex items-center justify-center size-22 md:size-24 rounded-full bg-linear-to-br from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30">
            <MailCheck className="size-11 md:size-12 text-green-600 dark:text-green-400" />
          </div>
        </div>
        <CardTitle className="text-center text-2xl md:text-3xl">Email Verified! 🎉</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="bg-muted border border-forground rounded-xl p-5">
          <div className="flex gap-3">
            <CheckCircle className="size-4 md:size-5 shrink-0 mt-0.5" />
            <div className="space-y-2">
              <p className="text-xs md:text-sm font-semibold">Your email has been successfully verified!</p>
              <p className="text-xs md:text-sm">Thank you for confirming your email address. Your account is now fully activated and you can access all features.</p>
            </div>
          </div>
        </div>
        <div className="space-y-3 pt-2">
          <Button className="w-full group relative overflow-hidden" size="lg">
            <Link href="/member" className="w-full flex justify-center items-center gap-2">
              Go to Dashboard
              <ArrowRightIcon className="size-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
          <Button variant="outline" className="w-full" size="lg" asChild>
            <Link href="/">
              <HomeIcon className="size-4" />
              Back to Home
            </Link>
          </Button>
        </div>
      </CardContent>

      <CardFooter className="border-t pt-6">
        <div className="w-full text-center space-y-2">
          <p className="text-xs text-muted-foreground">🎊 You&apos;re all set! Start exploring your personalized dashboard.</p>
          <p className="text-xs text-muted-foreground">
            Need help?{" "}
            <Link href="/contact-support" className="text-primary hover:underline">
              Contact Support
            </Link>
          </p>
        </div>
      </CardFooter>
    </Card>
  );
}
