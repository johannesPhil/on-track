# Career Dashboard

A modern, responsive career dashboard built with React and Vite, featuring dynamic background images from Unsplash API.

## Features

- **Dynamic Backgrounds**: Daily rotating background images from Unsplash API
- **Smart Caching**: Images are cached locally with automatic cleanup
- **Offline Support**: Fallback to cached images when API is unavailable
- **Modern Stack**: Built with React 19, Vite, TailwindCSS, and TanStack Query
- **Responsive Design**: Optimized for all screen sizes

## Tech Stack

- **Frontend**: React 19 with Vite
- **Styling**: TailwindCSS 4.x
- **State Management**: TanStack React Query
- **API**: Unsplash API for background images
- **Build Tool**: Vite with SWC for fast refresh

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Unsplash API key

### Installation

1. Clone the repository

```bash
git clone <repository-url>
cd on-track
```

2. Install dependencies

```bash
npm install
```

3. Set up environment variables

```bash
cp .env.example .env
```

Add your Unsplash API key to `.env`:

```
VITE_UNSPLASH_KEY=your_unsplash_api_key_here
```

4. Start the development server

```bash
npm run dev
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## API Integration

The app integrates with Unsplash API to fetch high-quality background images:

- Images are fetched once per day and cached locally
- Automatic fallback to cached images if API is unavailable
- Smart cache cleanup removes images older than 7 days
- Optimized for landscape orientation with nature/minimal themes
