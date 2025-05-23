"use client";

import React from "react";
import styles from "./style.module.scss";

interface FooterSection {
  columnNumber: number;
  content: string;
}

interface FooterContentSectionProps {
  footer: FooterSection[];
}

export default function FooterContentSection({ footer }: FooterContentSectionProps) {
  const grouped = Array.from({ length: 5 }, (_, i) =>
    footer.filter((item) => item.columnNumber === i + 1)
  );

  return (
    <footer className={styles.footerContainer}>
      <div className={styles.footerInner}>
        <div className={styles.footerColumns}>
          {grouped.map((column, index) => (
            <div key={index} className={styles.footerColumn}>
              {column.map((item, i) => (
                <div
                  key={i}
                  className={styles.footerItem}
                  dangerouslySetInnerHTML={{ __html: item.content }}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}
