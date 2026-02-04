
import { GoogleGenAI, Modality, Type } from "@google/genai";
import { AppState } from "../types";

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  }

  async generateContent(state: AppState): Promise<string> {
    const isScript = state.topic.toLowerCase().includes('kịch bản');
    
    const prompt = `
      Bạn là Linh Master AI - Siêu Trí Tuệ Phân Tích Hành Vi & Kiến Trúc Sư Nội Dung.
      Nhiệm vụ: Tạo nội dung chuyên sâu về chủ đề "${state.topic}" thuộc lĩnh vực "${state.domain}".
      
      THÔNG TIN ĐẦU VÀO:
      - Đối tượng mục tiêu: ${state.targetAudience}
      - Tone giọng: ${state.tone}
      - Chi tiết bổ sung: ${state.additionalDetails}
      
      ${isScript ? `
      CẤU HÌNH KỊCH BẢN (SỬ DỤNG SUPER PROMPT MỞ RỘNG):
      - Thể loại: ${state.scriptGenre}
      - Phong cách âm nhạc: ${state.musicStyle}
      - Phong cách thẩm mỹ: ${state.aestheticStyle}
      - Bối cảnh: ${state.settingStyle}
      - Giọng nói: ${state.voiceStyle}
      - Khả năng nhân vật: ${state.characterAbilities}
      ` : ''}
      
      YÊU CẦU:
      1. Đảm bảo tính thực chiến và chuyên gia tuyệt đối.
      2. Nội dung phải cực kỳ chi tiết, có cấu trúc rõ ràng.
      3. Nếu là kịch bản, phải xuất đúng format bao gồm: TIÊU ĐỀ, THỂ LOẠI, CHARACTER BIBLE, SỐ TẬP, KỊCH BẢN CHI TIẾT từng cảnh với BỐ CẢNH, ÂM NHẠC, GÓC QUAY, HÀNH ĐỘNG, BIỂU CẢM và LỜI THOẠI.
      4. Ngôn ngữ: Tiếng Việt 100%.
    `;

    const response = await this.ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        temperature: 0.8,
        topK: 40,
        topP: 0.95,
      }
    });

    return response.text || "Không thể tạo nội dung vào lúc này.";
  }

  async generateSpeech(text: string, voiceName: 'Kore' | 'Puck' = 'Kore', speed: number = 1.0): Promise<string> {
    const response = await this.ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: [{ parts: [{ text: `Đọc văn bản sau với tốc độ ${speed}x: ${text.substring(0, 1000)}` }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName },
          },
        },
      },
    });

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    if (!base64Audio) throw new Error("TTS failed");
    return base64Audio;
  }
}

export const gemini = new GeminiService();
