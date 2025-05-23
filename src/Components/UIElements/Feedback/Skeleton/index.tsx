import React from 'react';
import styles from './style.module.scss';

interface SkeletonProps {
  style?: React.CSSProperties;
  number?: number;
  type?:'rectangle' ;
}

const SkeletonComponent: React.FC<SkeletonProps> = ({
  style = {},
  number = 1,
  type = 'rectangle',
}) => {
  const array = new Array(number).fill(0);
  const baseSize = 16;

  if (!style.height) {
    style.height = `${100 / baseSize}rem`;
  }
  if (!style.width) {
    style.width ='100%';
  }

  return (
    <div className={styles.container}>
      {array.map((_, i) => (
        <div key={i} className={`${styles.skeleton} ${styles[type]}`} style={style}>
            <div className={styles.icon}>
            </div>          
        </div>
      ))}
    </div>
  );
};

export default SkeletonComponent;
