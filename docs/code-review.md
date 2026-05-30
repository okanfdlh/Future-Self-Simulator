# Code Review Guidelines

---

## Prinsip Code Review

1. **Kualitas > Kecepatan** - Prioritaskan kualitas code daripada kecepatan merge
2. **Constructive Feedback** - Berikan feedback yang konstruktif dan solutif
3. **Knowledge Sharing** - Gunakan code review sebagai media berbagi pengetahuan

---

## Checklist Code Review

### Umum

- [ ] Code bersih dan mudah dibaca
- [ ] Tidak ada console.log / debug code yang tertinggal
- [ ] Tidak ada TODO / FIXME tanpa assignee
- [ ] Dokumentasi di-update jika ada perubahan fitur
- [ ] Tidak ada duplikasi code
- [ ] Pre-commit hook berjalan tanpa error
- [ ] Semua unit test lulus (`npm test`)

### Frontend

- [ ] Komponen reusable jika memungkinkan
- [ ] TailwindCSS classes terorganisir dengan baik
- [ ] Responsif di mobile, tablet, desktop
- [ ] Animasi smooth dengan Framer Motion
- [ ] Accessibility considerations

### Logic

- [ ] Type safety (jika menggunakan TypeScript)
- [ ] Error handling yang baik
- [ ] State management yang efisien
- [ ] Tidak ada memory leak
- [ ] Logic mudah di-test

### Testing

- [ ] Ada unit test untuk fitur baru atau perubahan
- [ ] Test coverage untuk code yang diubah memadai
- [ ] Test mudah dibaca dan dipahami

### Git

- [ ] Commit message mengikuti conventional commits
- [ ] Branch name meaningful
- [ ] Tidak ada file yang tidak perlu di-commit
- [ ] Squash commit jika diperlukan

---

## Flow Code Review

1. Buat Pull Request (PR)
2. Assign minimal 1 reviewer
3. Reviewer memberikan feedback
4. Author address feedback
5. Reviewer approve
6. Merge ke dev branch

---

## Conventional Commits

Format commit message:
```
<type>(<scope>): <subject>

<body>

<footer>
```

Type yang diizinkan:
- feat: Fitur baru
- fix: Bug fix
- docs: Perubahan dokumentasi
- style: Perubahan styling (tidak affect logic)
- refactor: Refactoring code
- test: Menambah/merubah test
- chore: Task build, dependencies, dll

Contoh:
```
feat(home): add hero section with animation

- Tambahkan hero section
- Implementasikan animasi fade in dengan Framer Motion
- Responsif design
```

