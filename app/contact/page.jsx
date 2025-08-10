"use client";
import dynamic from "next/dynamic";
import { Navbar, Footer, PerformanceMonitor } from "@/src/components";

const Contact = dynamic(() => import("@/src/components/Contact"), {
  ssr: false,
});

export default function ContactPage() {
  return (
    <div className="relative z-0 bg-primary min-h-screen">
      <PerformanceMonitor />
      <div className="fixed top-0 left-0 w-full z-50">
        <Navbar />
      </div>
      <main className="pt-20">
        <section id="contact" className="min-h-screen">
          <Contact />
          <Footer />
        </section>
      </main>
    </div>
  );
}
