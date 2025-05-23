'use client';

import React from 'react';
import styles from "./style.module.scss";

type DividerType = 'dash' | 'solid';
type TypeVariant = 1 | 2;

type TitleProps = {
  text?: string;                 
  type?: DividerType;             
  look?: boolean;
  style?: React.CSSProperties;
  variant?: TypeVariant;          // 1 = only divider, 2 = divider + text
};

function DividerComponent({ text, type = 'dash', look, style, variant = 2 }: TitleProps) {
  if (variant === 1) {
    return (
      <div className={styles.simpleDivider} style={style}></div>
    );
  }

  const dividerClass = `${styles.divider} ${styles[type ?? 'dash']}`;

  return (
    <div className={`${styles.title} ${look && styles.look}`} style={style}>
      <div className={dividerClass}></div>
      <p className={styles.text}>{text}</p>
      <div className={dividerClass}></div>
    </div>
  );
}

export default DividerComponent;
