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
        <div className="w-screen md:p-3 overflow-hidden">
          <div className=" hidden w-full px-5 border-2 md:flex flex-row md:flex-col rounded-lg border-blue-500">
            <Topbar />
            {children}

          </div>
          <div className="md:hidden block">
            <Search/>
          </div>

        </div>
      </body>
    </html>
  );
}
