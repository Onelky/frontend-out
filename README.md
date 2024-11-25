# Frontend Clean

## Tech Stack

The application is built using the following technologies:

- [React](https://react.dev/)
- [Vite](https://vitest.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Mantine](http://mantine.dev/)
- [React Query](https://tanstack.com/query/latest)
- [React hook form](https://react-hook-form.com/)
- [Msw](https://mswjs.io/)


## Getting Started

### Prerequisites

- Node.js and npm (Node Package Manager) installed on your system.
- Install a prettier extension on your preferred IDE.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Onelky/frontend-out.git
   cd frontend-out
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file with the variables inside `.env.example`.

4. Run the application in development mode:

   ```bash
   npm run dev
   ```

5. Open [http://localhost:3001/](http://localhost:3000) with your browser to see the
   result.


## Running Tests

Tests can be run using the following commands:

1. Run tests:
   ```bash
   npm run test
   ```
   
### Including coverage

1. Run tests with coverage

   ```bash
   npm run test:coverage
   ```

## Mocking Login
This project uses Mock Service Worker (MSW) to mock Login requests during both development and testing in order to simulate user authentication. The MSW handlers are defined in src/mocks/handlers.ts.

If, by any chance, MSW is not working, run the following command in order to create the requests interceptor:
```bash
npx msw init public/ --save
```



## Project Structure
To ensure scalability and maintainability, the application is organized using a feature-based structure. This approach keeps the code modular, where most of the logic is grouped by feature, encapsulating all related code in one place. 
The core idea is to keep functionality focused within its feature domain, while shared utilities and components are placed in dedicated folders.

```bash
.
├── src/
│   ├── app/                   # Global configuration for the app (e.g., app routes, global providers)
│   ├── components/            # Reusable, shared components across different features
│   ├── features/              # Feature-specific components, logic, and assets
│   ├── config/                # Configuration for environment variables and app-wide settings
│   ├── mocks/                 # Mock Service Worker (MSW) configuration and handlers for testing/mock APIs
│   ├── providers/             # Global React contexts and providers used across the app
│   ├── lib/                   # Pre-configured third-party libraries or utility exports
│   ├── pages/                 # App routes (usually for Next.js or React Router configurations)
│   ├── testUtils/             # Shared utility functions and helpers for tests
│   ├── theme/                 # Base theme, styles, and global CSS for the app
│   ├── types.ts               # Common TypeScript types shared across the application
│   └── utils/                 # Shared utility functions across features
├── vitest.setup.ts            # Global configuration and setup for tests (runs before each test)

```

### Feature Folder Structure
Each feature encapsulates its own components, API logic, styles, and tests. The feature folder represents a distinct part of the app, such as a page or functional domain. Here's a typical structure for a feature:

```bash
features
└── {{Feature}}/
    ├── api/                           # API request declarations and hooks related to this feature
    ├── __tests__/                     # Unit and integration tests for the feature
    │   ├── {{Feature}}.test.tsx      # Unit tests for individual components
    │   └── {{someIntegrationTest}}.test.tsx   # Integration tests for component interaction
    ├── index.ts                       # Public entry point for the feature, exporting all necessary parts
    ├── {{Feature}}.constants.ts     # Constants specific to this feature
    ├── {{Feature}}.types.ts         # TypeScript types specific to this feature
    ├── {{Feature}}.module.css       # CSS Module for styling the component
    └── {{Feature}}.utils.ts         # Utility functions specific to this feature
```
