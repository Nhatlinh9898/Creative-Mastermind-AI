
import { Domain } from './types';

export const DOMAIN_TOPICS: Record<Domain, string[]> = {
  [Domain.TECH]: [
    'System Design chuyên sâu',
    'Agile & Scrum thực chiến'
  ],
  [Domain.CREATIVE]: [
    'Bài viết chuyên sâu Creative',
    'Kịch bản video Creative',
    'Review chi tiết Creative',
    'Quảng cáo chuyển đổi cao Creative'
  ],
  [Domain.MUSIC]: [
    'Quy trình chuẩn Music',
    'Chiến lược ngách Music',
    'Bài viết chuyên sâu Music',
    'Email Marketing Music',
    'Kịch bản video Music',
    'Phân tích xu hướng Music',
    'Hướng dẫn từng bước Music',
    'Review chi tiết Music',
    'Quảng cáo chuyển đổi cao Music'
  ],
  [Domain.CINEMA]: [
    'Quy trình chuẩn Cinema',
    'Chiến lược ngách Cinema',
    'Bài viết chuyên sâu Cinema',
    'Email Marketing Cinema',
    'Kịch bản video Cinema',
    'Phân tích xu hướng Cinema',
    'Hướng dẫn từng bước Cinema',
    'Review chi tiết Cinema',
    'Quảng cáo chuyển đổi cao Cinema'
  ]
};

export const MUSIC_STYLES = [
  'Không nhạc', 'Nhạc nhẹ nhàng', 'Nhạc điện tử', 'Nhạc cổ điển',
  'Nhạc kịch tính', 'Nhạc anime', 'Nhạc cổ tích', 'Nhạc hành động',
  'Nhạc lãng mạn', 'Nhạc thời trang'
];

export const AESTHETIC_STYLES = [
  'Hiện đại', 'Tối giản', 'Cyberpunk', 'Steampunk', 'Anime', 'Manga',
  'Cổ tích', 'Học đường', 'Du lịch – khám phá', 'Thời trang – runway',
  'Fantasy', 'Gothic', 'Pastel', 'Retro 80s / 90s'
];

export const SETTING_STYLES = [
  'Thành phố', 'Nông thôn', 'Biển', 'Núi', 'Không gian',
  'Thế giới phép thuật', 'Trường học', 'Studio thời trang',
  'Sân khấu âm nhạc', 'Thế giới truyện tranh', 'Lâu đài cổ tích'
];

export const VOICE_STYLES = [
  'Trẻ trung', 'Trầm ấm', 'Nhanh nhẹn', 'Hài hước', 'Lạnh lùng',
  'Ngọt ngào', 'Quyền lực', 'Giọng anime', 'Giọng cổ tích', 'Giọng kể chuyện'
];

export const ABILITIES = [
  'Bình thường', 'Hát hay', 'Nhảy giỏi', 'Thời trang – stylist',
  'Nhiếp ảnh', 'Du lịch – khám phá', 'Phép thuật', 'Siêu năng lực',
  'Võ thuật', 'Học giỏi', 'Hacker', 'Nghệ sĩ'
];

export const GENRES = [
  'Âm nhạc', 'Thời trang', 'Du lịch', 'Lớp học', 'Hành động',
  'Lãng mạn', 'Hài hước', 'Kinh dị nhẹ', 'Truyện tranh', 'Manga',
  'Anime', 'Cổ tích', 'Fantasy', 'Drama', 'Slice of life'
];

export const TONE_VOICES = [
  'Chuyên gia/Hàn lâm',
  'Truyền cảm hứng',
  'Hài hước/Giải trí',
  'Trực diện/Mạnh mẽ',
  'Sang trọng/Đẳng cấp',
  'Thân thiện/Gần gũi'
];
