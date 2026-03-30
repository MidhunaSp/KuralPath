# 📜 KuralPath – Thirukkural Learning App

## 🚀 About the Project

**KuralPath** is a web application designed to help users explore and learn the *Thirukkural* in an interactive and structured way. The app allows users to read kurals one by one, track their progress, and view explanations in Tamil (and optionally English).

---

## ✨ Features

* 📖 Daily Thirukkural generation (1–1330)
* 🔐 User authentication (Login/Register)
* 📊 Dashboard to track number of kurals read
* 🌐 API-based dynamic kural fetching
* ⚡ Local fallback for faster loading (first 50 kurals)
* 🎯 Clean and minimal UI for better reading experience

---

## 🏗️ Tech Stack

* **Frontend:** React (Vite)
* **Backend:** json file(backend url)
* **Database:** Entity (KuralData)
* **Styling:** CSS / Tailwind 

---

## 📂 Project Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/MidhunaSp/KuralPath.git
cd KuralPath
```

---

### 2️⃣ Install Dependencies

```bash
npm install
```

---

### 3️⃣ Setup Environment Variables

Create a `.env.local` file in the root directory:

```env
VITE_BASE44_APP_ID=69c8fe380f00df783e0b5834
VITE_BASE44_APP_BASE_URL=https://daily-kural-path.base44.app
```

---

### 4️⃣ Run the Application

```bash
npm run dev
```

App will run at:

```
http://localhost:5173
```

---

## 🔄 How It Works

* The app fetches kurals from the Base44 database.
* Currently, 1330 kurals are stored locally and in DB(file name : thirukkural.json)

---

## ⚡ Performance Optimization

* Fetches only **one kural at a time**
* Uses **local data fallback** for instant load
* Implements **API fallback for scalability**
* Supports **caching for faster repeat access**

---

## 📌 Future Enhancements

* 🌍 Multi-language support
* 🔍 Search by chapter/keyword
* 📱 Mobile responsiveness improvements
* 📈 Advanced analytics on reading habits

---

## 💡 Screenshots

<img width="1911" height="1005" alt="image" src="https://github.com/user-attachments/assets/1233c40e-d5cc-416a-a843-775a2ad536f2" />

<img width="1919" height="1079" alt="Screenshot 2026-03-30 095214" src="https://github.com/user-attachments/assets/310bf34a-398c-43d6-9124-c777ba7e498f" />

<img width="1894" height="932" alt="image" src="https://github.com/user-attachments/assets/519bf7ad-ecba-4c4e-b2c0-45001bc1a2eb" />

---

## 📄 License

This project is for educational and learning purposes.

---

## Contributed with ❤️ 

**S P Midhuna Varshini**



---
