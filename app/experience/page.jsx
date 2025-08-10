"use client";
import dynamic from "next/dynamic";
import { Navbar, Footer, PerformanceMonitor } from "@/src/components";

const Experience = dynamic(() => import("@/src/components/Experience"), {
  ssr: false,
});

export default function ExperiencePage() {
  return (
    <div className="relative z-0 bg-primary min-h-screen">
      <PerformanceMonitor />
      <div className="fixed top-0 left-0 w-full z-50">
        <Navbar />
      </div>
      <main className="pt-20">
        <section id="experience" className="min-h-screen">
          <Experience />
        </section>
      </main>
      <Footer />
    </div>
  );
}
