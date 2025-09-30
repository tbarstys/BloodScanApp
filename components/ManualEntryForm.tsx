'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAnalysisStore } from '../lib/store';
import { buildManualAnalysis } from '../lib/parse/manual';

const schema = z.object({
  analyte: z.string().min(1),
  value: z.string().min(1),
  unit: z.string().min(1),
});

type FormValues = z.infer<typeof schema>;

export const ManualEntryForm: React.FC = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });
  const setCurrent = useAnalysisStore((state) => state.setCurrent);

  const onSubmit = (values: FormValues) => {
    try {
      const result = buildManualAnalysis(values);
      setCurrent(result);
      reset();
      setErrorMessage(null);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Unable to add value');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3 rounded-lg border border-slate-200 bg-white p-4">
      <h2 className="text-lg font-semibold">Quick manual entry</h2>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <label className="flex flex-col text-sm">
          Analyte
          <input className="mt-1 rounded-md border border-slate-300 px-2 py-1" {...register('analyte')} />
          {errors.analyte ? <span className="text-xs text-danger">{errors.analyte.message}</span> : null}
        </label>
        <label className="flex flex-col text-sm">
          Value
          <input className="mt-1 rounded-md border border-slate-300 px-2 py-1" {...register('value')} />
          {errors.value ? <span className="text-xs text-danger">{errors.value.message}</span> : null}
        </label>
        <label className="flex flex-col text-sm">
          Unit
          <input className="mt-1 rounded-md border border-slate-300 px-2 py-1" {...register('unit')} />
          {errors.unit ? <span className="text-xs text-danger">{errors.unit.message}</span> : null}
        </label>
      </div>
      {errorMessage ? <p className="text-xs text-danger">{errorMessage}</p> : null}
      <button type="submit" className="self-start rounded-md bg-primary px-4 py-2 text-white">
        Add value
      </button>
    </form>
  );
};
