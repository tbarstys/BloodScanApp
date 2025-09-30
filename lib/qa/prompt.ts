export const SYSTEM_PROMPT = `You are a cautious assistant. Only answer questions using the provided lab data. Do not offer medical advice.`;

export const buildPrompt = (question: string, data: unknown) => ({
  system: SYSTEM_PROMPT,
  input: {
    question,
    data,
  },
});
