'use client';
import React from 'react';
import styles from './style.module.scss';
import FlexComponent from '@/Components/UIElements/Layout/Flex';
import SoundSvg from '@/Assets/Icons/SoundSvg';
import ShareSvg from '@/Assets/Icons/ShareSvg';
import DislikeSvg from '@/Assets/Icons/DislikeSvg';
import LikeSvg from '@/Assets/Icons/LikeSvg';
import DividerComponent from '@/Components/UIElements/Layout/Divider';
import ButtonComponent from '@/Components/UIElements/General/Button';
import SpaceComponent from '@/Components/UIElements/Layout/Space';

interface MeaningDetail {
  id: number;
  name: string;
  gloss: string;
  example: string;
  synonyms: string[];
  conjugations?: string[];
}

interface InfoDetailComponentProps {
  wordData: {
    keyWord: string;
    title: string;
    meaningDetails: MeaningDetail[];
    seoKeyWords?: string[];
  };
}

function InfoDetailComponent({ wordData }: InfoDetailComponentProps) {

  const handleSpeak=(Data)=>{
    const utterance = new SpeechSynthesisUtterance(Data);
    utterance.lang = 'ar-EG'; 
    utterance.rate = 0.9;
    utterance.volume = 1;
    window.speechSynthesis.speak(utterance);
  }
  const handleNativeShare = async () => {
    if (!navigator.share) {
      alert('المشاركة غير مدعومة في هذا المتصفح');
      return;
    }
  
    const title = wordData.title || wordData.keyWord || 'Dalel';
    const url = window?.location?.href || '';
    const text = `${title}`; 
  
    if (!title || !url) {
      alert('معلومات المشاركة غير مكتملة');
      return;
    }
  
    try {
      await navigator.share({ title, text, url });
    } catch (err: any) {
      console.error('Sharing failed', err.message);
    }
  };
    return (
    <>
      {wordData.meaningDetails?.map((meaning, idx) => (
        <div key={idx}>
          <div className={styles.containerInfo}>
            <FlexComponent className={styles.firstText} gap=".5rem">
              <h1>{meaning.name}</h1>
              <div className={styles.icon} onClick={()=>{handleSpeak(meaning.name)}}>
                <SoundSvg />
              </div>
            </FlexComponent>

            <div className={styles.secondText}>{meaning.gloss}</div>

            <FlexComponent gap="1rem" className={styles.containerIcon}>
              <div className={styles.icon} onClick={handleNativeShare}>
                <ShareSvg />
              </div>
              <DislikeSvg />
              <LikeSvg />
            </FlexComponent>

            <div className={styles.containerDivider}>
              <DividerComponent variant={1} />
            </div>

            {meaning.synonyms?.length > 0 && (
              <FlexComponent alignItems="center" gap=".5rem" style={{ marginTop: '1rem' }}>
                <div className={styles.synonyms}>مرادفات:</div>
                {meaning.synonyms.map((syn, i) => (
                  <ButtonComponent key={i} DesignButton={2} size="small" text={syn} />
                ))}
              </FlexComponent>
            )}
          </div>

          <div className={styles.containerExample}>
            <section className={styles.section}>
              <h2 className={styles.title}>مثال</h2>
              <p className={styles.text}>{meaning.example}</p>
            </section>
            <DividerComponent variant={1}/>
          </div>
          <SpaceComponent bottom='-2rem'/>
        </div>
        
      ))}

      {wordData.seoKeyWords?.length > 0 && (
        <div className={styles.containerExample}>
          <section className={styles.section}>
            <h2 className={styles.title}>تصريفات</h2>
            <SpaceComponent bottom="2rem" />
            <FlexComponent className={styles.list} gap="1rem" justifyContent="flex-start">
              {wordData.seoKeyWords.map((item, index) => (
                <ButtonComponent
                  key={index}
                  text={item}
                  size="small"
                  DesignButton={2}
                  HoverDisable
                  style={{ color: 'var(--text-1) !important' }}
                />
              ))}
            </FlexComponent>
          </section>
        </div>
      )}
    </>
  );
}

export default InfoDetailComponent;
