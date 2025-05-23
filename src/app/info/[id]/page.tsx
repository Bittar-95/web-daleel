'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import SkeletonComponent from '@/Components/UIElements/Feedback/Skeleton';
import styles from "./style.module.scss";
import useSwaggerData from '@/Services/ApiService/Get.Swagger.Data';
import { MeaningService } from '@/Services/ApiService/URL/Meaning.Service';

const InfoDetailComponent = dynamic(
  () => import('src/app/Components/Info'),
  { ssr: false }
);

export default function InfoPage() {
  const params = useParams();
  const decodedWord = decodeURIComponent(params?.id as string);

  const {data:wordData,isLoading:loading}=useSwaggerData({
    url:MeaningService.SearchResults,
    enabled:true,
    params:{ Name: decodedWord },
    queryKey:[MeaningService.SearchResults]
  })

  if (loading) return <div className={styles.container}><SkeletonComponent  number={3} style={{height:"13rem"}}/></div>;

  if (!wordData) return <div style={{ padding: '1rem' }}>لم يتم العثور على الكلمة.</div>;

  return <InfoDetailComponent wordData={wordData} />;
}
