# QulineJB 🎬

> A responsive movie web application to browse, search, and save your favorite movies.

![Project Banner](images/qdanner.png)

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Key Components](#key-components)
- [Installation](#installation)
- [Usage](#usage)
- [Responsive Design](#responsive-design)
- [Future Improvements](#future-improvements)
- [License](#license)

---

## Overview

**QulineJB** is a web application built with **Next.js**, **TypeScript**, and **Tailwind CSS**. It allows users to:

- Browse **top-rated movies**
- Filter movies by **genres**
- View detailed movie information
- Track **recently viewed** movies
- Save movies to **watch later**
- Search movies by **title**

All movie data is sourced from the **TMDB API**.

---

## Features

1. **Top Rated Movies**
   - Fetches the most popular movies from TMDB.
   - Movies are displayed in a responsive grid.

2. **Genres**
   - Filter movies by genres such as Action, Comedy, Drama, etc.
   - Displays relevant movies dynamically.

3. **Movie Details**
   - Shows synopsis, ratings, release date, and genres for each movie.
   - Dedicated details page for every movie.

4. **Recently Viewed Movies**
   - Tracks movies recently viewed by the user.
   - Quick access to previously explored movies.

5. **Watch Later**
   - Save movies to a watch-later list.
   - Data is stored in **localStorage**.
   - Remove movies dynamically from the list.

6. **Search Functionality**
   - Search movies by title using TMDB Search API.
   - Displays results in a responsive grid.
   - Handles empty queries gracefully by showing top-rated movies.

---

## Tech Stack

| Technology       | Purpose                                                |
|-----------------|--------------------------------------------------------|
| Next.js          | Frontend framework with server-side rendering         |
| TypeScript       | Type-safe JavaScript for robust and maintainable code |
| Tailwind CSS     | Utility-first CSS framework for modern UI             |
| TMDB API         | Source of movie data including ratings and genres    |
| LocalStorage     | Store watch-later and recently viewed movies locally |

---

## Project Structure
```
src/
├─ components/
│ ├─ shared/
│ │ └─ MovieCard.tsx
│ └─ ...
├─ pages/
│ ├─ index.tsx
│ ├─ watch-later.tsx
│ └─ ...
├─ redux/
│ ├─ features/
│ │ ├─ topRated/
│ │ │ └─ topRatedMovieApi.ts
│ │ └─ ...
│ └─ store.ts
└─ styles/
└─ globals.css

```
---

## Key Components

### MovieCard.tsx
- Displays movie poster, title, and interactive buttons (watch later, remove).
- Handles click events for navigating to movie details or adding/removing watch-later items.

### useWatchLater Hook
- Custom hook to manage watch-later functionality.
- Handles storing and retrieving data from **localStorage**.
- Provides toggle functionality for adding/removing movies.

### Search Input
- Controlled input component that dynamically updates the movie grid.
- Calls TMDB Search API and updates results in real-time.

---

## Installation

1. Clone the repository:

```bash
    git clone https://github.com/yourusername/qulinejb.git
    cd qulinejb
    Install dependencies:

    npm install
    # or
    yarn install


    Add your TMDB API key:

    Create a .env.local file:

    NEXT_PUBLIC_TMDB_API_KEY=your_api_key_here

    Start the development server:

    npm run dev
    # or
    yarn dev

    Open http://localhost:3000 in your browser.

 ```

 Responsive Design

Grid Layout: Tailwind classes ensure responsiveness:

Mobile: grid-cols-1

Small screens: grid-cols-2

Medium screens: grid-cols-3

Large screens: grid-cols-4

MovieCard scales with hover effect for better UX.

Watch-later and recently viewed sections adapt to screen size.