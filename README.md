System Arise

System Arise is a Solo Leveling inspired personal productivity system that turns focused daily work into an engaging progression loop. It brings habits, goals, learning, reflection, and personal progress into a single dashboard.

Product overview

Daily quests and habit tracking support streaks and XP. Goal planning, learning, notes, profile, and settings are brought together with analytics, heatmaps, leaderboards, achievements, and level up feedback. The experience includes responsive navigation and onboarding.

Technology

The application uses Next.js 16, React 19, TypeScript, Tailwind CSS, Recharts, Framer Motion, canvas confetti, and Lucide icons.

Run locally

Install dependencies with npm install, then start the development server with npm run dev. Open http://localhost:3000 in a browser. Use npm run lint for linting, npm run build for a production build, and npm start to run the production server.

Project structure

The src/app directory contains dashboard pages, route handlers, and the application layout. The src/components directory contains dashboard, navigation, authentication, and UI components. Shared system state is in src/context, while data sets and client engines are in src/lib. The scripts/google-apps-script.js file provides an optional Sheets integration helper.

Google Sheets sync

The repository includes a Sheets sync route and an Apps Script helper. Configure the target sheet and endpoint for the target environment, and keep deployment specific URLs and credentials out of source control.

Status

This is an active product prototype designed around personal productivity and progression. It is not yet a production authentication or multi tenant backend.
