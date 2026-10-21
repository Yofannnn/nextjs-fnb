import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { BlurFade } from "@/components/ui/blur-fade";
import { homeImages } from "@/features/home-page/home-page.assets";

type Service = {
  title: string;
  description: string;
  footnote: string;
  image: string;
};

const services: Service[] = [
  {
    title: "Opening Hours",
    description: "Open daily for lunch and dinner. Kitchen closes 30 minutes before we do.",
    footnote: "Mon – Fri 11:00 – 22:00 · Sat – Sun 10:00 – 23:00",
    image: homeImages.services.opening,
  },
  {
    title: "Takeaway",
    description: "Order ahead and pick up fresh from the counter — no waiting in line.",
    footnote: "Ready in ~15 min · No pickup fee",
    image: homeImages.services.takeaway,
  },
  {
    title: "Delivery",
    description: "Get our kitchen delivered to your door through our delivery partners.",
    footnote: "~30 min · Available within city limits",
    image: homeImages.services.delivery,
  },
];

export function ServicesSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 px-4 md:px-12 py-14 text-white">
      {services.map((service, i) => (
        <BlurFade key={service.title} className="col-span-1 relative rounded-[30px] overflow-hidden p-6 md:p-4 lg:p-6" delay={0.3 + i * 0.1}>
          <Image src={service.image} width={400} height={200} alt={service.title} className="w-full h-full object-cover object-center absolute top-0 left-0" />
          <div className="absolute inset-0 bg-linear-to-b from-black/30 via-black/40 to-black/60" />
          <div className="relative flex flex-col gap-14">
            <div>
              <h3 className="text-4xl md:text-3xl lg:text-4xl font-bold mb-4">{service.title}</h3>
              <p className="font-medium text-base md:text-sm lg:text-base">{service.description}</p>
            </div>
            <div>
              <Separator className="bg-foreground" />
              <p className="mt-4 text-base md:text-sm lg:text-base">{service.footnote}</p>
            </div>
          </div>
        </BlurFade>
      ))}
    </div>
  );
}
