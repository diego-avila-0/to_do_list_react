# CLAUDE.md

## Project Overview

A React-based to-do list application ("Mis tareas") with a dark-themed UI. Users can add, complete, and delete tasks. Built with Create React App (CRA), deployed to GitHub Pages. The UI is in **Spanish**.

## Tech Stack

- **Framework:** React 18.2 (functional components with hooks)
- **Build Tool:** Create React App (react-scripts 5.0.1) — Webpack/Babel abstracted
- **Language:** JavaScript / JSX (no TypeScript)
- **Styling:** Plain CSS with modular file-per-component pattern
- **Testing:** Jest + React Testing Library (via CRA)
- **Icons:** react-icons (Ant Design icons)
- **IDs:** uuid v9

## Project Structure

```
src/
├── index.js              # Entry point — renders <App /> into DOM
├── App.jsx               # Root component — renders title + ListTasks
├── components/
│   ├── listTasks.jsx     # Parent stateful component — manages task array
│   ├── task.jsx          # Stateless task display — toggle done / delete
│   └── taskForm.jsx      # Controlled input form — creates new tasks
├── css-custom/
│   ├── listTasks.css     # Styles for ListTasks
│   ├── task.css          # Styles for Task
│   └── taskForm.css      # Styles for TaskForm
├── App.css               # App-level layout styles
├── index.css             # Global base styles (fonts, body)
├── App.test.js           # Smoke test for App component
└── setupTests.js         # Jest setup — imports jest-dom matchers
public/
├── index.html            # HTML template with <div id="root">
├── manifest.json         # PWA manifest
└── ...                   # Favicon, logos, robots.txt
```

## Commands

| Command | Description |
|---------|-------------|
| `npm start` | Start development server (hot reload) |
| `npm run build` | Create production build in `/build` |
| `npm test` | Run Jest tests in watch mode |
| `npm run deploy` | Build and deploy to GitHub Pages |

## Architecture & Patterns

### Component Hierarchy

```
App
└── ListTasks (state: tasks[])
    ├── TaskForm (props: addTask callback)
    └── Task[] (props: id, text, done, checkTask, deleteTask)
```

### State Management

- **Local React state only** — `useState` in `ListTasks`
- No Redux, Context API, or external state libraries
- State is **not persisted** — resets on page refresh
- Task shape: `{ id: string (UUID), text: string, done: boolean }`

### Data Flow

- `ListTasks` owns all state and passes callbacks (`addTask`, `deleteTask`, `checkTask`) down as props
- `TaskForm` calls `addTask` on form submit with a new task object
- `Task` calls `checkTask`/`deleteTask` via props on user interaction

### Styling Conventions

- One CSS file per component in `src/css-custom/`
- Global styles in `src/index.css` and `src/App.css`
- Dark theme: backgrounds `#1b1b32`, `#2a2a40`, `#3b3b4f`; purple accent `#5a01a7`; green button `#00471b`
- Fonts: Lato (body), Roboto (headers)
- Layout: Flexbox, max-width 600px container

## Linting

ESLint configured via CRA defaults in `package.json`:
- Extends: `react-app`, `react-app/jest`
- No separate `.eslintrc` file — config lives in `package.json` under `eslintConfig`
- No Prettier configured

## Testing

- Framework: Jest (bundled with CRA)
- Libraries: `@testing-library/react`, `@testing-library/jest-dom`, `@testing-library/user-event`
- Test files: co-located in `src/` (e.g., `App.test.js`)
- Run: `npm test` (watch mode) or `CI=true npm test` (single run)

## Deployment

- Target: GitHub Pages at `https://diego-avila-0.github.io/to_do_list_react`
- Uses `gh-pages` package
- `npm run deploy` triggers `predeploy` (build) then pushes `/build` to `gh-pages` branch

## Conventions for AI Assistants

- **Language:** UI text is in Spanish — keep new user-facing strings in Spanish
- **Components:** Use functional components with hooks; no class components
- **File naming:** Component files use camelCase (e.g., `listTasks.jsx`, `taskForm.jsx`)
- **CSS:** Add component styles in `src/css-custom/` with matching filename
- **No TypeScript:** Project uses plain JS/JSX
- **State:** Keep state in the nearest common ancestor; pass via props
- **Testing:** Add tests alongside components using React Testing Library patterns
- **No env files:** No environment variables are currently in use
