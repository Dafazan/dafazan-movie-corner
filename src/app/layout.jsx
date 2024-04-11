import { Saira } from "next/font/google";
import "./globals.css";
import Search from '@/app/components/Pages/Search'
import Topbar from "./components/Navigation/Topbar";

const typh = Saira({ subsets: ["latin"] });

export const metadata = {
  title: "Movie Corner",
  description: "Movie Corner By Dafazan",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={typh.className}>
        <div className="w-screen p-3 overflow-y-hidden">
          <div className="w-full px-5 border-2 rounded-lg border-blue-500">
            <Topbar />
            {children}

          </div>

        </div>
      </body>
    </html>
  );
}
