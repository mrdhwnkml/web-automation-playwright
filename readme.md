# 🎭 Playwright JS Automation

Automation testing project using **Playwright with JavaScript** for end-to-end (E2E) web testing.

---
#### Report Running Test!

[![Playwright Report](https://img.shields.io/badge/Playwright-Report-blue)](https://mrdhwnkml.github.io/web-automation-playwright/)

## 🚀 Tech Stack
- **Playwright**
- **JavaScript (Node.js)**
- **Playwright Test Runner**
- **Chromium / Firefox / WebKit**

---

## 📂 Project Structure
```text
.
├── tests/                    # Test cases
│   ├── login.spec.js
│   └── example.spec.js
├── playwright.config.js      # Playwright configuration
├── package.json
└── README.md
```

⚙️ Prerequisites

Make sure you have installed:

 - Node.js v18 or higher
 - npm or yarn

Check installed versions:
```
node -v
npm -v
```
## 📦 Installation
1️⃣ Clone Repository
```
git clone https://github.com/mrdhwnkml/web-automation-playwright.git
cd web-automation-playwright
```
2️⃣ Install Dependencies
```
npm install
```
3️⃣ Install Playwright Browsers
```
npx playwright install
```
## ▶️ Run Tests

1️⃣ Run all tests
```
npx playwright test
```
2️⃣ Run tests in headed mode
```
npx playwright test --headed
```
3️⃣ Run specific test file
```
npx playwright test tests/01_addEmployee.spec.js
```
## 📊 Test Report

Generate and open HTML report:
```
npx playwright show-report
```
