const fs = require("fs");

async function main() {
  const log = fs.readFileSync("test-log.txt", "utf-8");

  const isPassed =
    log.includes(" passed") &&
    !log.includes(" failed") &&
    !log.includes(" error");

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
You are a senior QA automation engineer.

Analyze this failed Playwright test log:

${log}

Please provide:
1. Root cause of failure
2. Category (UI issue / locator issue / timing issue / app crash / environment issue)
3. Suggested fix
4. Stability recommendation
`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  console.log("\n===== AI TEST ANALYSIS =====\n");
  console.log(response.text);
}

main().catch(console.error);