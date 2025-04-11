# Jokes App

A web application for discovering, enjoying, and saving programming and random jokes. Built with Vue 3, TypeScript, and Tailwind CSS.

## Features

- 🎭 View random and programming jokes
- 💾 Save favorite jokes to your collection
- 📱 Fully responsive design
- 🔍 Filter and sort your joke collection

## Tech Stack

- **Frontend Framework**: Vue 3 with Composition API
- **Language**: TypeScript
- **Build Tool**: Vite
- **CSS Framework**: Tailwind CSS
- **Routing**: Vue Router
- **Icon Library**: Iconify
- **Code Quality**: ESLint, Prettier
- **Storage**: Local storage for persistence

## Project Structure

```
jokes-app/
├── src/               # Source code
│   ├── assets/        # Static assets
│   ├── components/    # Vue components
│   ├── composables/   # Composition functions
│   ├── constants/     # Application constants
│   ├── interfaces/    # TypeScript interfaces
│   ├── layouts/       # Layout components
│   ├── router/        # Vue Router setup
│   ├── services/      # API and storage services
│   ├── tests/         # Test files
│   │   └── components/# Component tests
│   ├── utils/         # Utility functions
│   └── views/         # Page components
├── public/            # Public static assets
└── ...                # Config files
```

## Technical Decisions

### Architecture & Component Design

- **Modular Component Structure**: Created separate, reusable components to improve readability and maintainability
- **Composables Pattern**: Extracted stateful logic into dedicated composable functions, enabling reuse across components
- **Service Layer**: Implemented dedicated service modules for API calls and local storage operations. Designed API services to be easily swapped (e.g., fetch can be replaced with Axios) without modifying consuming components

### Code Organization

- **Directory Structure**: Organized code into logical folders (components, composables, services, views, utils, etc) to support the application's architecture
- **TypeScript Interfaces**: Centralized type definitions in a dedicated `interfaces` directory for better organization and discoverability
- **Utility Functions**: Created specialized utility modules for common functionalities like filtering and sorting
- **Path Aliases**: Configured path aliases to simplify imports and improve code readability

### Frontend Best Practices

- **Responsive Design**: Implemented mobile-first design principles with responsive breakpoints
- **Accessibility**: Enhanced user experience with semantic HTML and ARIA labels for screen readers

### Technical Stack

- **Vue 3 Composition API**: Leveraged the latest Vue patterns for more maintainable code
- **TypeScript**: Added static typing throughout the application to catch errors early and improve developer experience
- **Vue Router**: Implemented client-side routing for efficient navigation and improved user experience
- **Tailwind CSS**: Used utility-first CSS framework for consistent styling and rapid development
- **ESLint & Prettier**: Enforced code quality and consistent formatting across the project

### Testing & Quality Assurance

- **Vitest**: Set up unit testing with Vitest to ensure component reliability
- **Component Testing**: Created targeted tests for individual components to verify behavior in isolation

### User Experience

- **Loading States**: 
  - Implemented loading spinners during API requests
  - Provides visual feedback while fetching new jokes
  - Prevents user interaction during loading

- **User Feedback**:
  - Clear messaging when jokes are saved or already exist in collection
   - Disabled states for save button to prevent duplicate saves
  - Toast notification when removing jokes from collection

- **Error Handling**:
  - Proper error handling for API failures:
    - Clear error messages when joke fetching fails
    - Retry button for failed API requests
  - Storage error management:
    - User notification when saved jokes can't be retrieved

- **Animations & Interactions**:
  - Typewriter animation effect for punchline reveal
  - Smooth transitions between joke types
  - Interactive star rating system (1-5 stars)

- **Navigation & Layout**:
  - Two distinct pages for better organization:
    - Home: Focus on discovering new jokes
    - Collection: Managing and organizing saved jokes
  - Clear navigation between sections using Navbar & buttons
  - Consistent layout and design patterns

- **Collection Management**:
  - Search and filter capabilities
  - Sort options (newest, highest rated, alphabetical)
  - Star rating system for personal joke rankings
  - Clear empty and error states

## Getting Started

### Prerequisites

- Node.js (v16 or above)
- npm

### Installation

1. Clone the repository

   ```bash
   git clone https://github.com/yourusername/jokes-app.git
   cd jokes-app
   ```

2. Install dependencies

   ```bash
   npm install
   ```

3. Start the development server

   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Available Commands

- `npm run dev` - Start the development server
- `npm run build` - Build for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint to check for code issues
- `npm run lint:fix` - Fix code issues automatically
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check if code is formatted correctly

## Deployment

1. Build the application

   ```bash
   npm run build
   ```

2. Deploy the `dist` folder to your hosting provider of choice (Netlify, Vercel, GitHub Pages, etc.)

## Credits

- Jokes are fetched from the [Official Joke API](https://official-joke-api.appspot.com/)
- Icons provided by [Iconify](https://iconify.design/)

## Testing

The project uses Vitest and Vue Test Utils for testing components. Tests are located in the `src/tests` directory, mirroring the structure of the source code.

### Running Tests

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Test Structure

- `src/tests/components/` - Tests for Vue components
  - `InfoMessage.spec.ts` - Tests for the InfoMessage component
  - `JokeCollectionItem.spec.ts` - Tests for the JokeCollectionItem component
  - `Navbar.spec.ts` - Tests for the Navbar component

### Testing Philosophy

Tests follow these principles:

- Component tests focus on rendering, user interaction, and component events
- Props and emitted events are verified
- Components are isolated by mocking dependencies like icons
- DOM structure and class combinations are tested for UI components

---

Made with Vue 3
