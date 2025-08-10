"use client";
import dynamic from "next/dynamic";
import { Navbar, Footer, PerformanceMonitor } from "@/src/components";

const NeuralMatrix = dynamic(() => import("@/src/components/NeuralMatrix"), {
  ssr: false,
});

export default function NeuralMatrixPage() {
  return (
    <div className="relative z-0 bg-primary min-h-screen">
      <PerformanceMonitor />
      <div className="fixed top-0 left-0 w-full z-50">
        <Navbar />
      </div>
      <main className="pt-20">
        <section id="neural-matrix" className="min-h-screen">
          <NeuralMatrix />
        </section>
      </main>
      <Footer />
    </div>
  );
}
