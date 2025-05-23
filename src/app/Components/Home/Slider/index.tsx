'use client';

import React, { useState, useCallback } from 'react';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import styles from './style.module.scss';
import { IoChevronBack, IoChevronForward } from 'react-icons/io5';
import Image from 'next/image';

interface SlideData {
  id: number;
  content: string;
  multiMediaURL: string;
}

interface SliderComponentProps {
  data: SlideData[];
}

const SliderComponent: React.FC<SliderComponentProps> = ({ data }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    slideChanged: (s) => setCurrentSlide(s.track.details.rel),
    animation: { duration: 500, easing: (t) => t },
  });

  const isVideo = useCallback((url: string) => /\.mp4$/i.test(url), []);

  const openFullscreen = useCallback((url: string) => {
    const win = window.open();
    if (win) {
      win.document.write(`
        <html><head><title>عرض كامل</title></head>
        <body style="margin:0;display:flex;align-items:center;justify-content:center;background:#000;">
        ${isVideo(url)
          ? `<video src="${url}" autoplay controls loop style="width:100%;height:100%;object-fit:contain;"></video>`
          : `<img src="${url}" style="width:100%;height:100%;object-fit:contain;" />`}
        </body></html>`);
      win.document.close();
    }
  }, [isVideo]);

  return (
    <div className={styles.sliderWrapper} dir="ltr">
      <div ref={sliderRef} className={`keen-slider ${styles.slider}`}>
        {data.map((slide) => (
          <div
            key={slide.id}
            className={`keen-slider__slide ${styles.slide}`}
            onClick={() => openFullscreen(slide.multiMediaURL)}
          >
            {isVideo(slide.multiMediaURL) ? (
              <video
                src={slide.multiMediaURL}
                className={styles.media}
                autoPlay
                loop
                muted
                playsInline
              />
            ) : (
              <Image
                src={slide.multiMediaURL}
                className={styles.media}
                alt={`slide-${slide.id}`}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
                style={{ objectFit: 'cover' }}
              />
            )}
            <div
              className={styles.contentOverlay}
              dangerouslySetInnerHTML={{ __html: slide.content }}
            />
          </div>
        ))}
      </div>

      <div className={styles.arrows}>
        <button
          className={styles.arrowLeft}
          aria-label="السابق"
          onClick={() => instanceRef?.current?.prev()}
        >
          <IoChevronBack size={24} />
        </button>
        <button
          className={styles.arrowRight}
          aria-label="التالي"
          onClick={() => instanceRef?.current?.next()}
        >
          <IoChevronForward size={24} />
        </button>
      </div>

      <div className={styles.dots}>
        {data.map((_, idx) => (
          <button
            key={idx}
            aria-label={`انتقل إلى الشريحة ${idx + 1}`}
            onClick={() => instanceRef?.current?.moveToIdx(idx)}
            className={`${styles.dot} ${currentSlide === idx ? styles.active : ''}`}
          />
        ))}
      </div>
    </div>
  );
};

export default React.memo(SliderComponent);
