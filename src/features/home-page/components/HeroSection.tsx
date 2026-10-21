"use client";

import Image from "next/image";
import Link from "next/link";
import { homeImages } from "@/features/home-page/home-page.assets";
import { useIsMobile } from "@/hooks/useMobile";
import { Poppins } from "next/font/google";

const title = Poppins({ variable: "--font-poppins", weight: "600", subsets: ["latin"], style: "italic" });
const desc = Poppins({ variable: "--font-poppins", weight: "400", subsets: ["latin"] });

export function HeroSection() {
  const isMobile = useIsMobile();
  return (
    <div className="w-vw h-svh p-4">
      <div className="w-full h-full relative rounded-[30px] overflow-hidden flex justify-center items-center p-2">
        <Image
          src={isMobile ? homeImages.hero.portrait : homeImages.hero.landscape}
          width={700}
          height={700}
          alt="hero-image"
          className="w-full h-full object-cover object-center absolute top-0 left-0"
        />
        <div className="absolute inset-0 bg-linear-to-b from-black/30 via-black/40 to-black/60" />
        <div className="z-10 min-w-8/12 max-w-full p-1">
          <h1 className={`${title.className} text-center text-7xl md:text-8xl lg:text-9xl font-bold my-5 text-white`}>WHIFF</h1>
          <p className={`${desc.className} text-center font-semibold text-xs md:text-sm lg:text-base text-white`}>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. <br /> Magni architecto veniam ullam accusamus, quia ipsam accusantium
          </p>
        </div>
        <div className="z-10 absolute -bottom-2 -right-2">
          <span />
          <div className="bg-background p-3 rounded-tl-[30px]">
            <Link href="/menu" className="inline-block font-semibold text-base lg:text-xl px-6 py-3 rounded-full border border-foreground">
              Explore Menu&apos;s
            </Link>
          </div>
          <span />
        </div>
      </div>
    </div>
  );
}
