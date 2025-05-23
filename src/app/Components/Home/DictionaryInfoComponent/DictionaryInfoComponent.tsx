import { DictionaryService } from '@/Services/ApiService/Services/DictionaryService';
import DictionaryInfoClient from './DictionaryInfoClient';

export const revalidate = 86400; 

export default async function DictionaryInfoComponent() {
  const dailyWordData = await DictionaryService.getDailyWord();

  return (
    <DictionaryInfoClient dailyWordData={dailyWordData?.value} />
  );
}
