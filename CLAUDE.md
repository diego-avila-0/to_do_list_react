# CLAUDE.md

## Project Overview

A React-based to-do list application ("Mis Tareas") with a vintage **Back to the Future** inspired UI. Features project-based task organization with tabs, task priorities, inline editing, filtering, and browser localStorage persistence. Built with Create React App (CRA), deployed to GitHub Pages. The UI is in **Spanish**.

## Tech Stack

- **Framework:** React 18.2 (functional components with hooks)
- **Build Tool:** Create React App (react-scripts 5.0.1) — Webpack/Babel abstracted
- **Language:** JavaScript / JSX (no TypeScript)
- **Styling:** Plain CSS with modular file-per-component pattern
- **Testing:** Jest + React Testing Library (via CRA)
- **Icons:** react-icons (Ant Design icons)
- **IDs:** uuid v9
- **Persistence:** Browser localStorage

## Project Structure

```
src/
├── index.js              # Entry point — renders <App /> into DOM
├── App.jsx               # Root component — manages projects state + localStorage
├── components/
│   ├── projectTabs.jsx   # Project tab navigation — add/rename/delete projects
│   ├── listTasks.jsx     # Task list with filters and stats
│   ├── task.jsx          # Task display — toggle done / edit / delete / priority
│   └── taskForm.jsx      # Controlled input form — creates new tasks with priority
├── css-custom/
│   ├── projectTabs.css   # Styles for ProjectTabs
│   ├── listTasks.css     # Styles for ListTasks (stats, filters, empty state)
│   ├── task.css          # Styles for Task (priority badges, edit mode)
│   └── taskForm.css      # Styles for TaskForm (priority selector)
├── App.css               # App-level layout styles + BTTF header
├── index.css             # Global base styles (fonts, scrollbar, theme)
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
App (state: projects[], activeProjectId — persisted to localStorage)
├── ProjectTabs (props: projects, callbacks for add/delete/rename/select)
└── ListTasks (props: tasks[], onUpdateTasks callback)
    ├── TaskForm (props: addTask callback)
    └── Task[] (props: id, text, done, priority, createdAt, checkTask, deleteTask, editTask)
```

### State Management

- **Local React state** — `useState` in `App` for projects and active project
- `ListTasks` receives tasks via props and reports changes via `onUpdateTasks` callback
- **Persisted to localStorage** under key `bttf_todo_data`
- State auto-saves on every change via `useEffect`
- Project shape: `{ id: string, name: string, tasks: Task[] }`
- Task shape: `{ id: string, text: string, done: boolean, priority: 'alta'|'media'|'baja', createdAt: string (ISO) }`

### Data Flow

- `App` owns all state (projects + active selection) and passes callbacks down
- `ProjectTabs` handles project CRUD (add, rename, delete, select)
- `ListTasks` manages filtering (todas/pendientes/completadas) and delegates task mutations up to `App`
- `TaskForm` calls `addTask` with text + priority
- `Task` supports check/uncheck, inline edit, and delete via prop callbacks

### Features

- **Project tabs:** Multiple task lists organized by project
- **Task priorities:** Alta (red), Media (orange), Baja (cyan) — visual badges
- **Inline editing:** Edit task text without leaving the list
- **Filtering:** View all, pending, or completed tasks
- **Stats bar:** Live counters for total/pending/completed tasks
- **localStorage persistence:** Data survives page refresh

### Styling Conventions

- One CSS file per component in `src/css-custom/`
- Global styles in `src/index.css` and `src/App.css`
- **Back to the Future vintage theme:**
  - Background: `#0a0a0f` (near black)
  - Primary neon: `#ff6600` / `#ff8800` (orange glow)
  - Secondary neon: `#00ccff` (cyan)
  - Success: `#00ff88` (green)
  - Danger: `#ff3333` (red)
  - Glow effects via `text-shadow` and `box-shadow`
- Fonts: Orbitron (titles), Share Tech Mono (labels/mono), Rajdhani (body)
- Layout: Flexbox, max-width 650px container

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
- **State:** App owns project/task state; pass via props. Always persist to localStorage
- **Theme:** Maintain the Back to the Future vintage aesthetic — neon glows, dark backgrounds, Orbitron/Share Tech Mono fonts
- **Testing:** Add tests alongside components using React Testing Library patterns
- **No env files:** No environment variables are currently in use
