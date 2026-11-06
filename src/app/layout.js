import "./globals.css";

export const metadata = {
  title: "Sunrize Tranzit Ltd",
  description: "Removals, Man & Van & Courier Services – 24/7.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en-GB">
      <body>{children}</body>
    </html>
  );
}
