import { QA_PROMPT } from "@/lib/qa/prompt";

export type QARequest = {
  question: string;
  data: Record<string, unknown>;
};

export async function askSafely({ question, data }: QARequest): Promise<string> {
  const forbidden = /(treat|medication|dose|prescribe)/i;
  if (forbidden.test(question)) {
    return "This assistant cannot provide treatment guidance. Please discuss with your clinician.";
  }
  const entries = Object.entries(data)
    .map(([key, value]) => `${key}: ${JSON.stringify(value)}`)
    .join("\n");
  return `${QA_PROMPT}\n\nQuestion: ${question}\n\nData:\n${entries}`;
}
