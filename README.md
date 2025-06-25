# 🧊 Food Tracker – Food Expiry Management Web App

[Live Website 🌐](https://coruscating-stardust-95ebcd.netlify.app/)  
[Client Repository 📁](https://github.com/Programming-Hero-Web-Course4/b11a11-client-side-Arif547)  
[Server Repository ⚙️](https://github.com/Programming-Hero-Web-Course4/b11a11-server-side-Arif547)

## 📝 Project Overview

**Food Tracker** is a full-stack MERN application that helps users manage food inventory and get alerts before their food expires. The goal is to reduce food waste by tracking expiry dates, allowing CRUD operations, and ensuring secure authentication and authorization.

The project focuses on practical implementation of authentication, protected routes, JWT-based security, responsive UI, and user-focused UX.

---

## 🚀 Key Features

### ✅ General Features
- Fully responsive design across mobile, tablet, and desktop
- Secure JWT authentication with Firebase
- Environment variables used to secure API keys and credentials
- Protected private routes for logged-in users only
- Dynamic routing and animated transitions (Framer Motion)
- Clean and recruiter-friendly UI

### 🔐 Authentication
- Email/password login and registration
- Google Sign-In (via Firebase)
- Password validation: uppercase, lowercase, and minimum 6 characters
- Authentication token via secure JWT stored in cookies
- Toast notifications for success/error messages

### 📊 Home Page
- Carousel with highlights
- **Nearly Expiry Section**: Items expiring in the next 5 days (sorted via MongoDB query)
- **Expired Section**: All expired items
- Two additional sections on food waste management
- See Details button to view full food data

### 🍱 Food Management
- **Add Food (Private)**: Upload new food with expiry info
- **Fridge Page**: Browse all food cards with search and filter (by category)
- **My Items Page**: Manage your own food items (Update/Delete using modal)
- **Food Details**:
  - Add Notes (only if the item belongs to the user)
  - Expiration countdown (live timer)
  - View all notes

### 🔍 Utilities
- Global search by food title/category
- Filter by food category dropdown
- CountUp animation for total expired and near-expiry foods
- Spinner component during data loading
- 404 Not Found page

---

## 🔐 JWT & Security
- Firebase auth issues token on login/registration
- JWT stored in cookies and sent with each request
- Server validates JWT before allowing sensitive operations (POST, PATCH, DELETE)
- Only the item owner can add notes or edit/delete their food

---

## 🛠️ Tech Stack

### 📌 Frontend
- React
- React Router DOM
- Firebase Auth
- Tailwind CSS
- Framer Motion
- React CountUp
- SweetAlert2 / React Toastify

### 📌 Backend
- Node.js
- Express.js
- MongoDB
- JWT (jsonwebtoken)
- dotenv
- CORS

---

## 📂 Folder Structure

````bash
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   └── App.jsx, main.jsx, ...
│   └── .env
├── server/
│   ├── index.js
│   ├── routes/
│   ├── middleware/
│   └── .env
````

---

## 🔗 Important Links

| Type           | URL                                                                                         |
| -------------- | ------------------------------------------------------------------------------------------- |
| 🔴 Live Site   | [Food Tracker](https://coruscating-stardust-95ebcd.netlify.app/)                            |
| 🧠 Client Repo | [GitHub Client](https://github.com/Arif547/Food-Tracker-Client-Side.git) |
| 🛠 Server Repo | [GitHub Server](https://github.com/Arif547/Food-Tracker-Server-Side.git) |



---

## 💡 Deployment Notes

* Firebase config and MongoDB credentials are hidden via environment variables.
* CORS and routes are secured on the backend.
* All protected routes are tested on page reload and do not redirect unless unauthorized.
* Firebase authorized domains updated for production (Netlify).

---

## 📈 Commit Guidelines

* ✅ 15+ meaningful client-side commits with descriptive messages
* ✅ 8+ meaningful server-side commits with descriptive messages

🖼️ Add screenshots here showing the home page, add food form, My Items table, and food details with countdown

---

## 👨‍💻 Author

**Mahabubul Alam (Arif547)**
Frontend & MERN Stack Developer
📧 Email: \[[mahabubulalamarif.com](mailto:mahabubulalamarif@example.com)]
🌍 Location: Bangladesh

---

## 🏁 Final Words

This project demonstrates full-stack capabilities including frontend UI/UX, backend APIs, secure authentication, JWT handling, and real-world problem-solving. Thank you for reviewing!


