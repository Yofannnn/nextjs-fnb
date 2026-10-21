"use client";

import Image from "next/image";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { Mail, MessageCircle } from "lucide-react";
import { FadeText } from "@/components/ui/fade-text";
import { BlurFade } from "@/components/ui/blur-fade";
import { useSession } from "@/stores/session.store";
import { cn } from "@/lib/class-name.util";
import { homeImages } from "@/features/home-page/home-page.assets";

export function FooterSection() {
  const user = useSession((state) => state.user);
  const isAuth = user !== null;

  return (
    <footer className="w-vw p-4 mt-14 text-white">
      <div className="w-full h-full relative overflow-hidden rounded-[30px]">
        <Image src={homeImages.footer} width={500} height={500} alt="footer-image" className="w-full h-full object-cover object-center absolute top-0 left-0" />
        <div className={cn("z-10 relative h-full w-full p-2 md:p-8 flex flex-col justify-around items-center gap-8", isAuth && "min-h-125")}>
          {!isAuth && (
            <div className="flex flex-col justify-center items-center gap-6 p-8">
              <FadeText
                className="text-6xl md:text-7xl lg:text-8xl font-bold"
                direction="up"
                framerProps={{
                  show: { transition: { delay: 0.45 } },
                }}
                text="Join Member Now"
              />
              <BlurFade delay={0.4} blur="0px">
                <Link
                  href="/register"
                  className="inline-block px-9 lg:px-10 py-2 rounded-full font-bold border-2 border-foreground bg-foreground text-background hover:bg-transparent hover:text-foreground transition-all duration-500"
                >
                  Sign Up
                </Link>
              </BlurFade>
            </div>
          )}
          <div className="w-full h-full backdrop-blur rounded-[20px] p-2 md:p-8 flex flex-col justify-around items-center gap-5">
            <div className="flex justify-center items-center gap-3">
              <div>
                <Link href="mailto:" className="inline-block p-4 rounded-full border border-foreground">
                  <Mail className="size-5 md:size-7" />
                </Link>
              </div>
              <div>
                <Link href="/" className="inline-block p-4 rounded-full border border-foreground">
                  <MessageCircle className="size-5 md:size-7" />
                </Link>
              </div>
            </div>
            <Separator className="bg-foreground" />
            <div className="flex justify-center items-center gap-4">
              <div className="flex flex-col md:flex-row justify-center items-center gap-2 md:gap-3 text-base md:text-xl font-semibold">
                <Link href="/">Location</Link>
                <Link href="/faq">FAQ</Link>
              </div>
              <Separator className="bg-foreground h-20 md:h-10" orientation="vertical" />
              <div className="flex flex-col md:flex-row justify-center items-center gap-2 md:gap-3 text-base md:text-xl font-semibold">
                <Link href="/menu">Menu</Link>
                <Link href="/reservation">Reservation</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
