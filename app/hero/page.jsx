"use client";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import { Navbar, Footer, PerformanceMonitor } from "@/src/components";

const Hero = dynamic(() => import("@/src/components/Hero"), {
  ssr: false,
  loading: () => <div className="p-10">Loading hero...</div>,
});

export default function HeroPage() {
  return (
    <div className="relative z-0 bg-primary min-h-screen">
      <PerformanceMonitor />
      <div className="fixed top-0 left-0 w-full z-50">
        <Navbar />
      </div>

      <div className="fixed top-0 left-0 w-full h-1 bg-gray-800 z-40">
        <div
          className="h-full bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 transition-all duration-300 ease-out"
          style={{ width: "var(--scroll-progress, 0%)" }}
        />
      </div>

      <main className="pt-20">
        <section id="hero" className="min-h-screen">
          <Suspense fallback={<div className="p-10">Loading hero...</div>}>
            <Hero />
          </Suspense>
        </section>
      </main>

      <Footer />
    </div>
  );
}
