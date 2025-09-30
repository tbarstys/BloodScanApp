import { z } from 'zod';
import { buildPrompt } from './prompt';

const questionGuard = z
  .string()
  .min(3)
  .refine((value) => !/treat|dose|medicat|therapy|prescrib/i.test(value), {
    message: 'Treatment questions require clinician guidance.'
  });

export interface QaOptions {
  locale?: 'en' | 'de' | 'lt';
  useLlm?: boolean;
  llmCall?: (prompt: string) => Promise<string>;
}

export const askSafely = async (
  question: string,
  data: Record<string, unknown>,
  { locale = 'en', useLlm = false, llmCall }: QaOptions = {}
) => {
  const guardedQuestion = questionGuard.parse(question);
  if (!useLlm || !llmCall) {
    return {
      answer: `Please review this question with your clinician. Key data: ${JSON.stringify(data)}`,
      citations: Object.keys(data)
    };
  }
  const prompt = buildPrompt({ question: guardedQuestion, data, locale });
  const response = await llmCall(prompt);
  return {
    answer: response,
    citations: Object.keys(data)
  };
};

export { buildPrompt } from './prompt';
