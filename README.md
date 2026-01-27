# Tribal Data Center

A full-stack application built during the CodeTribe Academy program. This platform features a Node.js backend integrated with Supabase for data management and authentication, and a modern frontend deployed on Render.

## 🚀 Live Demo
- **Frontend:** [https://codetribe-platform.onrender.com/](https://codetribe-platform.onrender.com/)

## 🛠️ Tech Stack
- **Frontend:** Vite, React (or your specific framework)
- **Backend:** Node.js, Express
- **Database & Auth:** [Supabase](https://supabase.com/)
- **Logging:** Custom Winston/Morgan logger
- **Deployment:** Render

## 📁 Project Structure
```text
├── Backend/
│   ├── config/          # Database configuration (Supabase)
│   ├── controller/      # Business logic
│   ├── middleware/      # Auth and logging middlewares
│   ├── route/           # API Endpoints
│   ├── utils/           # Helper functions (Logger, etc.)
│   └── server.js        # Entry point
├── frontend/            # Client-side application
└── .gitignore           # Ensures secrets like .env are not tracked

```

## ⚙️ Getting Started

### Prerequisites

* Node.js installed (v16+)
* A Supabase project

### Installation

1. **Clone the repository:**
```bash
git clone [https://github.com/dlozilab/codetribe-platform.git](https://github.com/dlozilab/codetribe-platform.git)
cd codetribe-platform

```


2. **Setup Backend:**
```bash
cd Backend
npm install

```


3. **Configure Environment Variables:**
Create a `.env` file in the `Backend` directory and add your credentials:
```env
PORT=5000
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key

```


4. **Run the Server:**
```bash
npm start

```



## 🔒 Security Note

This project uses environment variables for sensitive information. **Never commit your `.env` file.** A `.gitignore` file is included to prevent accidental leaks. If keys are exposed, rotate them immediately in the Supabase dashboard.

## 👥 Contributing

This project is part of the mLab CodeTribe Academy. Contributions and feedback are welcome!

---

*Maintained by [dlozilab*](https://www.google.com/search?q=https://github.com/dlozilab)

```

