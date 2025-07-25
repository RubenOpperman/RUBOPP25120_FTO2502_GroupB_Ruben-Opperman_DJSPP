# 🎧 Podcast Explorer

**Podcast Explorer** is a responsive web application built with **React**, **Vanilla JavaScript**, **TailwindCSS**, and **HTML5**.

It allows users to browse, filter, sort, and search podcasts fetched from an external API, all within a modern and responsive UI with smooth loading transitions. Users can click on a podcast to view detailed information, including its seasons and episodes. Returning to the main view retains all filters and sorting preferences, ensuring a seamless user experience.

The app features a built-in audio player that lets you play episodes and skip to any point using an interactive progress bar, which remains accessible throughout the application. You can favorite episodes and manage them from a dedicated Favorites page, where you can also unfavorite them at any time.

A visually engaging recommended carousel allows users to browse featured podcasts. Additionally, the app includes full support for both light and dark themes, toggleable at any time.

---

## 🚀 Features

- ✅ Built with **React**, **Vanilla JavaScript**, **TailwindCSS**, and **HTML5**
- ✅ Fetches real-time podcast data from an external **API**
- ✅ Displays a **loading screen** while fetching data
- ✅ Filter podcasts by **genre** and **sort order** (A–Z, Z–A, Newest)
- ✅ **Search** podcasts by title
- ✅ Responsive, clean layout with modern card design
- ✅ Built using a **component-based architecture**
- ✅ Pagination controls with **Previous** and **Next** buttons
- ✅ View **podcast details**, including seasons and episodes
- ✅ **Audio player** with playback controls
- ✅ Add/remove episodes to **Favorites**
- ✅ View grouped episodes on the **Favorites** page
- ✅ LocalStorage persistence for favorites and themes
- ✅ Toggle between **Light/Dark** themes
- ✅ **Animated search bar** with toggle button

---

## 🛠️ Tech Stack

- **React** – JavaScript library for building UI components
- **Vanilla JavaScript** – Used for utility functions and logic
- **TailwindCSS** – Utility-first CSS framework for modern design
- **HTML5** – Semantic markup and layout
- **Vite** – Fast development server and bundler

---

## 🧠 How It Works

1. The app displays a **loading screen** while podcast data is being fetched.
2. Podcast data is retrieved from an external **API** using modern `async/await` functions.
3. Users can:
   - 🎧 **Filter by genre**
   - 🔤 **Sort** podcasts alphabetically or by latest update
   - 🔎 **Search** by podcast title
4. Podcasts are displayed in **responsive cards** showing:
   - Title
   - Description
   - Cover image
   - Genre tags
5. Users can **click on a podcast** to view more details, including:
   - Season list
   - Episodes per season
   - Descriptions and release dates
6. **Pagination** is implemented to show **8 podcasts per page**, with **Previous** and **Next** controls.
7. The built-in **audio player** allows users to:
   - Play/pause episodes
8. The **Favorites** system allows users to:
   - Click a heart to add/remove episodes from favorites
   - View favorites grouped by show on a dedicated page
   - Sort favorites by title/date added
   - Stored in LocalStorage
9. The **Theme toggle** lets users switch between light and dark mode.
10. The **search bar** appears with animation and can be toggled with a button.
11. Navigation links underline when active.

---

## 📁 Project Structure

```
📦 podcast-explorer/
├── 📁 node_modules/
├── 📁 public/
├── 📁 src/
│   ├── 📁 assets/
│   ├── 📁 components/
│   │   ├── AudioContext.jsx
│   │   ├── Carousel.jsx
│   │   ├── Episodes.jsx
│   │   ├── Favorite.jsx
│   │   ├── filter.jsx
│   │   ├── genres.jsx
│   │   ├── header.jsx
│   │   ├── Layout.jsx
│   │   ├── mainContent.jsx
│   │   ├── PageNav.jsx
│   │   ├── PodcastDetail.jsx
│   │   ├── Seasons.jsx
│   │   ├── ThemeContext.jsx
│   │   └── ThemeToggle.jsx
│   ├── 📁 data/
│   ├── 📁 utils/
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .gitignore
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── README.md
├── vercel.json
├── vite.config.js

```

## ⚡ Getting Started

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/RubenOpperman/RUBOPP25120_FTO2502_GroupB_Ruben-Opperman_DJSPP.git
```

### 2️⃣ Install Dependencies

`npm install`

### 3️⃣ Run the App

## ⚡ Vite Development

Run the app with Vite:

```bash
npm run dev
```

## Vercel Deployment link

https://podcast-app-landing-page.vercel.app/
