import { describe, expect, it } from 'vitest';
import { askSafely } from '../../lib/qa';

describe('askSafely', () => {
  it('blocks treatment questions', async () => {
    await expect(askSafely('Should I change my medication?', { hemoglobin: 13 })).rejects.toThrow(
      /Treatment questions/
    );
  });

  it('returns deterministic answer without LLM', async () => {
    const result = await askSafely('What is my hemoglobin?', { hemoglobin: 13.2 });
    expect(result.answer).toContain('hemoglobin');
    expect(result.citations).toContain('hemoglobin');
  });

  it('uses LLM when enabled', async () => {
    const mockLlm = async (prompt: string) => `Response based on ${prompt}`;
    const result = await askSafely('How does my LDL look?', { ldl: 90 }, { useLlm: true, llmCall: mockLlm });
    expect(result.answer).toContain('Response based on');
  });
});
