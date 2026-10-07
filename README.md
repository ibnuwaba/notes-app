# Notes App

A modern, responsive notes application built with **React, TypeScript, Vite, and Tailwind CSS**. The project focuses on clean component architecture, predictable state management, accessibility, and persistent user preferences.

## Overview

The Notes App provides a simple interface for creating and managing personal notes. Users can create, edit, delete, pin, and archive notes, while switching between different note views. Notes and user preferences are persisted locally so the application maintains its state across page reloads.

The application also supports light and dark themes, including automatic detection of the user's system preference.

## Key Features

* Create and edit notes with controlled forms
* Pin, archive, and delete notes
* Filter notes by All, Pinned, and Archived views
* Persistent notes and view preferences using `localStorage`
* Light and dark theme support
* Responsive interface using Tailwind CSS
* Accessible form controls and tab navigation
* Inline delete confirmation

## Architecture

The application uses a component-based React architecture with clear separation of responsibilities.

* **Notes state** is managed through React Context and `useReducer`, providing typed actions for adding, updating, removing, pinning, and archiving notes.
* **Theme state** is managed through a dedicated Theme Context and persisted using a reusable `useLocalStorage` hook.
* **Reusable components** such as `NoteEditor`, `NoteList`, `NoteCard`, `ViewTabs`, and `ThemeToggle` keep the UI modular and maintainable.
* **TypeScript** provides type safety across notes, views, context values, and state actions.
* **Tailwind CSS** is used for responsive styling and dark-mode support.

## Tech Stack

* React
* TypeScript
* Vite
* Tailwind CSS
* ESLint
* pnpm

## Project Structure

```text
src/
├── hooks/
│   └── useLocalStorage.ts
├── notes/
│   ├── components/
│   ├── types.ts
│   ├── useNotes.ts
│   └── NotesContext.tsx
├── theme/
│   ├── ThemeContext.ts
│   ├── ThemeContext.tsx
│   ├── ThemeToggle.tsx
│   └── useTheme.ts
├── App.tsx
├── main.tsx
└── index.css
```

## Development

Install dependencies:

```bash
pnpm install
```

Start the development server:

```bash
pnpm dev
```

Run validation:

```bash
pnpm lint
pnpm exec tsc --noEmit
pnpm build
```

## Purpose

This project was developed as part of the **Shi'era Developers Mentorship Program** to practice building a production-style React application with TypeScript, reusable hooks, Context API, reducer-based state management, persistence, and responsive UI design.
