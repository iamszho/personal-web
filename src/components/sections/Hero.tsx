import Button from "@/components/Button";
import VantaBackground from "@/components/VantaBackground";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative bg-canvas w-full min-h-screen overflow-hidden">
      <VantaBackground />

      <div className="relative z-10 max-w-[1400px] mx-auto px-8 pt-36 pb-32 flex flex-col items-center text-center">

        {/* Headline */}
        <h1 className="text-[96px] font-normal leading-[104px] tracking-[-2px] text-ink-strong mb-10 max-md:text-[48px] max-md:leading-[56px]">
          Hola, soy Angel Manuel
        </h1>

        {/* Supporting copy */}
        <p className="text-body text-2xl leading-10 mb-16 max-md:text-lg max-md:leading-8">
          De pipelines de datos a productos en producción. Transformo problemas complejos en sistemas que funcionan.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap gap-4 justify-center">
          <Button variant="primary">
            <Link href="/projects">View Projects</Link>
          </Button>
          <Button variant="outline">
            <Link href="/about-me">About Me</Link>
          </Button>
        </div>

      </div>
    </section>
  );
}
