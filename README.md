# 📚 GATE Tracker - Your GATE Preparation Companion

A Progressive Web App (PWA) to track your GATE CS/IT exam preparation with syllabus tracking, study planner, daily practice papers, and analytics.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Yashborse45/GATETracker)

## ✨ Features

- 📊 **Syllabus Tracker** - Track progress for all GATE CS subjects
- 📅 **Study Planner** - Auto-generate weekly study schedules
- 📝 **Daily Practice Papers (DPP)** - Subject-wise quizzes with instant results
- 📈 **Analytics** - Visual progress tracking with charts
- 🔔 **Smart Reminders** - Revision alerts based on completion dates
- 💾 **Offline Support** - Works without internet after first load
- 📱 **PWA Ready** - Install as a mobile app
- 🎯 **Goal-Based Strategy** - Personalized tips based on your rank target

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ installed
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/Yashborse45/GATETracker.git

# Navigate to directory
cd GATETracker

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:5173` in your browser.

## 📱 Deploy to Vercel (Recommended)

1. Fork this repository
2. Go to [Vercel](https://vercel.com/new)
3. Import your forked repository
4. Click "Deploy"
5. Your app is live! 🎉

## 🏗️ Build for Production

```bash
npm run build
npm run preview
```

## 🛠️ Tech Stack

- **Framework:** React 18 + TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **Charts:** Recharts
- **Storage:** LocalStorage (no backend needed)
- **PWA:** Service Workers + Web Manifest

## 📂 Project Structure

```
GATETracker/
├── components/         # React components
│   ├── Dashboard.tsx
│   ├── SyllabusTracker.tsx
│   ├── StudyPlanner.tsx
│   ├── DPP.tsx
│   └── Analytics.tsx
├── hooks/             # Custom React hooks
├── utils/             # Utility functions
├── constants.ts       # GATE syllabus & data
├── types.ts          # TypeScript types
└── public/           # Static assets
```

## 📊 Subjects Covered

- Engineering Mathematics
- Digital Logic
- Computer Organization & Architecture
- Programming & Data Structures
- Algorithms
- Theory of Computation
- Compiler Design
- Operating Systems
- Databases
- Computer Networks
- General Aptitude

## 🔒 Privacy

- ✅ All data stored locally on your device
- ✅ No external servers or databases
- ✅ No user tracking or analytics
- ✅ Completely offline-capable

## 📸 Screenshots

*Coming soon...*

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## 📄 License

MIT License - feel free to use this for your GATE preparation!

## 💡 Tips for Best Experience

1. **Install as PWA** - Add to home screen for app-like experience
2. **Enable Notifications** - Get revision reminders
3. **Use Daily** - Update progress regularly for accurate analytics
4. **Backup Data** - Export your data periodically (feature coming soon)

## 🐛 Known Issues

- Data doesn't sync between devices (by design, uses localStorage)
- Service worker requires HTTPS in production

## 📞 Support

For issues or questions:
- Open an issue on GitHub
- Contact: [Your Email/Contact]

---

**Built with ❤️ for GATE aspirants**

⭐ Star this repo if it helped your preparation!
