# Agile Content Frontend Test

A fully accessible, responsive, and test‑driven React/Next.js application built as part of the Agile Content Frontend Technical Challenge.  
The project implements search, preview panels, global state management, accessibility best‑practices, performance optimizations, and complete automated testing using Jest + React Testing Library.

---

## 📌 Features

### 🔍 Search System
- Dynamic search with results page.
- Deep link via URL query param (`/results?search=term`).
- Includes validation and empty‑state/error messaging.

### 🐾 Results & Preview
- Displays animal data with a split layout (list + preview section).
- Accessible modal preview with:
  - **Focus‑trap**
  - **Escape key closing**
  - **Overlay interaction**
  - **Screen reader‑friendly roles/labels**
- Responsive behavior for desktop and mobile.

### 🧠 Global State (Zustand)
State is shared across components via:
- `useAnimalStore` → animals, selected item, UI flags  
- `useSearchStore` → search term

### ⚙️ Custom Hooks
- `useSearch()` abstracts fetch logic, error handling, and loading UI.

### 🧪 Full Test Coverage
Every component includes unit tests:
- Jest + React Testing Library  
- Mocks for:
  - Next.js navigation (`useRouter`, `useSearchParams`)
  - Zustand store behavior
  - Next/Image replacement
- Tests include:
  - Rendering
  - Interactions (click, typing)
  - Accessibility assertions
  - Edge cases (empty state, invalid term, loading)

---

## 🚀 Tech Stack

- **Next.js 16 (App Router)**
- **React 19**
- **Zustand** (global store)
- **Jest + React Testing Library**
- **TypeScript**
- **CSS Modules**
- **React Icons**

---

## 📂 Project Structure

```
/
├── src/
│   ├── components/
│   │   ├── Header/
│   │   ├── Search/
│   │   ├── ResultsSection/
│   │   ├── ResultItem/
│   │   ├── Preview/
│   │   ├── Skeleton/
│   │   └── Button/
│   ├── store/
│   ├── hooks/
│   ├── types/
│   └── app/
└── tests/
```

---

## 🛠️ Installation & Setup

1. Clone the repo:

```bash
git clone https://github.com/ydroulis/agiletv-test
cd agiletv-test
```

2. Install dependencies:

```bash
npm install
```

3. Run development server:

```bash
npm run dev
```

---

## 🧪 Running Tests

```bash
npm run test
```

Run with coverage:

```bash
npm run test:coverage
```

---

## 🏗️ Build for Production

```bash
npm run build
npm start
```

---