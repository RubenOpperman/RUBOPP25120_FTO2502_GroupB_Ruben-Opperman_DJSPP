# 🎧 Podcast Explorer

**Podcast Explorer** is a responsive web application built with **React**, **Vanilla JavaScript**, **TailwindCSS**, and **HTML5**.

It allows users to browse, filter, sort, and search podcasts fetched from an external API, with a modern UI and smooth loading experience. You can also click on a podcast to view its details such as seasons, episodes, and other information. If you return to the main view, all filters remain **persistent** — no need to reapply them.

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
6. **Pagination** is implemented to show **8 podcasts per page**, with **Previous** and **Next** controls for smooth navigation.

---

## 📁 Project Structure

```
📦 podcast-explorer/
├── 📁 node_modules/
├── 📁 public/
├── 📁 src/
│   ├── 📁 assets/
│   ├── 📁 components/
│   │   ├── Episodes.jsx
│   │   ├── filter.jsx
│   │   ├── genres.jsx
│   │   ├── header.jsx
│   │   ├── Layout.jsx
│   │   ├── mainContent.jsx
│   │   ├── PageNav.jsx
│   │   ├── PodcastDetails.jsx
│   │   └── Seasons.jsx
│   ├── 📁 data/
│   │   ├── genreData.js
│   │   └── podcastData.js
│   ├── 📁 utils/
│   │   ├── formatDate.js
│   │   └── getGenreIds.js
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
└── vite.config.js
```

## ⚡ Getting Started

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/RubenOpperman/RUBOPP25120_FTO2502_GroupB_Ruben-Opperman_DJS05.git
```

### 2️⃣ Install Dependencies

`npm install`

### 3️⃣ Run the App

## ⚡ Vite Development

Run the app with Vite:

```bash
npm run dev
```
