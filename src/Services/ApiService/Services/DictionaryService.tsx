import api from "@/Services/Api";
import { TenseService } from "../URL/Tense.Service";

let cachedDailyWord: any = null;
let lastFetchedTime: number | null = null;

export class DictionaryService {
  static async getDailyWord() {
    const now = Date.now();
    const oneDay = 24 * 60 * 60 * 1000; 

    if (cachedDailyWord && lastFetchedTime && now - lastFetchedTime < oneDay) {
      return cachedDailyWord;
    }

    try {
      const response = await api.get(TenseService.DailyWord);
      if (response?.data) {
        cachedDailyWord = response.data;
        lastFetchedTime = now;
        return cachedDailyWord;
      } else {
        throw new Error("الاستجابة غير صالحة من الخادم");
      }
    } catch (error: any) {
      console.error("فشل في جلب كلمة اليوم:", error?.message || error);
      return {
        word: "لا توجد كلمة",
        meaning: "حدث خطأ أثناء جلب الكلمة",
        fallback: true,
      };
    }
  }
}
