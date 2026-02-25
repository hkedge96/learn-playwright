# Playwright QA Test Automation

Automated end-to-end test suite built using Playwright.

---

## 📌 Project Overview

This test automation framework is built using:

- Playwright
- TypeScript 
- Node.js

It covers:
- Smoke tests
- Regression tests

---

# Playwright Setup Guide — From Zero (Nothing Installed)

This document walks you through installing everything required before running Playwright tests. Follow these steps if your machine does not have anything installed yet.

---

## 1. Install Node.js (Required)

Playwright runs on Node.js.

### Download Node.js (LTS Version)

Go to: [https://nodejs.org]
Download and install the **LTS version**.

### Verify Installation

After installation, open a terminal or command prompt and run:

node -v
npm -v

If both commands return version numbers (example: v20.x.x), Node.js and npm are installed correctly.

---

## 2. Install Git (Required to Clone Repositories)

Download Git from:
[https://git-scm.com/downloads]

### Verify Installation

Run:

git --version

If a version number appears, Git is installed correctly.

---

## 3. Create a New Project Folder

If starting from scratch:

mkdir playwright-project
cd playwright-project

---

## 4. Initialize a Node Project

Run:

npm init -y

This creates a package.json file for managing project dependencies.

---

## 5. Install Playwright Test

Run:

npm init playwright@latest

You will be prompted with setup questions:

* Choose TypeScript 
* Choose tests folder location (default: tests)
* Install browsers (Yes recommended)

This step automatically:

* Installs Playwright
* Installs browser binaries
* Creates playwright.config.ts
* Creates an example test

If browsers were not installed during setup, run:

npx playwright install

---

## 6. Verify Installation

Run:

npx playwright test

You should see:

* A browser launching
* Example test execution
* HTML report generation

To open the report:

npx playwright show-report

---

## 7. Common Errors & Fixes

### “node is not recognized”

Node.js is not installed or not added to PATH.
Solution: Reinstall Node.js (LTS).

### Browsers Not Found Error

Run:

npx playwright install

### Linux Missing Dependencies

Run:

npx playwright install --with-deps

### Permission Errors (Mac/Linux)

Try:

sudo npx playwright install --with-deps

---

## 8. Project Structure After Setup

playwright-project/
├── tests/
│   └── example.spec.ts
├── playwright.config.ts
├── package.json
└── node_modules/

---

## 9. Beginner Mental Model

Think of the setup like this:

1. Node.js → Runtime engine
2. npm → Package manager
3. Playwright → Testing framework
4. Browsers → What Playwright controls
5. Tests folder → Where automation scripts live

---

## Quick Setup Checklist

1. Install Node.js (LTS)
2. Install Git
3. Create project folder
4. Run npm init playwright@latest
5. Run npx playwright test

Setup complete.

---

If you are using Windows, Mac, or Linux and need OS-specific guidance, additional configuration steps may apply.
