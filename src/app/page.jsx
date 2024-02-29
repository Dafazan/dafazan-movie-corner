import Image from "next/image";
import Search from '@/app/components/Pages/Search'
import Popular from '@/app/components/Pages/Popular'


export default function Home() {
  return (
    <main className="W-full h-full">
      <Search />
      <Popular />
    </main>
  );
}
