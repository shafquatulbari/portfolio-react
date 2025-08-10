"use client";
import dynamic from "next/dynamic";
import { Navbar, Footer, PerformanceMonitor } from "@/src/components";

const NeuralProfile = dynamic(() => import("@/src/components/NeuralProfile"), {
  ssr: false,
});

export default function NeuralProfilePage() {
  return (
    <div className="relative z-0 bg-primary min-h-screen">
      <PerformanceMonitor />
      <div className="fixed top-0 left-0 w-full z-50">
        <Navbar />
      </div>
      <main className="pt-20">
        <section id="neural-profile" className="min-h-screen">
          <NeuralProfile />
        </section>
      </main>
      <Footer />
    </div>
  );
}
