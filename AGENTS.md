# PERMANENT PROJECT RULES — GITHUB SYNC & WORKFLOW

**Project:** `/Users/jisshajan/Desktop/Projects/MG portfolio/`  
**GitHub Repository:** `https://github.com/jisssz/jisssz.github.io.git`  
**Branch:** `main`

---

## 1. Mandatory Workflow for Every Portfolio Modification
Whenever making ANY approved modification, addition, deletion, fix, or improvement to this portfolio project, treat:
**`LOCAL CHANGE → VERIFY → COMMIT → PUSH TO GITHUB`**
as one complete workflow. Do NOT wait for a separate instruction to push to GitHub.

### Step-by-Step Execution:
1. **Make requested changes** locally.
2. **Verify the changes**:
   - `npm run lint`
   - `npm run build`
3. **Check status**:
   - `git status`
4. **Review changed files before committing**:
   - Never commit `.env` files, API keys, passwords, or tokens.
   - Never commit `node_modules`, `dist`, temporary Antigravity files, QA screenshots, or scratch scripts.
5. **Commit the completed update** using a meaningful commit message (e.g., `feat: ...`, `fix: ...`, `docs: ...`).
6. **Immediately push the commit** to `origin/main` (`git push`).
7. **Verify after pushing**:
   - `git status`
   - `git log --oneline -3`
   - `git remote -v`
8. **Confirm that**:
   - Local `main` is synchronized with `origin/main`
   - Working tree is clean
   - Push succeeded

---

## 2. Safety Rules
- **NEVER** use `git push --force` or `git push -f`.
- **NEVER** use `git reset --hard` to discard user work.
- **NEVER** overwrite remote changes blindly.
- If `origin/main` contains changes that are not local, inspect them first and safely reconcile them.
- Do not create another GitHub repository.
- Do not change the remote repository from `https://github.com/jisssz/jisssz.github.io.git`.
- Do not change the branch from `main`.
- Do not push secrets or credentials.

---

## 3. Core Asset & Architecture Preservation
Every future update must strictly preserve:
- **10-Second Intro Video**: `public/website-loading-intro.mp4`
- **Intro Controls**: `SKIP INTRO →` button, `Escape` key skip, and 650ms smooth fade transition in `src/components/IntroVideo.tsx`
- **300-Frame Cinematic Scroll Animation**: `ezgif-frame-001.jpg` through `ezgif-frame-300.jpg` in `public/reference-frames/`
- **Scroll Engine**: `src/components/CinematicCanvas.tsx` and frame mapping logic
- **Ghibli Profile Visual**: `public/jis-ghibli-profile.jpg` in the right-side profile block
- **Education Section**: Verified records under the Ghibli portrait (Christ College, Don Bosco, BVP)
- **Existing Content & Sections**: Navigation, Hero, About, Education, Projects, Skills, Experience, Updates, Milestones, FAQ, Contact, LeetCode profile
- **Responsive Layouts**: Desktop, tablet, and mobile views

---

## 4. Final Response Requirements After Every Update
Always report:
- ✓ What was changed
- ✓ Lint result (`npm run lint`)
- ✓ Build result (`npm run build`)
- ✓ Git commit hash
- ✓ GitHub push result
- ✓ Confirmation that `main` is synchronized with `origin/main`
