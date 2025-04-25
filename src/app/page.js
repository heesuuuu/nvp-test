'use client';

import { usePathname } from 'next/navigation';
import Header from '@/components/layout/header/Header';
import Home from './home/home';
import "../scss/styles.scss"; 

export default function Page() {
  const pathname = usePathname();
  const isMainPage = pathname === '/';

  return (
    <div className="page-container">
      {!isMainPage && <Header />}
      <div className="content">
        <Home />
      </div>
    </div>
  );
}
