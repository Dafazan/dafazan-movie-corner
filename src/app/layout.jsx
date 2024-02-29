import { Saira } from "next/font/google";
import "./globals.css";

const typh = Saira({ subsets: ["latin"] });

export const metadata = {
  title: "Movie Corner",
  description: "Movie Corner By Dafazan",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={typh.className}>{children}</body>
    </html>
  );
}
