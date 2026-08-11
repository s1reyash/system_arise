# System Arise

A Solo Leveling-inspired personal productivity system that turns focused daily work into an engaging progression loop. System Arise brings habits, goals, learning, reflection, and personal progress into a single dashboard.

## What it includes

- Daily quests and habit tracking with streaks and XP
- - Goal planning and progress views
  - - Learning, notes, profile, and settings areas
    - - Analytics, heatmaps, and personal performance insights
      - - Leaderboards, achievements, and level-up feedback
        - - Responsive navigation and onboarding/login experiences
          - - Optional Google Sheets synchronisation through a Next.js API route and Apps Script helper
           
            - ## Tech stack
           
            - - Next.js 16 and React 19
              - - TypeScript
                - - Tailwind CSS
                  - - Recharts
                    - - Framer Motion and canvas-confetti
                      - - Lucide icons
                       
                        - ## Run locally
                       
                        - Install dependencies with `npm install`, then start the development server with `npm run dev`. Open http://localhost:3000 in your browser.
                       
                        - Use `npm run lint` for linting, `npm run build` for a production build, and `npm start` to run the production server.
                       
                        - ## Project structure
                       
                        - `src/app` contains dashboard pages, route handlers, and the application layout. `src/components` contains the dashboard, navigation, authentication, and UI components. `src/context` holds shared system state. `src/lib` contains data sets and client-side engines. `scripts/google-apps-script.js` is the optional Sheets integration helper.
                       
                        - ## Google Sheets sync
                       
                        - The repository includes a Sheets sync route and an Apps Script helper. Configure the target sheet and endpoint for your own environment, and keep deployment-specific URLs and credentials out of source control.
                       
                        - ## Status
                       
                        - This is an active product prototype designed around personal productivity and progression. It is not yet a production authentication or multi-tenant backend.
                        - 
