import React from "react";
import { ArrowRight } from "lucide-react";

const TransformationFlow = () => {
  return (
    <section className="py-16 md:py-24 bg-background text-center">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12">
          <div className="text-4xl md:text-5xl font-serif text-primary font-bold">Stuck</div>
          <ArrowRight className="h-12 w-12 text-brand-pink animate-pulse" />
          <div className="text-4xl md:text-5xl font-serif text-primary font-bold">Empowered</div>
        </div>
      </div>
    </section>
  );
};

export default TransformationFlow;