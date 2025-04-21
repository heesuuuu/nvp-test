'use client'; 

import { usePathname } from 'next/navigation';
import Header from '@/components/layout/header/Header';
import Home from './home/home';



export default function Page() {
  const pathname = usePathname();
  const isMainPage = pathname === '/';

  return (
    <div
    >
      {!isMainPage && <Header />}
      <Home />
    </div>
  );
}
