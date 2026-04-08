# TUF Calendar React

A visually rich calendar and personal planning application built with React, TypeScript, Zustand, and styled-components.

This project is designed as a single-page calendar experience where users can:

- browse months in a poster-style wall calendar layout
- add notes for a specific day
- create and manage tasks
- select date ranges and add entries across multiple days
- attach month, date, or range-based notes
- mark holidays and trigger a celebration effect
- switch between light and dark themes

The app currently stores its data in the browser using `localStorage`, which makes it easy to run locally without a backend.

## What This Application Does

The application centers around one main screen: the calendar page.

From that page, users can:

- move between months
- select a single date
- select a start and end date to create a range
- add notes for a day
- add tasks for a day
- edit, delete, and toggle tasks
- add notes that apply to:
  - the whole month
  - a selected date
  - a selected date range
- mark holidays for specific dates
- see today’s tasks in a separate quick-view rail

The interface is designed to feel more like a decorative wall calendar than a typical utility dashboard.

## Tech Stack

- React 19
- TypeScript
- Vite
- Zustand for state management
- styled-components for component styling
- react-confetti for celebration effects
- react-lottie-player for the loading animation
- Bootstrap / React Bootstrap for modal support in shared UI

## Project Structure

```text
src/
  App.tsx
  main.tsx
  index.css

  assets/
    Variables.ts
    images/
    lotties/

  components/
    Loader/
    Error/

  config/
    index.ts

  db/
    calendar/
      types.ts
      storage.ts
      attachedNotes.ts
      holidays.ts

  hooks/
    useTheme.hooks.tsx

  pages/
    Calendar/
      Calendar.tsx
      config/
      components/
      services/
      stores/

  utils/
    date.ts
```

## Core Architecture

The application follows a simple layered structure:

1. `Calendar.tsx`
   This is the main orchestration page. It connects UI state, service calls, and rendered components.

2. `pages/Calendar/components`
   These components render the calendar UI:
   - `ContainerComp` handles the overall layout
   - `HeroSection` renders the monthly poster image
   - `MonthGrid` renders the month grid and day cells
   - `TabSwitcher` switches between notes, tasks, and add modes
   - `EntryPanel` renders all note/task/holiday forms and lists

3. `pages/Calendar/stores`
   Zustand stores handle UI state and async action state such as loading, response, and error for note/task operations.

4. `pages/Calendar/services`
   The service layer exposes a singleton `CalendarService` that keeps the page and stores decoupled from low-level data operations.

5. `src/db`
   This is the local persistence layer. It reads and writes calendar data into `localStorage`.

6. `src/utils/date.ts`
   Date formatting, month calculations, grid generation, and range helper functions live here.

## Data Flow

The main data flow looks like this:

```text
UI Component
  -> Zustand Store or Calendar Page Handler
  -> CalendarService singleton
  -> db helpers
  -> localStorage
```

Examples:

- Adding a note:
  `EntryPanel -> addNote.store -> CalendarService.addNoteAPI() -> addNote.service.ts -> localStorage`

- Loading notes for a selected date:
  `Calendar.tsx -> fetchNotes.store -> CalendarService.fetchNotesAPI() -> fetchNotes.service.ts -> localStorage`

- Saving a holiday:
  `Calendar.tsx -> CalendarService.saveHolidayAPI() -> holidays.service.ts -> db/calendar/holidays.ts`

## State Management

This app uses Zustand in two ways:

- `calendarUI.store.ts`
  Handles page-level UI state such as selected date, visible month, selected range, active tab, add mode, and transition direction.

- action stores
  Separate stores manage actions such as:
  - fetching notes
  - adding notes
  - updating notes
  - deleting notes
  - fetching tasks
  - adding tasks
  - updating tasks
  - deleting tasks
  - toggling tasks
  - fetching month entries

This structure keeps async action state isolated and makes the page easier to reason about.

## Local Storage Model

The calendar is currently backend-free.

The application persists data in `localStorage` using the storage key configured in:

- [src/pages/Calendar/config/index.ts](/Users/aravinthraj/Developer/tuf-calendar-react/src/pages/Calendar/config/index.ts)

Primary keys:

- `wall-calendar-entries`
  Stores date-based notes and tasks

- `wall-calendar-entries-attached-notes`
  Stores month/date/range attached notes

- `wall-calendar-entries-holidays`
  Stores holiday labels by date

Because the app uses `localStorage`, data is:

