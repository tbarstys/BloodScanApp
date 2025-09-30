export type QAContext = {
  language: 'en' | 'de' | 'lt';
  analytes: Array<{
    key: string;
    display: string;
    value: number;
    unit: string;
    message: string;
  }>;
};

export type QAQuestion = {
  question: string;
};

export function buildPrompt(context: QAContext, question: QAQuestion) {
  return `You are a safety-focused assistant. Only reference the following analytes:\n${context.analytes
    .map((item) => `- ${item.display}: ${item.value} ${item.unit} (${item.message})`)
    .join('\n')}\nQuestion: ${question.question}`;
}
