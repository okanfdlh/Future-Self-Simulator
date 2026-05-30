# Detailed Task Breakdown

---

## Task Legend
| Status | Description |
|--------|-------------|
| ✅ | Done |
| 🔄 | In Progress |
| ⏳ | Pending |
| ❌ | Blocked |

---

## Project Setup
| Task ID | Task Description | Assignee | Status |
|---------|-------------------|----------|--------|
| T-001 | Initialize Next.js project (already done) | All | ✅ |
| T-002 | Setup Tailwind CSS 4 | Anggota 1 | ⏳ |
| T-003 | Install & configure shadcn/ui | Anggota 1 | ⏳ |
| T-004 | Install Framer Motion | Anggota 1 | ⏳ |
| T-005 | Setup jest & testing library (already done) | All | ✅ |
| T-006 | Setup Husky & pre-commit hooks (already done) | All | ✅ |
| T-007 | Configure eslint & prettier | Anggota 1 | ⏳ |

---

## Mock Data & Configuration
| Task ID | Task Description | Assignee | Status |
|---------|-------------------|----------|--------|
| T-101 | Define user decision categories (sleep, career, finance, social, etc.) | Anggota 2 | ⏳ |
| T-102 | Create mock decision data with options and weights | Anggota 2 | ⏳ |
| T-103 | Define future outcome scenarios (positive, neutral, negative) | Anggota 2 | ⏳ |
| T-104 | Create mapping between decisions and outcomes | Anggota 2 | ⏳ |
| T-105 | Create placeholder video metadata (title, description, duration, video URL) | Anggota 3 | ⏳ |
| T-106 | Configure environment variables (if needed) | Anggota 2 | ⏳ |

---

## UI Components & Pages (Anggota 1)

### Layout & Navigation
| Task ID | Task Description | Status |
|---------|-------------------|--------|
| T-201 | Create main app layout with header/footer | ⏳ |
| T-202 | Build navigation bar/menu (Home, Start Simulation, Compare Futures) | ⏳ |
| T-203 | Implement responsive navigation (mobile hamburger menu) | ⏳ |
| T-204 | Create reusable Button component | ⏳ |
| T-205 | Create reusable Card component | ⏳ |

### Home Page
| Task ID | Task Description | Status |
|---------|-------------------|--------|
| T-211 | Design & implement hero section | ⏳ |
| T-212 | Add project description and features section | ⏳ |
| T-213 | Create "Start Simulation" CTA button | ⏳ |
| T-214 | Add smooth animations with Framer Motion | ⏳ |

### Decision Pages
| Task ID | Task Description | Status |
|---------|-------------------|--------|
| T-221 | Create decision page template layout | ⏳ |
| T-222 | Build sleep pattern decision page | ⏳ |
| T-223 | Build career path decision page | ⏳ |
| T-224 | Build financial lifestyle decision page | ⏳ |
| T-225 | Build work-life balance decision page | ⏳ |
| T-226 | Build social relationship decision page | ⏳ |
| T-227 | Build daily habits decision page | ⏳ |
| T-228 | Implement progress indicator (step 1/7, etc.) | ⏳ |
| T-229 | Add next/previous navigation between decision pages | ⏳ |

### Simulation Page
| Task ID | Task Description | Status |
|---------|-------------------|--------|
| T-231 | Design simulation loading/processing screen | ⏳ |
| T-232 | Add visual progress indicator | ⏳ |
| T-233 | Implement animation while simulation runs | ⏳ |
| T-234 | Create "View Results" CTA | ⏳ |

### Result Page (Single Future)
| Task ID | Task Description | Status |
|---------|-------------------|--------|
| T-241 | Build result page layout | ⏳ |
| T-242 | Display AI-generated video | ⏳ |
| T-243 | Show outcome summary (happiness, finance, health, etc.) | ⏳ |
| T-244 | Create "Compare" and "Try Again" buttons | ⏳ |
| T-245 | Save simulation result to local storage | ⏳ |