- available immediately without setup
- limited to the current browser/device
- cleared if browser storage is cleared

## Theme System

The app supports light and dark themes through a custom theme context in:

- [src/hooks/useTheme.hooks.tsx](/Users/aravinthraj/Developer/tuf-calendar-react/src/hooks/useTheme.hooks.tsx)

Theme values come from:

- [src/assets/Variables.ts](/Users/aravinthraj/Developer/tuf-calendar-react/src/assets/Variables.ts)

This file contains:

- color palettes
- font choices
- shared image mappings
- monthly hero poster assets
- the Lottie loader asset

## Calendar Configuration

Most of the calendar-specific content is centralized in:

- [src/pages/Calendar/config/index.ts](/Users/aravinthraj/Developer/tuf-calendar-react/src/pages/Calendar/config/index.ts)

This includes:

- weekday labels
- tabs
- add options
- month names and accent colors
- UI content strings used by the calendar components

This makes it easier to:

- rename labels
- change UI copy
- customize month accents
- keep components cleaner and more maintainable

## Main Features

### 1. Day Notes

Users can create notes for a selected day and later edit or delete them.

### 2. Tasks

Users can:

- add tasks
- edit tasks
- delete tasks
- mark tasks as complete/incomplete

### 3. Range Selection

The user can click one date and then another date to define a range. Once a range is complete, notes or tasks can be added across all dates in that range.

### 4. Attached Notes

Attached notes are separate from normal day notes. They can be linked to:

- the whole month
- a specific date
- a selected range

These notes are useful for reminders that should apply beyond a single day entry.

### 5. Holiday Markers

Users can assign a holiday label to a date. When selected, that day can trigger a festive overlay and confetti animation.

### 6. Monthly Visual Identity

Each month has:

- a unique label
- its own accent color
- a dedicated hero poster image

## How to Run the Project

### Prerequisites

- Node.js 18+ recommended
- npm or yarn

### Install dependencies

```bash
npm install
```

or

```bash
yarn
```

### Start development server

```bash
npm run dev
```

### Build for production

```bash
npm run build
```

### Preview the production build

```bash
npm run preview
```

### Lint the project

```bash
npm run lint
```

## How to Understand the Code Quickly

If you are new to the codebase, read the files in this order:

1. [src/App.tsx](/Users/aravinthraj/Developer/tuf-calendar-react/src/App.tsx)
2. [src/pages/Calendar/Calendar.tsx](/Users/aravinthraj/Developer/tuf-calendar-react/src/pages/Calendar/Calendar.tsx)
3. [src/pages/Calendar/config/index.ts](/Users/aravinthraj/Developer/tuf-calendar-react/src/pages/Calendar/config/index.ts)
4. [src/pages/Calendar/components/MonthGrid/index.tsx](/Users/aravinthraj/Developer/tuf-calendar-react/src/pages/Calendar/components/MonthGrid/index.tsx)
5. [src/pages/Calendar/components/EntryPanel/index.tsx](/Users/aravinthraj/Developer/tuf-calendar-react/src/pages/Calendar/components/EntryPanel/index.tsx)
6. [src/pages/Calendar/stores/calendarUI.store.ts](/Users/aravinthraj/Developer/tuf-calendar-react/src/pages/Calendar/stores/calendarUI.store.ts)
7. [src/pages/Calendar/services/rest/index.ts](/Users/aravinthraj/Developer/tuf-calendar-react/src/pages/Calendar/services/rest/index.ts)
8. [src/db/calendar/storage.ts](/Users/aravinthraj/Developer/tuf-calendar-react/src/db/calendar/storage.ts)
9. [src/db/calendar/attachedNotes.ts](/Users/aravinthraj/Developer/tuf-calendar-react/src/db/calendar/attachedNotes.ts)
10. [src/db/calendar/holidays.ts](/Users/aravinthraj/Developer/tuf-calendar-react/src/db/calendar/holidays.ts)
11. [src/utils/date.ts](/Users/aravinthraj/Developer/tuf-calendar-react/src/utils/date.ts)

## Notes for Contributors

- Keep display copy inside `src/pages/Calendar/config/index.ts` where possible.
- Prefer using the service layer instead of calling storage helpers directly from UI code.
- Keep calendar-specific persistence logic inside `src/db/calendar`.
- Reuse the existing date utilities instead of duplicating date logic in components.

## License

This repository includes a proprietary copyright header in source files.
Use, copying, and distribution should follow the owner’s stated terms.
