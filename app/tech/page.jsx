"use client";
import dynamic from "next/dynamic";
import { Navbar, Footer, PerformanceMonitor } from "@/src/components";

const Tech = dynamic(() => import("@/src/components/Tech"), {
  ssr: false,
});

export default function TechPage() {
  return (
    <div className="relative z-0 bg-primary min-h-screen">
      <PerformanceMonitor />
      <div className="fixed top-0 left-0 w-full z-50">
        <Navbar />
      </div>
      <main className="pt-20">
        <section id="tech" className="min-h-screen">
          <Tech />
        </section>
      </main>
      <Footer />
    </div>
  );
}
