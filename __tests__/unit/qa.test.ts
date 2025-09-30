import { describe, expect, it } from 'vitest';
import { askSafely } from '@/lib/qa/index';

const context = {
  language: 'en' as const,
  analytes: [
    { key: 'hemoglobin', display: 'Hemoglobin', value: 12.4, unit: 'g/dL', message: 'Within range' }
  ]
};

describe('askSafely', () => {
  it('rejects treatment questions', async () => {
    const response = await askSafely(context, { question: 'How should I treat this?' }, async () => '');
    expect(response.rejected).toBe(true);
  });

  it('injects citations into llm output', async () => {
    const response = await askSafely(context, { question: 'What does hemoglobin mean?' }, async () => 'Hemoglobin looks good.');
    expect(response.rejected).toBe(false);
    expect(response.answer).toContain('Hemoglobin 12.4 g/dL');
  });
});
