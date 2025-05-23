import api from "@/Services/Api";
import { MeaningService } from "../URL/Meaning.Service";

export class MeaningServiceFun {
  static async getWordDetail(word: string) {
    try {
      const response = await api.get(`${MeaningService.SearchResults}`, {
        params: { Name: word },
      });

      return response.data;
    } catch (error: any) {
      throw new Error('فشل في جلب تفاصيل الكلمة');
    }
  }
}
