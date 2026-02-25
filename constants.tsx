
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
  // RIASEC - Realistic
  {
    id: 1,
    question: "Bạn thích làm việc với các công cụ, máy móc hoặc thiết bị kỹ thuật không?",
    options: [
      { text: "Rất thích", value: "R1", weights: { riasec: { R: 10 }, thinking: { Concrete: 5 } } },
      { text: "Bình thường", value: "R2", weights: { riasec: { R: 5 } } },
      { text: "Không thích", value: "R3", weights: { riasec: { R: 0 } } }
    ]
  },
  {
    id: 2,
    question: "Bạn có thích các hoạt động ngoài trời hoặc vận động tay chân không?",
    options: [
      { text: "Có, tôi rất năng động", value: "R4", weights: { riasec: { R: 10 }, motivation: 'Intrinsic' } },
      { text: "Thỉnh thoảng", value: "R5", weights: { riasec: { R: 5 } } },
      { text: "Tôi thích làm việc trong nhà hơn", value: "R6", weights: { riasec: { R: 0 } } }
    ]
  },
  // RIASEC - Investigative
  {
    id: 3,
    question: "Bạn có thích giải quyết các bài toán phức tạp hoặc nghiên cứu khoa học không?",
    options: [
      { text: "Đó là đam mê của tôi", value: "I1", weights: { riasec: { I: 10 }, thinking: { Abstract: 5, Linear: 5 } } },
      { text: "Cũng khá thú vị", value: "I2", weights: { riasec: { I: 5 } } },
      { text: "Tôi thấy nó khá khô khan", value: "I3", weights: { riasec: { I: 0 } } }
    ]
  },
  {
    id: 4,
    question: "Khi gặp một hiện tượng lạ, bạn có xu hướng tìm hiểu nguyên lý đằng sau nó không?",
    options: [
      { text: "Luôn luôn", value: "I4", weights: { riasec: { I: 10 }, thinking: { Abstract: 5 } } },
      { text: "Đôi khi", value: "I5", weights: { riasec: { I: 5 } } },
      { text: "Không quan tâm lắm", value: "I6", weights: { riasec: { I: 0 } } }
    ]
  },
  // RIASEC - Artistic
  {
    id: 5,
    question: "Bạn có thích sáng tạo nghệ thuật, viết lách hoặc thiết kế không?",
    options: [
      { text: "Tôi là người rất nghệ sĩ", value: "A1", weights: { riasec: { A: 10 }, thinking: { Lateral: 10 } } },
      { text: "Tôi thích thưởng thức hơn là làm", value: "A2", weights: { riasec: { A: 5 } } },
      { text: "Tôi thích sự thực tế hơn", value: "A3", weights: { riasec: { A: 0 } } }
    ]
  },
  {
    id: 6,
    question: "Bạn có cảm thấy thoải mái khi làm việc trong môi trường không có quy tắc gò bó?",
    options: [
      { text: "Rất thoải mái", value: "A4", weights: { riasec: { A: 10 }, thinking: { Lateral: 5 }, pressure: 0.5 } },
      { text: "Cần một chút định hướng", value: "A5", weights: { riasec: { A: 5 } } },
      { text: "Tôi thích có quy trình rõ ràng", value: "A6", weights: { riasec: { A: 0 }, thinking: { Linear: 5 } } }
    ]
  },
  // RIASEC - Social
  {
    id: 7,
    question: "Bạn có thích giúp đỡ người khác hoặc làm các công việc tình nguyện không?",
    options: [
      { text: "Rất thích", value: "S1", weights: { riasec: { S: 10 }, motivation: 'Intrinsic' } },
      { text: "Có, nếu có thời gian", value: "S2", weights: { riasec: { S: 5 } } },
      { text: "Tôi thích tập trung vào việc cá nhân", value: "S3", weights: { riasec: { S: 0 } } }
    ]
  },
  {
    id: 8,
    question: "Bạn có thấy mình là người dễ dàng thấu hiểu cảm xúc của người khác không?",
    options: [
      { text: "Rất nhạy bén", value: "S4", weights: { riasec: { S: 10 } } },
      { text: "Bình thường", value: "S5", weights: { riasec: { S: 5 } } },
      { text: "Tôi thiên về lý trí hơn", value: "S6", weights: { riasec: { S: 0 }, thinking: { Linear: 5 } } }
    ]
  },
  // RIASEC - Enterprising
  {
    id: 9,
    question: "Bạn có thích dẫn dắt một đội nhóm hoặc thuyết phục người khác không?",
    options: [
      { text: "Tôi thích làm lãnh đạo", value: "E1", weights: { riasec: { E: 10 }, pressure: 0.8, motivation: 'Extrinsic' } },
      { text: "Tôi có thể làm nếu cần", value: "E2", weights: { riasec: { E: 5 } } },
      { text: "Tôi thích làm thành viên hơn", value: "E3", weights: { riasec: { E: 0 } } }
    ]
  },
  {
    id: 10,
    question: "Bạn có quan tâm đến việc kinh doanh hoặc đạt được các thành tựu về tài chính không?",
    options: [
      { text: "Rất quan tâm", value: "E4", weights: { riasec: { E: 10 }, motivation: 'Extrinsic' } },
      { text: "Một chút", value: "E5", weights: { riasec: { E: 5 } } },
      { text: "Tiền bạc không phải ưu tiên hàng đầu", value: "E6", weights: { riasec: { E: 0 }, motivation: 'Intrinsic' } }
    ]
  },
  // RIASEC - Conventional
  {
    id: 11,
    question: "Bạn có thích làm việc với các con số, dữ liệu và hồ sơ một cách ngăn nắp không?",
    options: [
      { text: "Rất thích sự ngăn nắp", value: "C1", weights: { riasec: { C: 10 }, thinking: { Linear: 10, Concrete: 5 } } },
      { text: "Tạm được", value: "C2", weights: { riasec: { C: 5 } } },
      { text: "Tôi thích sự ngẫu hứng hơn", value: "C3", weights: { riasec: { C: 0 }, thinking: { Lateral: 5 } } }
    ]
  },
  {
    id: 12,
    question: "Bạn có thấy mình là người tuân thủ các quy định và hướng dẫn một cách nghiêm túc không?",
    options: [
      { text: "Luôn tuân thủ", value: "C4", weights: { riasec: { C: 10 }, pressure: -0.5 } },
      { text: "Tùy trường hợp", value: "C5", weights: { riasec: { C: 5 } } },
      { text: "Tôi thích phá vỡ các quy tắc", value: "C6", weights: { riasec: { C: 0 }, thinking: { Lateral: 5 } } }
    ]
  },
  // Thinking Styles
  {
    id: 13,
    question: "Khi giải quyết vấn đề, bạn thường:",
    options: [
      { text: "Làm theo các bước đã định sẵn", value: "T1", weights: { thinking: { Linear: 10 } } },
      { text: "Thử nhiều cách tiếp cận khác nhau", value: "T2", weights: { thinking: { Lateral: 10 } } },
      { text: "Nhìn vào bức tranh tổng thể", value: "T3", weights: { thinking: { Abstract: 10 } } },
      { text: "Tập trung vào các chi tiết cụ thể", value: "T4", weights: { thinking: { Concrete: 10 } } }
    ]
  },
  {
    id: 14,
    question: "Bạn thích học qua lý thuyết hay thực hành hơn?",
    options: [
      { text: "Lý thuyết trừu tượng", value: "T5", weights: { thinking: { Abstract: 10 } } },
      { text: "Thực hành trực quan", value: "T6", weights: { thinking: { Concrete: 10 } } }
    ]
  },
  // Pressure Tolerance
  {
    id: 15,
    question: "Bạn cảm thấy thế nào khi phải hoàn thành công việc trong thời gian ngắn (deadline sát)?",
    options: [
      { text: "Càng áp lực tôi càng làm tốt", value: "P1", weights: { pressure: 1.0 } },
      { text: "Hơi căng thẳng nhưng vẫn làm được", value: "P2", weights: { pressure: 0.5 } },
      { text: "Rất mệt mỏi và dễ sai sót", value: "P3", weights: { pressure: -1.0 } }
    ]
  },
  {
    id: 16,
    question: "Bạn có thích các công việc có tính cạnh tranh cao không?",
    options: [
      { text: "Rất thích thử thách", value: "P4", weights: { pressure: 0.8, riasec: { E: 5 } } },
      { text: "Bình thường", value: "P5", weights: { pressure: 0.2 } },
      { text: "Tôi thích sự ổn định", value: "P6", weights: { pressure: -0.8 } }
    ]
  },
  // Motivation
  {
    id: 17,
    question: "Điều gì thúc đẩy bạn làm việc chăm chỉ nhất?",
    options: [
      { text: "Sự công nhận và phần thưởng", value: "M1", weights: { motivation: 'Extrinsic' } },
      { text: "Sự thỏa mãn cá nhân và đam mê", value: "M2", weights: { motivation: 'Intrinsic' } }
    ]
  },
  {
    id: 18,
    question: "Nếu không được trả lương, bạn có tiếp tục làm công việc hiện tại không?",
    options: [
      { text: "Chắc chắn là có", value: "M3", weights: { motivation: 'Intrinsic' } },
      { text: "Không, tôi cần thu nhập", value: "M4", weights: { motivation: 'Extrinsic' } }
    ]
  },
  // Mixed & Contradiction Detection
  {
    id: 19,
    question: "Bạn thích làm việc một mình hay theo nhóm?",
    options: [
      { text: "Một mình để tập trung", value: "X1", weights: { riasec: { I: 5, R: 5 } } },
      { text: "Theo nhóm để trao đổi", value: "X2", weights: { riasec: { S: 5, E: 5 } } }
    ]
  },
  {
    id: 20,
    question: "Bạn có thích lập kế hoạch chi tiết cho tương lai không?",
    options: [
      { text: "Có, mọi thứ phải rõ ràng", value: "X3", weights: { riasec: { C: 10 }, thinking: { Linear: 5 } } },
      { text: "Không, tôi sống cho hiện tại", value: "X4", weights: { riasec: { A: 5 }, thinking: { Lateral: 5 } } }
    ]
  },
  // More RIASEC to reach 30
  {
    id: 21,
    question: "Bạn có thích sửa chữa các đồ vật bị hỏng trong nhà không?",
    options: [
      { text: "Rất thích", value: "R7", weights: { riasec: { R: 10 } } },
      { text: "Thuê thợ cho nhanh", value: "R8", weights: { riasec: { R: 0 } } }
    ]
  },
  {
    id: 22,
    question: "Bạn có thích đọc các tạp chí khoa học hoặc công nghệ không?",
    options: [
      { text: "Thường xuyên", value: "I7", weights: { riasec: { I: 10 } } },
      { text: "Hiếm khi", value: "I8", weights: { riasec: { I: 0 } } }
    ]
  },
  {
    id: 23,
    question: "Bạn có thích tham gia các buổi triển lãm nghệ thuật không?",
    options: [
      { text: "Rất thích", value: "A7", weights: { riasec: { A: 10 } } },
      { text: "Không hứng thú lắm", value: "A8", weights: { riasec: { A: 0 } } }
    ]
  },
  {
    id: 24,
    question: "Bạn có thích giảng dạy hoặc hướng dẫn người khác không?",
    options: [
      { text: "Rất thích", value: "S7", weights: { riasec: { S: 10 } } },
      { text: "Không có kiên nhẫn", value: "S8", weights: { riasec: { S: 0 } } }
    ]
  },
  {
    id: 25,
    question: "Bạn có thích đàm phán để có được giá tốt khi mua hàng không?",
    options: [
      { text: "Đó là sở trường của tôi", value: "E7", weights: { riasec: { E: 10 } } },
      { text: "Tôi ngại mặc cả", value: "E8", weights: { riasec: { E: 0 } } }
    ]
  },
  {
    id: 26,
    question: "Bạn có thích kiểm tra các lỗi chính tả hoặc lỗi số liệu không?",
    options: [
      { text: "Tôi rất kỹ tính", value: "C7", weights: { riasec: { C: 10 } } },
      { text: "Tôi hay bỏ qua chi tiết", value: "C8", weights: { riasec: { C: 0 } } }
    ]
  },
  {
    id: 27,
    question: "Bạn thích giải quyết vấn đề bằng cách nào?",
    options: [
      { text: "Dùng trực giác", value: "T7", weights: { thinking: { Lateral: 5, Abstract: 5 } } },
      { text: "Dùng dữ liệu thực tế", value: "T8", weights: { thinking: { Linear: 5, Concrete: 10 } } }
    ]
  },
  {
    id: 28,
    question: "Bạn có dễ bị phân tâm khi làm việc trong môi trường ồn ào không?",
    options: [
      { text: "Rất dễ bị ảnh hưởng", value: "P7", weights: { pressure: -0.5 } },
      { text: "Tôi có thể tập trung tốt", value: "P8", weights: { pressure: 0.5 } }
    ]
  },
  {
    id: 29,
    question: "Bạn thích làm việc vì mục tiêu chung hay thành tích cá nhân?",
    options: [
      { text: "Mục tiêu chung", value: "M5", weights: { motivation: 'Intrinsic', riasec: { S: 5 } } },
      { text: "Thành tích cá nhân", value: "M6", weights: { motivation: 'Extrinsic', riasec: { E: 5 } } }
    ]
  },
  {
    id: 30,
    question: "Bạn có thích sự thay đổi liên tục trong công việc không?",
    options: [
      { text: "Rất thích sự đổi mới", value: "X5", weights: { thinking: { Lateral: 10 }, pressure: 0.5 } },
      { text: "Tôi thích sự ổn định", value: "X6", weights: { thinking: { Linear: 10 }, pressure: -0.5 } }
    ]
  }
];
