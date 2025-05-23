import api from "@/Services/Api";
import { ContentService } from "../URL/Content.Service";

export class ContentServiceFun {
  static async getContentDetail(): Promise<any[]> {
    try {
      const response = await api.get(ContentService.GetHeroSectionContent);

      if (Array.isArray(response?.data)) {
        return response?.data;
      }

      return [];
    } catch (error: any) {
      console.error("فشل في جلب التفاصيل:", error?.message || error);
      return [];
    }
  }
}
