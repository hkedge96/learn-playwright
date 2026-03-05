# Repository Guidelines

## Project Structure & Module Organization
- `tests/`: main Playwright test suites (desktop). Example: `tests/module116.test.ts`.
- `setup/`: login helpers archive
- `my-profile/`: persistent Playwright profile used for authenticated runs (generated).
- `playwright.config.ts`: project config (currently Desktop Chrome only).
- `playwright-report/` and `test-results/`: generated reports and artifacts.

## Coding Style & Naming Conventions
- Language: TypeScript (Playwright Test).
- Indentation: 2 spaces, consistent with existing files.
- Test file naming: `module*.test.ts` under `tests/` and `mobileModule*.test.ts` for mobile tests under `tests/`
- Prefer explicit locators and stable role-based selectors (`getByRole`, `getByText`).
- test-archive are archived tests that can be used as context when building tests
## Do's
- use manual-login.ts to login
- After every test (pass or fail), use playwright-report/index.html as context to generate a report. save it as `time-date-testfilename.txt` in `./playwright-report`
- Run tests like `npx playwright test *.test.ts`

## Dont
- Do not suggest user to use auth.json, storagestate.json and sessionstorage.json because IT DOES NOT WORK. only persistent context does (manual-login.ts).