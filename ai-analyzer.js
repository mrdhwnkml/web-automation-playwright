const fs = require("fs");

async function main() {
  const log = fs.readFileSync("test-log.txt", "utf-8");

  const isPassed =
  /\b\d+\s+passed\b/i.test(log) &&
  !/\b\d+\s+failed\b/i.test(log);

  if (isPassed) {
    console.log("\n===== AI TEST ANALYSIS =====");
    console.log("STATUS: PASSED ✅");
    console.log("Skipping AI analysis because no failure detected.");
    return;
  }

  const { GoogleGenAI } = await import("@google/genai");

  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
  });

  const prompt = `
You are a QA Automation Engineer.

Analyze this FAILED Playwright test log.

${log}

Rules:
- Use only evidence from the log.
- Do not speculate.
- Prioritize automation issues before application issues.
- Locator not found = Locator Issue.
- Timeout while waiting for locator = Locator Issue.
- Timeout during navigation/API request = Environment Issue unless log shows application error.
- Application error must be supported by evidence in the log.
- Keep answer under 8 lines.

Return format:

Root Cause:
Category:
Suggested Fix:
Stability Recommendation:
`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  console.log("\n===== AI TEST ANALYSIS =====\n");
  console.log(response.text);
}

main().catch(console.error);