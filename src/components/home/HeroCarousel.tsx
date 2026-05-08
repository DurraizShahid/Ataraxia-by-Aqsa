import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useSiteImages } from "@/context/SiteImagesContext";

const HeroCarousel = () => {
  const { images } = useSiteImages();

  const heroImages = [images.hero_slide_1, images.hero_slide_2, images.hero_slide_3];

  return (
    <section className="relative">
      <Carousel>
        <CarouselContent>
          {heroImages.map((src, i) => (
            <CarouselItem key={i}>
              <div
                className="w-full h-[80vh] bg-cover bg-center flex items-center"
                style={{ backgroundImage: `url(${src})` }}
              >
                <div className="container mx-auto px-4 text-left text-white">
                  <p className="text-sm uppercase tracking-[0.2em] mb-4">Psychotherapy</p>
                  <h1 className="text-5xl md:text-7xl font-serif max-w-2xl">
                    Tranquility in Transformation
                  </h1>
                  <div className="mt-8 flex gap-4">
                    <Button size="lg" asChild>
                      <Link to="/book-call">Book a Session</Link>
                    </Button>
                    <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-primary">
                      Learn More
                    </Button>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-8 h-12 w-12 bg-background/50 hover:bg-background border-none text-foreground" />
        <CarouselNext className="absolute right-8 h-12 w-12 bg-background/50 hover:bg-background border-none text-foreground" />
      </Carousel>
    </section>
  );
};

export default HeroCarousel;
