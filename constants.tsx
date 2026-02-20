
import { Major, QuizQuestion } from './types';

export const MAJORS: Major[] = [
  {
    id: 'it-bk',
    majorName: 'Công nghệ Thông tin',
    university: 'ĐH Bách Khoa Hà Nội',
    score: 28.5,
    tuition: '30 - 50 triệu/năm',
    blocks: ['A00', 'A01'],
    location: 'Hà Nội',
    type: 'public',
    demand: 'high',
    aiRisk: 'low',
    description: 'Nghiên cứu về phần mềm, hệ thống mạng và xử lý dữ liệu.',
    avgSalary: '20 - 50 triệu VNĐ',
    employmentRate: '99%',
    skills: [{ name: 'Lập trình', level: 95 }, { name: 'Cấu trúc dữ liệu', level: 90 }],
    timeline: [{ year: 1, content: 'Đại cương' }, { year: 4, content: 'Đồ án' }]
  },
  {
    id: 'mkt-neu',
    majorName: 'Marketing',
    university: 'ĐH Kinh tế Quốc dân',
    score: 27.2,
    tuition: '25 - 45 triệu/năm',
    blocks: ['A01', 'D01'],
    location: 'Hà Nội',
    type: 'public',
    demand: 'high',
    aiRisk: 'medium',
    description: 'Quản trị thương hiệu và truyền thông trên các nền tảng số.',
    avgSalary: '15 - 40 triệu VNĐ',
    employmentRate: '96%',
    skills: [{ name: 'Sáng tạo', level: 90 }, { name: 'Phân tích', level: 85 }]
  },
  {
    id: 'ds-fpt',
    majorName: 'Khoa học dữ liệu',
    university: 'ĐH FPT',
    score: 24.5,
    tuition: '60 - 90 triệu/năm',
    blocks: ['A00', 'D01'],
    location: 'TP.HCM',
    type: 'private',
    demand: 'high',
    aiRisk: 'low',
    description: 'Phân tích dữ liệu lớn để đưa ra quyết định kinh doanh.'
  },
  {
    id: 'ai-uet',
    majorName: 'Trí tuệ nhân tạo',
    university: 'ĐH Công nghệ - VNU',
    score: 28.1,
    tuition: '20 - 35 triệu/năm',
    blocks: ['A00', 'A01'],
    location: 'Hà Nội',
    type: 'public',
    demand: 'high',
    aiRisk: 'low'
  },
  {
    id: 'gd-mtcn',
    majorName: 'Thiết kế đồ họa',
    university: 'ĐH Mỹ thuật công nghiệp',
    score: 23.5,
    tuition: '15 - 25 triệu/năm',
    blocks: ['H00', 'V00'],
    location: 'Hà Nội',
    type: 'public',
    demand: 'medium',
    aiRisk: 'high'
  },
  {
    id: 'ba-ftu',
    majorName: 'Quản trị kinh doanh',
    university: 'ĐH Ngoại thương',
    score: 27.8,
    tuition: '25 - 40 triệu/năm',
    blocks: ['A01', 'D01'],
    location: 'Hà Nội',
    type: 'public',
    demand: 'high',
    aiRisk: 'medium'
  },
  {
    id: 'log-gtvt',
    majorName: 'Logistics',
    university: 'ĐH Giao thông vận tải',
    score: 25.4,
    tuition: '18 - 28 triệu/năm',
    blocks: ['A00', 'A01'],
    location: 'TP.HCM',
    type: 'public',
    demand: 'high',
    aiRisk: 'medium'
  },
  {
    id: 'fin-neu',
    majorName: 'Tài chính ngân hàng',
    university: 'ĐH Kinh tế Quốc dân',
    score: 26.9,
    tuition: '22 - 38 triệu/năm',
    blocks: ['A01', 'D01'],
    location: 'Hà Nội',
    type: 'public',
    demand: 'medium',
    aiRisk: 'high'
  },
  {
    id: 'is-kmm',
    majorName: 'An toàn thông tin',
    university: 'Học viện Kỹ thuật mật mã',
    score: 25.1,
    tuition: '15 - 25 triệu/năm',
    blocks: ['A00', 'A01'],
    location: 'Hà Nội',
    type: 'public',
    demand: 'high',
    aiRisk: 'low'
  },
  {
    id: 'ec-tmu',
    majorName: 'Thương mại điện tử',
    university: 'ĐH Thương mại',
    score: 26.5,
    tuition: '20 - 35 triệu/năm',
    blocks: ['A01', 'D01'],
    location: 'Hà Nội',
    type: 'public',
    demand: 'high',
    aiRisk: 'medium'
  },
  {
    id: 'cs-iu',
    majorName: 'Khoa học máy tính',
    university: 'ĐH Quốc tế - VNUHCM',
    score: 25.0,
    tuition: '45 - 60 triệu/năm',
    blocks: ['A00', 'A01'],
    location: 'TP.HCM',
    type: 'international',
    demand: 'high',
    aiRisk: 'low'
  },
  {
    id: 'dm-rmit',
    majorName: 'Digital Marketing',
    university: 'ĐH RMIT',
    score: 22.0,
    tuition: '300 triệu/năm',
    blocks: ['D01'],
    location: 'Đà Nẵng',
    type: 'international',
    demand: 'high',
    aiRisk: 'medium'
  },
  {
    id: 'med-pnt',
    majorName: 'Y đa khoa',
    university: 'ĐH Y khoa Phạm Ngọc Thạch',
    score: 26.8,
    tuition: '35 - 50 triệu/năm',
    blocks: ['B00'],
    location: 'TP.HCM',
    type: 'public',
    demand: 'high',
    aiRisk: 'low'
  },
  {
    id: 'psy-hcmue',
    majorName: 'Tâm lý học',
    university: 'ĐH Sư phạm TP.HCM',
    score: 25.7,
    tuition: '15 - 20 triệu/năm',
    blocks: ['B00', 'C00', 'D01'],
    location: 'TP.HCM',
    type: 'public',
    demand: 'medium',
    aiRisk: 'low'
  },
  {
    id: 'law-hlu',
    majorName: 'Luật kinh tế',
    university: 'ĐH Luật Hà Nội',
    score: 27.5,
    tuition: '20 - 30 triệu/năm',
    blocks: ['A00', 'C00', 'D01'],
    location: 'Hà Nội',
    type: 'public',
    demand: 'medium',
    aiRisk: 'medium'
  },
  {
    id: 'eng-ulis',
    majorName: 'Ngôn ngữ Anh',
    university: 'ĐH Ngoại ngữ - VNU',
    score: 26.2,
    tuition: '20 - 40 triệu/năm',
    blocks: ['D01'],
    location: 'Hà Nội',
    type: 'public',
    demand: 'medium',
    aiRisk: 'high'
  },
  {
    id: 'audit-neu',
    majorName: 'Kiểm toán',
    university: 'ĐH Kinh tế Quốc dân',
    score: 28.0,
    tuition: '25 - 45 triệu/năm',
    blocks: ['A00', 'A01'],
    location: 'Hà Nội',
    type: 'public',
    demand: 'high',
    aiRisk: 'high'
  },
  {
    id: 'auto-hust',
    majorName: 'Kỹ thuật ô tô',
    university: 'ĐH Bách Khoa Hà Nội',
    score: 27.1,
    tuition: '30 - 55 triệu/năm',
    blocks: ['A00', 'A01'],
    location: 'Hà Nội',
    type: 'public',
    demand: 'high',
    aiRisk: 'medium'
  },
  {
    id: 'hotel-tmu',
    majorName: 'Quản trị khách sạn',
    university: 'ĐH Thương mại',
    score: 25.8,
    tuition: '20 - 30 triệu/năm',
    blocks: ['A01', 'D01'],
    location: 'Hà Nội',
    type: 'public',
    demand: 'medium',
    aiRisk: 'low'
  },
  {
    id: 'it-fpt-dn',
    majorName: 'Kỹ thuật phần mềm',
    university: 'ĐH FPT Đà Nẵng',
    score: 21.0,
    tuition: '50 - 70 triệu/năm',
    blocks: ['A00', 'A01', 'D01'],
    location: 'Đà Nẵng',
    type: 'private',
    demand: 'high',
    aiRisk: 'low'
  },
  {
    id: 'acc-ftu',
    majorName: 'Kế toán',
    university: 'ĐH Ngoại thương',
    score: 27.5,
    tuition: '25 - 40 triệu/năm',
    blocks: ['A00', 'A01', 'D01'],
    location: 'TP.HCM',
    type: 'public',
    demand: 'medium',
    aiRisk: 'high'
  },
  {
    id: 'biotech-hust',
    majorName: 'Công nghệ sinh học',
    university: 'ĐH Bách Khoa Hà Nội',
    score: 24.8,
    tuition: '25 - 40 triệu/năm',
    blocks: ['A00', 'B00'],
    location: 'Hà Nội',
    type: 'public',
    demand: 'medium',
    aiRisk: 'low'
  },
  {
    id: 'food-bk',
    majorName: 'Công nghệ thực phẩm',
    university: 'ĐH Bách Khoa TP.HCM',
    score: 25.2,
    tuition: '25 - 45 triệu/năm',
    blocks: ['A00', 'B00'],
    location: 'TP.HCM',
    type: 'public',
    demand: 'medium',
    aiRisk: 'low'
  },
  {
    id: 'multi-fpt',
    majorName: 'Thiết kế đồ họa',
    university: 'ĐH FPT',
    score: 22.5,
    tuition: '60 - 80 triệu/năm',
    blocks: ['A00', 'D01'],
    location: 'Hà Nội',
    type: 'private',
    demand: 'medium',
    aiRisk: 'high'
  },
  {
    id: 'ib-neu',
    majorName: 'Kinh doanh quốc tế',
    university: 'ĐH Kinh tế Quốc dân',
    score: 28.2,
    tuition: '25 - 50 triệu/năm',
    blocks: ['A01', 'D01'],
    location: 'Hà Nội',
    type: 'public',
    demand: 'high',
    aiRisk: 'medium'
  },
  {
    id: 'comm-rmit',
    majorName: 'Truyền thông chuyên nghiệp',
    university: 'ĐH RMIT',
    score: 20.0,
    tuition: '320 triệu/năm',
    blocks: ['D01'],
    location: 'TP.HCM',
    type: 'international',
    demand: 'high',
    aiRisk: 'medium'
  },
  {
    id: 'env-hust',
    majorName: 'Kỹ thuật môi trường',
    university: 'ĐH Bách Khoa Hà Nội',
    score: 23.0,
    tuition: '20 - 35 triệu/năm',
    blocks: ['A00', 'B00'],
    location: 'Hà Nội',
    type: 'public',
    demand: 'medium',
    aiRisk: 'low'
  },
  {
    id: 'arch-hau',
    majorName: 'Kiến trúc',
    university: 'ĐH Kiến trúc Hà Nội',
    score: 24.5,
    tuition: '15 - 25 triệu/năm',
    blocks: ['V00', 'V01'],
    location: 'Hà Nội',
    type: 'public',
    demand: 'medium',
    aiRisk: 'medium'
  },
  {
    id: 'elec-bk',
    majorName: 'Kỹ thuật Điện - Điện tử',
    university: 'ĐH Bách Khoa TP.HCM',
    score: 26.5,
    tuition: '30 - 55 triệu/năm',
    blocks: ['A00', 'A01'],
    location: 'TP.HCM',
    type: 'public',
    demand: 'high',
    aiRisk: 'low'
  },
  {
    id: 'chem-hust',
    majorName: 'Kỹ thuật Hóa học',
    university: 'ĐH Bách Khoa Hà Nội',
    score: 25.0,
    tuition: '25 - 45 triệu/năm',
    blocks: ['A00', 'B00'],
    location: 'Hà Nội',
    type: 'public',
    demand: 'medium',
    aiRisk: 'low'
  },
  {
    id: 'social-hcmussh',
    majorName: 'Xã hội học',
    university: 'ĐH KHXH & NV TP.HCM',
    score: 24.2,
    tuition: '15 - 20 triệu/năm',
    blocks: ['C00', 'D01'],
    location: 'TP.HCM',
    type: 'public',
    demand: 'low',
    aiRisk: 'low'
  },
  {
    id: 'tourism-tmu',
    majorName: 'Quản trị dịch vụ du lịch',
    university: 'ĐH Thương mại',
    score: 25.5,
    tuition: '20 - 30 triệu/năm',
    blocks: ['A01', 'D01'],
    location: 'Hà Nội',
    type: 'public',
    demand: 'medium',
    aiRisk: 'low'
  },
  {
    id: 'edu-hcmue',
    majorName: 'Giáo dục Tiểu học',
    university: 'ĐH Sư phạm TP.HCM',
    score: 26.5,
    tuition: '0 (Sư phạm)',
    blocks: ['A00', 'D01'],
    location: 'TP.HCM',
    type: 'public',
    demand: 'high',
    aiRisk: 'low'
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "Bạn thích làm việc với con số hay con người hơn?",
    options: [
      { text: "Con số và dữ liệu", value: "analyst" },
      { text: "Con người và giao tiếp", value: "social" },
      { text: "Cả hai bằng nhau", value: "neutral" }
    ]
  },
  {
    id: 2,
    question: "Khi đối mặt với một vấn đề khó, bạn thường:",
    options: [
      { text: "Phân tích logic từng bước", value: "logical" },
      { text: "Tìm giải pháp sáng tạo mới lạ", value: "creative" },
      { text: "Hỏi ý kiến từ người xung quanh", value: "social" }
    ]
  },
  {
    id: 3,
    question: "Môi trường làm việc mơ ước của bạn là:",
    options: [
      { text: "Văn phòng hiện đại, công nghệ cao", value: "tech" },
      { text: "Không gian mở, sáng tạo", value: "art" },
      { text: "Nơi có nhiều tương tác xã hội", value: "business" }
    ]
  }
];
