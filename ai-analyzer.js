import fs from "fs";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const log = fs.readFileSync("test-log.txt", "utf-8").slice(-20000);

const prompt = `
You are a senior QA automation engineer.

Analyze this test execution log:

${log}

Please provide:
1. Root cause of failure (if any)
2. Category (UI issue / locator issue / timing issue / app crash / environment issue)
3. Suggested fix
4. Stability recommendation (how to make it less flaky)
`;

const response = await ai.models.generateContent({
  model: "gemini-2.5-flash",
  contents: prompt,
});

console.log("\n===== AI TEST ANALYSIS =====\n");
console.log(response.text);