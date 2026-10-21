import Image from "next/image";
import { WordPullUp } from "@/components/ui/word-pull-up";
import { homeImages } from "@/features/home-page/home-page.assets";

export function AboutSection() {
  return (
    <div className="grid grid-col-1 md:grid-cols-2 gap-16 px-4 md:px-12 py-14">
      <div className="col-span-1 flex items-center justify-between">
        <div className="flex flex-col justify-between gap-4">
          <h2 className="text-3xl lg:text-4xl font-bold">From passion to taste.</h2>
          <p className="text-muted-foreground">All in the name of satisfaction.</p>
        </div>
        <Image src={homeImages.about} alt="about-image" width={150} height={150} className="h-fit w-[38%] md:w-[40%] lg:w-[38%] rounded-2xl" />
      </div>
      <div className="col-span-1 flex justify-center items-center">
        <WordPullUp words="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Impedit amet quisquam aperiam minima." className="text-2xl lg:text-3xl" />
      </div>
    </div>
  );
}
