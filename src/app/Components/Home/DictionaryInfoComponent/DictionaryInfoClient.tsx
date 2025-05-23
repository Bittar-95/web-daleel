'use client';

import React from 'react';
import styles from './style.module.scss';
import ButtonComponent from '@/Components/UIElements/General/Button';
import FlexComponent from '@/Components/UIElements/Layout/Flex';
import { PagesConstant } from '@/Core/constant/PagesConstant';
import SoundSvg from '@/Assets/Icons/SoundSvg';

interface DictionaryInfoClientProps {
  dailyWordData: {
    name: string;
    description: string;
  };
}

const DictionaryInfoClient: React.FC<DictionaryInfoClientProps> = ({ dailyWordData }) => {
  const today = new Date().toLocaleDateString('ar-EG', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const word = dailyWordData?.name;
  const definition = dailyWordData?.description;

  const handleSpeak=(Data)=>{
    const utterance = new SpeechSynthesisUtterance(Data);
    utterance.lang = 'ar-EG'; 
    utterance.rate = 0.9;
    utterance.volume = 1;
    window.speechSynthesis.speak(utterance);
  }

  return (
    <div className={styles.container}>
      <div className={styles.aboutDictionary}>
        <h2>عن المعجم</h2>
        <p>
          يطلق مركز أبوظبي للّغة العربية معجمًا رقميًا متخصّصًا بهدف دعم المحتوى العربي الرقمي. ويشتمل المعجم على الألفاظ العربية الأكثر شيوعَا وفقَا للمدوّنات الرقمية العربية. وسيصدر على عدّة مراحل على الموقع الإلكتروني لمركز أبوظبي للّغة العربية مع نهاية عام 2021، وستستمر جهود بناء المعجم للوصول إلى مرجعٍ رقميٍّ متكاملٍ للناطقين بالعربية وغير الناطقين بها. ويتميز موقع وتطبيق هذا المعجم بسهولة استخدامه واحتوائه على عدد من الميّزات منها الصور التوضيحية وخاصية سماع طريقة لفظ الكلمات...
        </p>
        <ButtonComponent text="أعرف أكثر" size="small" />
      </div>

      <div className={styles.wordOfTheDay}>
        <div className={styles.containerHeader}>
          <h2>كلمة اليوم</h2>
          <div className={styles.date}>{today}</div>
        </div>

        <div>
          <FlexComponent gap=".5rem">
            <h3 className={styles.boldTitle}>{word}</h3>
            <div className={styles.icon} onClick={()=>{handleSpeak(word)}}>
                <SoundSvg />
            </div>
          </FlexComponent>
          <p>{definition}</p>
        </div>

        <ButtonComponent
          text="أعرف أكثر"
          Navigation={`${PagesConstant.info}/${word}`}
          size="small"
        />
      </div>
    </div>
  );
};

export default DictionaryInfoClient;
