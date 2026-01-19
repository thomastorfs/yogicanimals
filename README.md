# YogicAnimals

An interactive species profiler that evaluates animal characteristics through a framework of spiritually-informed attributes inspired by traditional Eastern philosophy.

## Overview

**YogicAnimals** is a web-based exploration tool and visual database that examines animal species across a curated set of behavioral, ecological, and symbolic attributes rooted in yogic concepts. The platform presents comparative profiles of species, helping users discover patterns and insights into how different animals embody various qualities like harmony, vigor, lethargy, and aggression.

### Core Concept

We evaluate the spiritual signatures of animal species by measuring them across:
- **Positive Attributes**: Sattva (Clarity), Vairagya (Detachment), Viveka (Discernment), Ekagrata (Focus), Santosha (Contentment), and others
- **Negative Attributes**: Tamas (Inertia), Rajas (Restlessness), Himsa (Aggression), Greed, Lethargy, and others

Each species receives a composite score calculated by aggregating these attributes with weighted multipliers to reflect their relative influence on overall spiritual profile.

## Features

- **Species Database**: Browse and search a curated collection of animals with detailed attribute analysis
- **Profile Visualizations**: Interactive radar charts and attribute breakdowns for each species
- **Attribute Explorer**: Filter and compare species by specific yogic qualities
- **Species Details**: In-depth profiles showing attribute composition and visual representations
- **Ranked Lists**: Explore top and bottom performers across individual attributes

## Tech Stack

- **Frontend**: React + TypeScript with Vite
- **Styling**: CSS with component-scoped styles
- **Routing**: React Router for navigation
- **Data Visualization**: Recharts for interactive charts
- **Icons**: Lucide React

## Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

The app will be available at `http://localhost:5173/`

### Build for Production

```bash
npm run build
```

## Project Structure

```
yogicanimals/
├── components/              # React components
│   ├── Home.tsx            # Landing page
│   ├── AnimalList.tsx      # Species catalog view
│   ├── AnimalDetail.tsx    # Individual species profile
│   ├── AnimalRadarChart.tsx # Radar chart visualization
│   ├── AnimalAttributes.tsx # Attribute display component
│   └── ...                 # Other UI components
├── App.tsx                 # Main app component
├── types.ts                # TypeScript interfaces
├── data.ts                 # Species database and attributes
├── index.tsx               # Entry point
└── vite.config.ts          # Vite configuration
```

## Pages

- **Home**: Overview of the YogicAnimals project and core concepts
- **Catalog**: Searchable, filterable collection of analyzed species
- **Analytics**: Comparative views and attribute exploration
- **Species Profile**: Individual species pages with full attribute breakdown and related species

## Development

Built with:
- **Anthropic Opus 4.5**: Animal list retrieval, yogic scoring and calculation
- **Google AI Studio**: Primary development environment and prompt engineering tool
- **GitHub Copilot**: Final product vibe coding assistance using Claude Haiku 4.5

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## References

For more information about Yogic philosophy and the conceptual frameworks underlying this analysis, explore classical texts on Yoga, Vedanta, and Buddhist spirituality.
