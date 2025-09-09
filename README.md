# 🩺 Health Q&A Platform – Backend

This is the backend service for the **Health Q&A Platform**, which allows users to ask health-related questions, get verified answers from professionals, and receive AI-powered summaries and triage signals.

The backend is built with **Node.js + Express** and uses **MySQL** as the primary database.

---

## 🚀 Features

- User authentication & profile management
- Verified professional roles (Doctor, Nurse, Pharmacist)
- Symptom-based question submission
- AI-assisted classification & summarization
- Multi-level answers (professional, patient, reference)
- Triage system (red/orange/green urgency signals)
- ICD-10/ICD-11 medical code tagging
- Sub-communities (Dermatology, Pediatrics, etc.)
- Points & badge system
- Admin moderation (misinformation detection, content removal)
- Free & premium service support

---

## 🛠 Tech Stack

- **Runtime:** Node.js (>=18)
- **Framework:** Express.js
- **Database:** MySQL (main), Redis (cache/queues optional)
- **ORM:** Sequelize (with MySQL dialect)
- **Authentication:** JWT + Role-based Access Control
- **AI Integration:** OpenAI / HuggingFace models for classification, summarization, moderation
- **APIs:** ICD-10/11, WHO, PubMed

---

## 📂 Project Structure
