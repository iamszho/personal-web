import Button from "@/components/Button";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#101010] text-[#f2f2f2] flex flex-col items-center justify-center gap-8 px-8">
      <p className="font-mono text-xs font-semibold tracking-[2.52px] uppercase text-[#00d992]">
        Personal Web
      </p>

      <h1 className="text-[60px] font-normal leading-[60px] tracking-[-0.65px] text-white text-center max-w-3xl">
        Design System Preview
      </h1>

      <p className="text-[#bdbdbd] text-base leading-[26px] text-center max-w-xl">
        Button variants — 0 px border radius, hairline borders, electric-green accent.
      </p>

      <div className="flex flex-wrap gap-4 items-center">
        <Button variant="primary">Get Started</Button>
        <Button variant="outline">Learn More</Button>
        <Button variant="ghost">Read the docs →</Button>
      </div>

      <div className="mt-4 flex flex-wrap gap-3 items-center">
        <span className="inline-flex items-center px-3 py-1 rounded-full border border-[#3d3a39] text-xs font-semibold text-[#f2f2f2]">
          Live
        </span>
        <span className="inline-flex items-center px-3 py-1 rounded-full border border-[#3d3a39] text-xs font-semibold text-[#f2f2f2]">
          Beta
        </span>
      </div>
    </main>
  );
}