### Comparison Page
| Task ID | Task Description | Status |
|---------|-------------------|--------|
| T-251 | Build comparison page layout | ⏳ |
| T-252 | Display 2-3 saved future videos side by side | ⏳ |
| T-253 | Create comparison metrics (radar chart or bar chart) | ⏳ |
| T-254 | Allow user to select which futures to compare | ⏳ |
| T-255 | Add "Start New Simulation" button | ⏳ |

---

## Logic & State Management (Anggota 2)

### Decision Engine
| Task ID | Task Description | Status |
|---------|-------------------|--------|
| T-301 | Design state structure for user decisions | ✅ |
| T-302 | Implement decision engine logic (calculate outcome based on decisions) | ✅ |
| T-303 | Write unit tests for decision engine | ✅ |
| T-304 | Create custom hook for managing user decisions | ✅ |

### Simulation Flow
| Task ID | Task Description | Status |
|---------|-------------------|--------|
| T-311 | Implement simulation progress tracking | ⏳ |
| T-312 | Create logic to map outcome to video | ✅ |
| T-313 | Handle simulation completion and navigation to results | ✅ |

### Local Storage
| Task ID | Task Description | Status |
|---------|-------------------|--------|
| T-321 | Implement local storage hook for saving simulations | ✅ |
| T-322 | Create functions to retrieve saved simulations | ✅ |
| T-323 | Write unit tests for storage utilities | ⏳ |

### PixVerse Integration
| Task ID | Task Description | Status |
|---------|-------------------|--------|
| T-331 | Research PixVerse API documentation | ✅ |
| T-332 | Set up API client for PixVerse | ✅ |
| T-333 | Implement video generation request logic | ✅ |
| T-334 | Implement polling for video generation status | ✅ |
| T-335 | Add error handling for API failures | ✅ |

---

## Video Production (Anggota 3)

### Storyboarding
| Task ID | Task Description | Status |
|---------|-------------------|--------|
| T-401 | Brainstorm and outline all story scenarios | ⏳ |
| T-402 | Create storyboard for positive outcome | ⏳ |
| T-403 | Create storyboard for neutral outcome | ⏳ |
| T-404 | Create storyboard for negative outcome | ⏳ |
| T-405 | Create shot list for each storyboard | ⏳ |

### Video Generation
| Task ID | Task Description | Status |
|---------|-------------------|--------|
| T-411 | Write prompts for PixVerse video generation | ⏳ |
| T-412 | Generate positive outcome video | ⏳ |
| T-413 | Generate neutral outcome video | ⏳ |
| T-414 | Generate negative outcome video | ⏳ |
| T-415 | Review and iterate on generated videos | ⏳ |
| T-416 | Finalize all videos (min 30 seconds each) | ⏳ |

### Documentation
| Task ID | Task Description | Status |
|---------|-------------------|--------|
| T-421 | Document all prompts used for video generation | ⏳ |
| T-422 | Create video metadata file (title, description, etc.) | ⏳ |

---

## Testing & QA
| Task ID | Task Description | Status |
|---------|-------------------|--------|
| T-501 | Write unit tests for all components | All | ⏳ |
| T-502 | Write integration tests for user flow | All | ⏳ |
| T-503 | Test responsive design on mobile/tablet/desktop | Anggota 1 | ⏳ |
| T-504 | Test all decision combinations | Anggota 2 | ⏳ |
| T-505 | User acceptance testing (UAT) | All | ⏳ |

---

## Polish & Deployment
| Task ID | Task Description | Status |
|---------|-------------------|--------|
| T-601 | UI polish and final adjustments | Anggota 1 | ⏳ |
| T-602 | Performance optimization | All | ⏳ |
| T-603 | Deploy to Vercel | All | ⏳ |
| T-604 | Final documentation update | All | ⏳ |
