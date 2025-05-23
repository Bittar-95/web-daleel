"use client";

import "@/Assets/css/style.css";
import styles from "./Layout.module.scss";
import Header from "@/Components/Layout/Header";
import TopLoaderComponent from "@/Components/Loading/TopLoaderComponent";
import { Cairo } from 'next/font/google';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import Footer from "./Footer/insex";
import { SectionService } from "@/Services/ApiService/URL/Section.Service";
import useNormalFetch from "@/Services/ApiService/useNormalFetch";

const cairo = Cairo({ subsets: ['arabic'], display: 'swap' });

export default function AppProviderLayout({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  const {data:DataLayeout}=useNormalFetch({
    url:SectionService.SectionGetSections,
    enabled:true,
  });

  return (
    <body className={`${styles.body} ${cairo.className}`}>
      <QueryClientProvider client={queryClient}>
        <TopLoaderComponent />
        <div className={styles.wrapper}>
          {DataLayeout?.header&&DataLayeout?.footer&&DataLayeout?.logosAndImages&&<>
            <Header headerData={DataLayeout?.header} logoUrl={DataLayeout?.logosAndImages[0]?.url} />
            <main className={styles.main}>{children}</main>
            <Footer  footer={DataLayeout?.footer}/>          
            </>}
        </div>
      </QueryClientProvider>
    </body>
  );
}
