"use client";

import { useCallback, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import styles from "./Header.module.scss";
import MenuSvg from "@/Assets/Icons/MenuSvg";
import clsx from "clsx";
import Image from "next/image";

interface HeaderItem {
  content: string;
  
}

interface HeaderProps {
  headerData: HeaderItem[];
  logoUrl: string;
}

export default function Header({ headerData,logoUrl }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const [origin, setOrigin] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setOrigin(window.location.origin);
    }
  }, []);

  const toggleMenu = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setIsOpen(false);
  }, []);

  const extractHref = (html: string): string | null => {
    const match = html.match(/href="([^"]*)"/);
    return match ? match[1] : null;
  };

  const injectActiveClass = (html: string, isActive: boolean): string => {
    if (!isActive) return html;
    return html.replace(/<a /, `<a class="${styles.active}" `);
  };

  return (
    <header className={styles.header}>
      <div className={styles.content}>
        <div className={styles.innerContent}>
          <div className={styles.logo}>
            <a href="/" aria-label="العودة للرئيسية">
              {logoUrl?.length>0&&
              <Image
                  src={logoUrl}
                  alt="شعار الموقع"
                  width={160}
                  height={74}
                  className={styles.logo}
                  priority
                />}
            </a>
          </div>
          <button
            className={styles.toggle}
            onClick={toggleMenu}
            aria-label="تبديل القائمة"
            aria-expanded={isOpen}
            aria-controls="main-navigation"
          >
            <MenuSvg />
          </button>
        </div>

        <nav
          id="main-navigation"
          className={clsx(styles.nav, { [styles.show]: isOpen })}
        >
          {headerData?.map((item, index) => {
            const href = extractHref(item.content);
            let isActive = false;

            if (href && origin) {
              try {
                const parsedUrl = new URL(href, origin);
                isActive = parsedUrl.origin === origin && parsedUrl.pathname === pathname;
              } catch {}
            }

            const finalContent = injectActiveClass(item.content, isActive);

            return (
              <div
                key={index}
                className={styles.navLinkWrapper}
                dangerouslySetInnerHTML={{ __html: finalContent }}
                onClick={closeMenu}
              />
            );
          })}
        </nav>
      </div>
    </header>
  );
}
