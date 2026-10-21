import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { ProductImage } from "@/features/product/types/product.type";
import Image from "next/image";

interface ProductImageGalleryProps {
  images: ProductImage[];
  productName: string;
}

export function ProductImageGallery({ images, productName }: ProductImageGalleryProps) {
  return (
    <Carousel className="w-3/5 md:w-4/5">
      <CarouselContent>
        {images.map((image: any, index: number) => (
          <CarouselItem key={index}>
            <Image key={index} src={image.url} width={500} height={500} alt={image?.altText || productName} loading="lazy" />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
