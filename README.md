# InkWell — Blog Management Platform

A modern, responsive blog management platform built for the Technical Department Recruitment Task 2026–27. InkWell lets users discover, search, read, bookmark, like, create, edit and delete blog posts through a polished editorial interface.

## Features

- Responsive blog discovery homepage
- Search by title, excerpt, author and category
- Category filtering
- Individual article pages with related stories
- Create, edit and delete blog posts
- LocalStorage persistence
- Bookmarks and likes
- Dark/light mode with persistence
- Toast feedback and delete confirmation modal
- Empty, error and no-results states
- Mobile navigation
- Accessible labels and semantic UI
- 10 realistic starter articles

## Tech Stack

- React.js
- Vite
- Tailwind CSS
- React Router
- Lucide React
- Browser LocalStorage

## Run locally

```bash
npm install
npm run dev
```

Then open the local Vite URL shown in the terminal.

For a production build:

```bash
npm run build
npm run preview
```

## Data source

The initial content is local mock data stored in `src/data/blogs.js`. User-created/edited content, likes, bookmarks and theme preferences are persisted in browser LocalStorage. No backend or external API is required.

## Project structure

```text
src/
├── components/     Reusable UI components
├── data/           Initial blog content
├── pages/          Route-level pages
├── utils/          LocalStorage helpers
├── App.jsx         Application state and routing
├── main.jsx        React entry point
└── index.css       Global styles and Tailwind setup
```

## Challenges & solutions

### Persistent content without a backend
LocalStorage is used behind a small utility layer so blogs, likes and bookmarks survive page refreshes without coupling storage logic to UI components.

### Search and filtering
Search is performed across multiple useful fields and combined with category filtering using derived React state, keeping the UI immediately responsive.

### Complete application states
The project intentionally handles happy and unhappy paths: empty bookmarks, zero search results, invalid blog IDs, missing content and destructive-action confirmation.

### Responsive design
The layout uses responsive grids, mobile navigation, flexible forms and adaptive article typography so the same application remains usable from small phones through large desktop screens.

## Future improvements

- Authentication and user accounts
- Backend/database integration
- Rich text editor and Markdown support
- Comments and threaded discussions
- Image upload/storage
- Author profiles
- Analytics dashboard

## Deployment

The project can be deployed to Vercel, Netlify or another static hosting provider. Use `npm run build` as the build command and `dist` as the output directory.
