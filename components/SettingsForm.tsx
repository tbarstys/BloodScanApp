'use client';

import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({
  language: z.enum(['en', 'de', 'lt']),
  units: z.enum(['si', 'us']),
  consentCloudOcr: z.boolean(),
  consentLlm: z.boolean(),
  consentTelemetry: z.boolean()
});

type SettingsValues = z.infer<typeof schema>;

export const SettingsForm = () => {
  const { t } = useTranslation();
  const { register, handleSubmit, formState } = useForm<SettingsValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      language: 'en',
      units: 'si',
      consentCloudOcr: false,
      consentLlm: false,
      consentTelemetry: false
    }
  });

  const onSubmit = (values: SettingsValues) => {
    localStorage.setItem('lablens-settings', JSON.stringify(values));
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 rounded-2xl bg-white p-4 text-sm text-slate-600 shadow-sm"
    >
      <fieldset className="space-y-2">
        <legend className="text-sm font-semibold text-slate-900">{t('settings.language')}</legend>
        <select {...register('language')} className="w-full rounded-lg border border-slate-200 p-2">
          <option value="en">English</option>
          <option value="de">Deutsch</option>
          <option value="lt">Lietuvių</option>
        </select>
      </fieldset>
      <fieldset className="space-y-2">
        <legend className="text-sm font-semibold text-slate-900">{t('settings.units')}</legend>
        <select {...register('units')} className="w-full rounded-lg border border-slate-200 p-2">
          <option value="si">SI</option>
          <option value="us">US</option>
        </select>
      </fieldset>
      <fieldset className="space-y-2">
        <legend className="text-sm font-semibold text-slate-900">{t('settings.consents')}</legend>
        <label className="flex items-start gap-2">
          <input type="checkbox" {...register('consentCloudOcr')} className="mt-1" />
          <span>{t('settings.cloudOcr')}</span>
        </label>
        <label className="flex items-start gap-2">
          <input type="checkbox" {...register('consentLlm')} className="mt-1" />
          <span>{t('settings.llm')}</span>
        </label>
        <label className="flex items-start gap-2">
          <input type="checkbox" {...register('consentTelemetry')} className="mt-1" />
          <span>{t('settings.telemetry')}</span>
        </label>
        <p className="text-xs text-slate-400">
          <Link href="/settings/safety" className="underline">
            {t('settings.privacyTitle')}
          </Link>
        </p>
      </fieldset>
      <button type="submit" className="w-full rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white">
        {formState.isSubmitting ? t('settings.saving') : t('settings.save')}
      </button>
    </form>
  );
};
