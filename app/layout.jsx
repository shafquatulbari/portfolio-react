import "./globals.css";

export const metadata = {
  title: "Shafquat | Portfolio",
  description: "Portfolio built with Next.js and Tailwind",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full bg-primary">
      <body className="min-h-screen bg-primary text-white antialiased">
        {children}
      </body>
    </html>
  );
}
