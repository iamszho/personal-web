import Hero from "@/components/sections/Hero";
import LockScroll from "@/components/LockScroll";

export default function HomePage() {
  return (
    <main className="flex-1 w-full">
      <LockScroll />
      <Hero />
    </main>
  );
}
