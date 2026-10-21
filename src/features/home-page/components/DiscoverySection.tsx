import Image from "next/image";
import Link from "next/link";
import { BlurFade } from "@/components/ui/blur-fade";
import { GradualSpacing } from "@/components/ui/gradual-spacing";
import { ArrowRight } from "lucide-react";
import { homeImages } from "@/features/home-page/home-page.assets";

type Card = {
  title: string;
  description: string;
  href: string;
  image: string;
  span: string;
};

const cards: Card[] = [
  {
    title: "About Us",
    description: "A neighbourhood kitchen built around seasonal produce, slow mornings, and long dinners.",
    href: "/about",
    image: homeImages.discovery.aboutus,
    span: "col-span-1 md:col-span-3 lg:col-span-2",
  },
  {
    title: "Menu",
    description: "Small plates, wood-fired mains, and a rotating list of natural wines.",
    href: "/menu",
    image: homeImages.discovery.menu,
    span: "col-span-1 md:col-span-2 lg:col-span-1",
  },
  {
    title: "Reviews",
    description: "What guests and press are saying after their visit.",
    href: "/reviews",
    image: homeImages.discovery.reviews,
    span: "col-span-1 md:col-span-2 lg:col-span-1",
  },
  {
    title: "Reservation",
    description: "Book a table for lunch or dinner. Walk-ins welcome when we have space.",
    href: "/reservation",
    image: homeImages.discovery.reservation,
    span: "col-span-1 md:col-span-3 lg:col-span-2",
  },
];

export function DiscoverySection() {
  return (
    <div className="px-4 md:px-12 py-14">
      <div className="grid grid-cols-1 md:grid-cols-2 items-center mb-12 gap-4 md:gap-0">
        <p className="col-span-1 text-muted-foreground md:w-[80%] text-center md:text-start text-base md:text-sm lg:text-base">
          A quick look at who we are, what we cook, and how to join us for a meal.
        </p>
        <GradualSpacing className="col-span-1 text-5xl lg:text-7xl font-bold md:text-end tracking-tighter" text="Discover" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-5 lg:grid-cols-3 gap-6 text-white">
        {cards.map((card, i) => (
          <BlurFade key={card.title} className={`${card.span} h-87.5 flex relative overflow-hidden p-3 rounded-[30px] group`} delay={0.3 + i * 0.08} blur="0px">
            <Image
              src={card.image}
              width={300}
              height={400}
              alt={card.title}
              className="w-full h-full object-cover object-center absolute top-0 left-0 group-hover:scale-105 transition-all duration-500"
            />
            <div className="relative rounded-[20px] w-full h-fit backdrop-blur-none group-hover:backdrop-blur-md transition-all duration-500 self-end p-6 overflow-hidden">
              <h4 className="text-4xl font-bold">{card.title}</h4>
              <p className="max-h-0 group-hover:max-h-40 overflow-hidden transition-all duration-500 opacity-0 group-hover:opacity-100 mt-4">{card.description}</p>
            </div>
            <Link href={card.href} aria-label={card.title} className="absolute inset-0 rounded-[30px]">
              <span className="absolute top-3 right-3 w-12 h-12 rounded-full border-2 border-foreground group-hover:bg-foreground flex justify-center items-center transition-all duration-500">
                <ArrowRight className="group-hover:text-background transition-all duration-500" />
              </span>
            </Link>
          </BlurFade>
        ))}
      </div>
    </div>
  );
}
