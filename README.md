# Who Wants to Be a Millionaire 🎮

A web-based implementation of the classic "Who Wants to Be a Millionaire" game, built with [Next.js](https://nextjs.org) and [TypeScript](https://www.typescriptlang.org).

🚀 **Live Demo:** [my-vercel-link-here](https://millionaire-game-rb4g2tw99-burkatt99s-projects.vercel.app/)

## About the Game

The game features 12 questions of increasing difficulty. Each question may have one or multiple correct answers — the player must select the required number of correct answers to proceed. The game config is loaded dynamically and is fully extensible via a JSON file.

**Key features:**
- 12 questions with increasing rewards up to $1,000,000
- Support for multiple correct answers per question
- Dynamic game configuration via JSON
- Fully responsive design
- Reward ladder with current, won, and default states

## Getting Started

First, run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Requirements

- Node.js `v20.19.0+`
- npm `v10+`

## Installation
```bash
git clone <repository-url>
cd millionaire_game
npm install
```

## Scripts
```bash
npm run dev          # start development server
npm run build        # build for production
npm run start        # start production server
npm run lint         # run ESLint
npm run lint:fix     # run ESLint and fix issues
npm run test         # run unit tests
```

## Tech Stack

- [Next.js 15](https://nextjs.org) — React framework
- [TypeScript](https://www.typescriptlang.org) — type safety
- [Styled Components](https://styled-components.com) — component styling
- [Jest](https://jestjs.io) + [Testing Library](https://testing-library.com) — unit testing
- [ESLint](https://eslint.org) + [Prettier](https://prettier.io) — code quality

## Git Hooks

The project uses [Husky](https://typicode.github.io/husky) for automatic checks:

- **pre-commit** — runs ESLint on changed `.ts` and `.tsx` files via [lint-staged](https://github.com/lint-staged/lint-staged)
- **pre-push** — runs all unit tests

Hooks are set up automatically after `npm install` via the `prepare` script.

## Project Structure
```
src/
  app/              # Next.js app router
  api/              # fetch functions
  components/       # reusable UI components
  constants/        # types and constants
  pages/            # game screens (Start, Process, Result)
  providers/        # React context (GameContext)
  styles/           # global styles and theme
```

## Deploy on Vercel

The easiest way to deploy this app is to use the [Vercel Platform](https://vercel.com).

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.