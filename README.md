# 🗺️ Map Explorer - Google Maps Clone

A modern, interactive map application built with React and Leaflet, inspired by Google Maps.

## Features

- 🗺️ Interactive map with OpenStreetMap tiles
- 🔍 Location search functionality
- 📍 Click-to-add markers
- 🎨 Modern, responsive UI design
- 📱 Mobile-friendly interface
- ✨ Smooth animations and transitions

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Usage

- **Search**: Type a location name in the search bar (e.g., "Paris", "London", "New York")
- **Add Markers**: Click anywhere on the map to add a marker
- **Remove Markers**: Click the × button next to any marker in the sidebar
- **View Location Info**: Search results will show location coordinates

## Technologies Used

- **React** - UI framework
- **Vite** - Build tool and dev server
- **Leaflet** - Open-source mapping library
- **React-Leaflet** - React bindings for Leaflet
- **OpenStreetMap** - Map tile provider

## Future Enhancements

- Real geocoding API integration (e.g., Nominatim, Mapbox Geocoding)
- Route planning and directions
- Street view integration
- Custom map styles
- Location sharing
- Saved places/favorites

## Deployment to Vercel

### Option 1: Deploy via Vercel CLI (Recommended)

1. Install Vercel CLI globally:
```bash
npm install -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy your project:
```bash
vercel
```

4. Follow the prompts:
   - Set up and deploy? **Yes**
   - Which scope? (Select your account)
   - Link to existing project? **No**
   - Project name? (Press Enter for default or type a name)
   - Directory? (Press Enter for current directory)
   - Override settings? **No**

5. For production deployment:
```bash
vercel --prod
```

### Option 2: Deploy via GitHub

1. Initialize git repository (if not already done):
```bash
git init
git add .
git commit -m "Initial commit"
```

2. Create a new repository on GitHub

3. Push your code to GitHub:
```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

4. Go to [vercel.com](https://vercel.com) and sign in

5. Click "Add New Project"

6. Import your GitHub repository

7. Vercel will auto-detect Vite settings - just click "Deploy"

### Option 3: Deploy via Vercel Dashboard

1. Go to [vercel.com](https://vercel.com) and sign in

2. Click "Add New Project"

3. Drag and drop your project folder, or connect a Git repository

4. Vercel will automatically detect Vite and configure the build settings

5. Click "Deploy"

### Build Configuration

The project includes a `vercel.json` file with the correct configuration:
- Build Command: `npm run build`
- Output Directory: `dist`
- Framework: `vite`

Vercel will automatically:
- Install dependencies (`npm install`)
- Build the project (`npm run build`)
- Deploy the `dist` folder

## License

MIT

