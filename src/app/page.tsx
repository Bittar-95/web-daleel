import { Metadata } from 'next';
import { ContentServiceFun } from '@/Services/ApiService/Services/ContentService';
import SearchWordHeader from './Components/Home/SearchComponent';
import SliderComponent from './Components/Home/Slider';
import DictionaryInfoComponent from './Components/Home/DictionaryInfoComponent/DictionaryInfoComponent';
export const revalidate = 3600; 

export const metadata: Metadata = {
  title: 'القاموس العربي | البحث عن الكلمات والمعاني',
  description:
    'اكتشف معاني الكلمات العربية بسهولة من خلال القاموس العربي المتقدم. ابحث بسرعة واحصل على نتائج دقيقة.',
  keywords: ['قاموس', 'كلمات عربية', 'معاني', 'ترجمة', 'لغة عربية'],
  authors: [{ name: 'YourSite Name' }],
  robots: 'index, follow',
  openGraph: {
    title: 'القاموس العربي | البحث عن الكلمات',
    description: 'ابحث عن الكلمات العربية وتعرف على معانيها الدقيقة بسهولة وسرعة عبر موقعنا.',
    type: 'website',
    locale: 'ar_AR',
    url: 'https://yourdomain.com/',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'القاموس العربي',
    description: 'استخدم القاموس العربي للبحث عن معاني الكلمات العربية بدقة وسهولة.',
  },
  alternates: {
    canonical: 'https://yourdomain.com/',
  },
};

export default async function Home() {
  const sliderData = await ContentServiceFun.getContentDetail();

  return (
    <main>
      <header>
        <SearchWordHeader />
      </header>

      <section>
        <DictionaryInfoComponent />
      </section>

      <section>
        <SliderComponent data={sliderData} />
      </section>
    </main>
  );
}
