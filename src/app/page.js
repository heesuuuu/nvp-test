'use client';

import { usePathname } from 'next/navigation';
import Header from '@/components/layout/header/Header';
import Home from './home/home';
import "../scss/styles.scss"; 
import axios from 'axios';

export default function Page() {
  const pathname = usePathname();
  const isMainPage = pathname === '/';
  axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;
  axios.defaults.withCredentials = true;
  
  return (
    <div className="page-container">
      {!isMainPage && <Header />}
      <div className="content">
        <Home />
      </div>
    </div>
  );
}
