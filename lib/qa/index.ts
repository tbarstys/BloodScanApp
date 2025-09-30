import type { AnalysisResult } from '../types';
import { buildPrompt } from './prompt';

export interface QaClient {
  ask: (question: string, data: AnalysisResult) => Promise<string>;
}

export class SafeQaClient implements QaClient {
  constructor(private readonly call: (payload: ReturnType<typeof buildPrompt>) => Promise<string>) {}

  async ask(question: string, data: AnalysisResult): Promise<string> {
    if (/treat|medication|dose|prescribe/i.test(question)) {
      return 'This question sounds like medical advice. Please discuss with your clinician.';
    }
    const prompt = buildPrompt(question, data);
    const response = await this.call(prompt);
    if (!response.includes(data.analytes[0]?.label ?? '')) {
      throw new Error('LLM response missing required citation');
    }
    return response;
  }
}
