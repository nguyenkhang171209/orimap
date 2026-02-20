# 🚀 OrieMap - Nền tảng Hướng nghiệp Thông minh tích hợp AI

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Gemini AI](https://img.shields.io/badge/Gemini_AI-4285F4?style=for-the-badge&logo=google-gemini&logoColor=white)](https://ai.google.dev/)

**OrieMap** là giải pháp công nghệ toàn diện giúp học sinh THPT (Lớp 10 - 12) xóa bỏ rào cản trong việc chọn ngành, chọn trường. Bằng cách kết hợp dữ liệu tuyển sinh thực tế và trí tuệ nhân tạo (AI), OrieMap kiến tạo một lộ trình học tập cá nhân hóa, giúp các bạn trẻ tự tin làm chủ tương lai.

---

## 📌 Vấn đề (Problem Statement)

Hiện nay, hơn **60% sinh viên Việt Nam** chọn sai ngành học hoặc cảm thấy không phù hợp sau năm nhất đại học. Nguyên nhân chủ yếu đến từ:
- **Thiếu thông tin:** Học sinh khó tiếp cận dữ liệu điểm chuẩn, học phí và cơ hội việc làm một cách tập trung.
- **Thiếu định hướng:** Các bài trắc nghiệm truyền thống còn rời rạc, chưa cá nhân hóa.
- **Áp lực chọn trường:** Sự bùng nổ thông tin khiến học sinh bị "ngợp" và khó xác định lộ trình ôn thi hiệu quả.

## 💡 Giải pháp (Solution)

OrieMap ra đời như một **"Bản đồ sự nghiệp số"**, cung cấp hệ sinh thái khép kín:
1. **Thấu hiểu:** Thông qua AI Quiz dựa trên khung năng lực Holland.
2. **Khám phá:** Tra cứu thông minh hàng ngàn ngành học và trường đại học.
3. **Định hướng:** AI Mentor tư vấn 24/7 và thiết kế lộ trình (Roadmap) cá nhân hóa.
4. **Quản trị:** Dashboard theo dõi tiến độ học tập và lịch thi thực tế.

---

## ✨ Các tính năng chính (Key Features)

### 🤖 AI Career Mentor
Tích hợp mô hình ngôn ngữ lớn (Gemini AI) để giải đáp mọi thắc mắc về nghề nghiệp, xu hướng thị trường lao động và đưa ra lời khuyên học tập thực tế.

### 🧩 Trắc nghiệm định hướng AI
Hệ thống câu hỏi thông minh giúp nhận diện nhóm tính cách và thiên hướng nghề nghiệp, từ đó gợi ý các lĩnh vực phù hợp nhất.

### 🗺️ Lộ trình tương lai (AI Roadmap)
Tự động tạo lộ trình chi tiết từng năm (từ lớp 10 đến đại học) dựa trên mục tiêu, học lực và ngành học mơ ước của người dùng.

### 🔍 Tra cứu Ngành & Trường
Công cụ lọc đa năng theo khối thi, điểm chuẩn, học phí và khu vực địa lý. Tích hợp AI Insight để phân tích "tại sao ngành này phù hợp với bạn".

### 📊 Dashboard cá nhân
Không gian quản lý tập trung: lưu trữ ngành học yêu thích, theo dõi tiến độ mục tiêu, lịch thi sắp tới và nhận gợi ý hàng ngày từ AI.

### 📱 Trải nghiệm đa nền tảng
Giao diện được tối ưu hóa hoàn hảo cho cả Desktop và Mobile, mang lại cảm giác mượt mà như một ứng dụng di động (Native App-like experience).

---

## 🛠️ Công nghệ sử dụng (Tech Stack)

- **Frontend:** React 18, TypeScript, Vite.
- **Styling:** Tailwind CSS (Mobile-first design).
- **Icons:** Lucide React.
- **AI Integration:** Google Gemini API (@google/genai).
- **Animations:** Tailwind Animate, CSS Transitions.

---

## 📂 Cấu trúc thư mục (Project Structure)

```text
oriemap/
├── src/
│   ├── components/     # Các UI components dùng chung (Navbar, ScrollToTop,...)
│   ├── pages/          # Các trang chính (Home, Search, Dashboard, AIQuiz,...)
│   ├── services/       # Xử lý logic API và tích hợp Gemini AI
│   ├── constants.ts    # Dữ liệu tĩnh và cấu hình hệ thống
│   ├── types.ts        # Định nghĩa TypeScript interfaces
│   ├── App.tsx         # Component gốc và quản lý routing
│   └── main.tsx        # Điểm đầu vào của ứng dụng
├── public/             # Tài sản tĩnh (images, icons,...)
├── .env.example        # File mẫu cấu hình biến môi trường
└── package.json        # Quản lý dependencies và scripts
```

---

## 🚀 Hướng dẫn cài đặt (Installation & Usage)

### 1. Clone dự án
```bash
git clone https://github.com/yourusername/oriemap.git
cd oriemap
```

### 2. Cài đặt dependencies
```bash
npm install
```

### 3. Cấu hình biến môi trường
Tạo file `.env` ở thư mục gốc và thêm API Key của bạn:
```env
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

### 4. Chạy dự án ở chế độ phát triển
```bash
npm run dev
```
Ứng dụng sẽ chạy tại: `http://localhost:3000`

---

## 📸 Demo

*(Chèn ảnh hoặc GIF demo tại đây)*
> **Lưu ý:** Bạn có thể thêm ảnh chụp màn hình giao diện Desktop và Mobile để tăng tính thuyết phục cho Portfolio.

---

## 🗺️ Roadmap phát triển

- [ ] **Giai đoạn 1:** Hoàn thiện hệ thống dữ liệu 200+ trường đại học tại Việt Nam.
- [ ] **Giai đoạn 2:** Tích hợp tính năng so sánh học phí và chương trình đào tạo.
- [ ] **Giai đoạn 3:** Xây dựng cộng đồng học sinh - sinh viên (Forum) để chia sẻ kinh nghiệm thực tế.
- [ ] **Giai đoạn 4:** Phát triển ứng dụng di động hoàn chỉnh trên iOS/Android.

---

## 👤 Tác giả

**Đội ngũ phát triển OrieMap**
- Email: contact@oriemap.ai
- Website: [oriemap.ai](https://ais-dev-j3bfxcbwtunkl7snupwohf-59091172219.asia-southeast1.run.app)

---
⭐️ Nếu bạn thấy dự án này hữu ích, hãy tặng chúng mình 1 sao trên GitHub nhé!
