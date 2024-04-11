
import Search from '@/app/components/Pages/Search'
import Popular from '@/app/components/Pages/Popular'
import Popular from '@/app/components/Navigation/TopNav'


export default function Home() {
  return (
    <div className="W-full h-full">
      <TopNav />
      <Search />
      <Popular />
    </div>
  );
}
