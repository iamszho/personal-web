import Button from "@/components/Button";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="bg-canvas px-8 pt-24 pb-20 flex flex-col items-center text-center max-w-[1400px] mx-auto">

      {/* Headline */}
      <h1 className="text-[60px] font-normal leading-[60px] tracking-[-0.65px] text-ink-strong max-w-3xl mb-6 max-md:text-[32px] max-md:leading-[36px]">
        Building things for the web
      </h1>

      {/* Supporting copy */}
      <p className="text-body text-lg leading-7 max-w-xl mb-10">
        I design and develop products that live at the intersection of clean engineering and thoughtful design.
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

    </section>
  );
}
