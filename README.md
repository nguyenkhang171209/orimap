# 🚀 OrieMap – AI-Powered Career Orientation Platform
> **Empowering the next generation to navigate their academic and professional future with confidence.**

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Gemini AI](https://img.shields.io/badge/Gemini_AI-4285F4?style=for-the-badge&logo=google-gemini&logoColor=white)](https://ai.google.dev/)
[![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)

---

## 📌 Problem Statement
Choosing a career path is one of the most significant decisions in a student's life, yet over **60% of students in Vietnam** report choosing the wrong major or feeling misaligned with their studies after their first year. 

The core issues include:
- **Information Fragmentation:** Difficulty in accessing centralized data on admission scores, tuition fees, and job market trends.
- **Lack of Personalization:** Traditional career tests are often generic and fail to account for individual nuances.
- **Decision Paralysis:** The sheer volume of options leads to "choice overload," causing anxiety and suboptimal decisions.

## 💡 Solution Overview
**OrieMap** is a comprehensive digital ecosystem designed to bridge the gap between high school students and their ideal career paths. By leveraging **Google's Gemini AI** and real-world admission data, OrieMap provides a personalized "Career Roadmap" that evolves with the student.

Our platform transforms career orientation from a stressful guessing game into a data-driven, guided journey.

## ✨ Key Features
- **🤖 AI Career Mentor:** A 24/7 intelligent assistant providing context-aware advice on majors, universities, and career trends.
- **🧩 AI-Driven Career Quiz:** Advanced personality and aptitude assessment to identify high-potential career matches.
- **🗺️ Strategic AI Roadmap:** Personalized year-by-year study plans (Grade 10-12) tailored to specific university goals.
- **🔍 Smart Major & University Search:** Multi-criteria filtering (scores, tuition, location) enhanced by AI insights on "Why this fits you."
- **📊 Personal Dashboard:** A centralized hub to track saved majors, monitor progress, and manage upcoming exam schedules.
- **📱 Responsive Design:** A seamless, mobile-first experience that feels like a native app on any device.

## 🛠️ Tech Stack
- **Frontend:** [React 18](https://reactjs.org/) with [TypeScript](https://www.typescriptlang.org/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **AI Engine:** [Google Gemini API](https://ai.google.dev/) (via `@google/genai`)
- **Visualizations:** [Recharts](https://recharts.org/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Icons:** [Lucide React](https://lucide.dev/)

## 🏗️ System Architecture Overview
OrieMap follows a modern client-side architecture:
1. **Presentation Layer:** React components styled with Tailwind CSS for a high-performance, responsive UI.
2. **Logic Layer:** Custom hooks and services managing state and business logic.
3. **AI Integration Layer:** Direct integration with Gemini API to process natural language queries and generate structured career data.
4. **Data Layer:** Localized constants and mock data structures representing the Vietnamese educational landscape.

## 🚀 Installation Guide

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Step-by-Step Setup
1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/oriemap.git
   cd oriemap
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env` file in the root directory:
   ```bash
   touch .env
   ```

## 🔑 Environment Variables Setup
Add your Gemini API Key to the `.env` file:
```env
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```
*Note: You can obtain an API key for free at [Google AI Studio](https://aistudio.google.com/).*

## 💻 How to Run Locally
Start the development server:
```bash
npm run dev
```
The application will be available at `http://localhost:3000`.

## 🔮 Future Improvements
- [ ] **Real-time Collaboration:** Connect students with alumni and industry professionals.
- [ ] **Scholarship Database:** Integrated tracking for local and international scholarships.
- [ ] **Predictive Analytics:** AI models to predict admission probability based on mock test scores.
- [ ] **Native Mobile App:** Expanding to iOS and Android via React Native.

## 🎯 Target Users
- **High School Students (Grades 10-12):** Seeking direction and study plans.
- **Parents:** Looking for data-backed guidance for their children.
- **Educators:** Tools to assist in student career counseling.

## 📸 Screenshots
| Home Page | AI Mentor |
|---|---|
| ![Home Placeholder](https://picsum.photos/seed/home/800/450) | ![Mentor Placeholder](https://picsum.photos/seed/mentor/800/450) |

| Search & Filter | AI Roadmap |
|---|---|
| ![Search Placeholder](https://picsum.photos/seed/search/800/450) | ![Roadmap Placeholder](https://picsum.photos/seed/roadmap/800/450) |

## 🤝 Contribution Guide
Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📜 License
Distributed under the MIT License. See `LICENSE` for more information.

## 👤 Author
**OrieMap Development Team**
- **Email:** [contact@oriemap.ai](mailto:contact@oriemap.ai)
- **Website:** [oriemap.ai](https://ais-dev-j3bfxcbwtunkl7snupwohf-59091172219.asia-southeast1.run.app)
- **LinkedIn:** [linkedin.com/company/oriemap](https://linkedin.com)

---
⭐️ If you find this project useful, please give it a star on GitHub!
