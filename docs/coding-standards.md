# Coding Standards

---

## Struktur Folder

```
my-app/
├── app/                    # Next.js App Router
│   ├── layout.js           # Root layout
│   ├── page.js             # Home page
│   ├── decisions/          # Decision pages
│   ├── simulation/         # Simulation page
│   └── results/            # Results & comparison
├── components/             # Reusable components
│   ├── ui/                 # shadcn/ui components
│   └── ...
├── lib/                    # Utility functions
├── hooks/                  # Custom hooks
├── __tests__/              # Test files
├── public/                 # Static assets (images, videos)
└── docs/                   # Dokumentasi
```

---

## React & Next.js

- Gunakan functional components dengan hooks
- Kolokasi related files (components, hooks, utils)
- Gunakan Server Components untuk halaman yang tidak butuh interactivity
- Gunakan Client Components hanya ketika diperlukan (dengan 'use client')
- Menggunakan App Router (Next.js 13+)

---

## TailwindCSS

- Gunakan utility-first approach
- Group related classes untuk readability
- Gunakan @apply untuk pattern yang sering digunakan
- Konsisten dengan color scheme

Contoh:
```jsx
// Good
<div className="flex flex-col gap-4 p-6 bg-white rounded-lg shadow-md">
  ...
</div>

// Bad
<div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
  ...
</div>
```

---

## Naming Convention

- Components: PascalCase (e.g., `DecisionCard.jsx`)
- Test files: `<ComponentName>.test.jsx` atau `<ComponentName>.spec.jsx`
- Files: camelCase atau PascalCase (sesuai dengan komponen)
- Functions: camelCase (e.g., `handleSubmit()`)
- Constants: UPPER_SNAKE_CASE (e.g., `MAX_VIDEO_DURATION`)
- Variables: camelCase (e.g., `userDecision`)

---

## Code Style

- Indentasi: 2 spasi
- Semicolon: Optional, tapi konsisten
- Quotes: Double quotes untuk JSX, single quotes untuk string biasa
- Trailing comma: Diizinkan
- Max line length: 100 karakter

---

## Error Handling

- Gunakan try-catch untuk async operations
- Tampilkan user-friendly error messages
- Log errors dengan console.error
- Handle edge cases

---

## Performance

- Lazy load components dengan dynamic import
- Optimize images dengan next/image
- Avoid unnecessary re-renders
- Use memoization jika diperlukan (useMemo, useCallback)

---

## Testing

- Tuliskan test untuk semua komponen dan utilitas penting
- Gunakan Jest sebagai test runner
- Gunakan React Testing Library untuk testing komponen
- Penamaan test file: `[namafile].test.jsx`
- Tempatkan test file di folder `__tests__/` atau berdampingan dengan file yang di-test

Contoh test sederhana:
```jsx
import { render, screen } from '@testing-library/react'
import MyComponent from './MyComponent'

describe('MyComponent', () => {
  it('renders correctly', () => {
    render(<MyComponent />)
    expect(screen.getByText('Hello World')).toBeInTheDocument()
  })
})
```

---

## Pre-commit Hook

Proyek ini menggunakan Husky dan lint-staged untuk pre-commit hook. Setiap commit akan otomatis:
1. Menjalankan eslint pada file yang di-staging
2. Menjalankan semua unit test

Pastikan:
- Semua test lulus sebelum commit
- Tidak ada eslint error yang tertinggal

