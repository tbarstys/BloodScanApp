import { buildPrompt, QAContext, QAQuestion } from '@/lib/qa/prompt';

export type QAResponse = {
  answer: string;
  rejected: boolean;
};

const disallowedPatterns = /(treat|medication|dose|prescribe|therapy|cure)/i;

export async function askSafely(
  context: QAContext,
  question: QAQuestion,
  invokeLLM: (prompt: string) => Promise<string>
): Promise<QAResponse> {
  if (disallowedPatterns.test(question.question)) {
    return {
      rejected: true,
      answer: 'This tool cannot provide treatment guidance. Please discuss with your clinician.'
    };
  }

  const prompt = buildPrompt(context, question);
  const response = await invokeLLM(prompt);
  const sanitized = context.analytes.reduce((acc, item) => {
    const pattern = new RegExp(item.display, 'i');
    if (!pattern.test(response)) {
      return `${acc}\n- Missing reference to ${item.display}`;
    }
    return acc;
  }, '');

  const answer = `${response}\n${sanitized ? `\nCitations: ${context.analytes
    .map((item) => `${item.display} ${item.value} ${item.unit}`)
    .join('; ')}` : ''}`.trim();

  return {
    rejected: false,
    answer
  };
}
