import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AppLoaderProvider from "@/components/layout/AppLoaderProvider";

export const metadata = {
  title: "TNG — The Next Growth | International Opportunities, Visas & Relocation",
  description:
    "Explore verified global opportunities to work, study, travel, and settle abroad with structured guidance from TNG (The Next Growth).",
  keywords: [
    "TNG",
    "The Next Growth",
    "Work Abroad",
    "Study Abroad",
    "Visa Assistance",
    "Immigration Consulting",
    "Global Opportunities",
    "Chancenkarte Germany",
    "Canada Study Permit",
    "Russia Work Visa",
    "Australia Skilled Migration",
  ],
  icons: {
    icon: "/icon.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen flex flex-col bg-[#F5F8FC] text-[#10233F] antialiased">
        <AppLoaderProvider>
          <Navbar />
          <main className="flex-1 w-full">{children}</main>
          <Footer />
        </AppLoaderProvider>
      </body>
    </html>
  );
}
