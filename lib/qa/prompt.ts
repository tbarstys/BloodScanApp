export interface QaPromptInput {
  question: string;
  data: Record<string, unknown>;
  locale: 'en' | 'de' | 'lt';
}

export const buildPrompt = ({ question, data, locale }: QaPromptInput) => `You are a safety assistant. Answer only using the provided lab data.\nLocale: ${locale}.\nQuestion: ${question}.\nData: ${JSON.stringify(data)}.`;
