## 2023-10-26 - Static Array Extraction in React Components
**Learning:** Found that a large static array containing JSX elements was being recreated on every render in `DashboardQuickLinks.tsx`, contributing to unnecessary object allocation and GC pressure.
**Action:** Extract static data arrays and configuration objects outside of React components whenever possible, especially if they contain JSX elements or are used in `.map` calls during render.
