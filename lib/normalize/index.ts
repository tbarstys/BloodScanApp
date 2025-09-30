import { convertValue } from '../units/convert';
import type { ParsedAnalyte } from '../types';
import type { ParsedTableResult } from '../parse/table';

export const normalizeAnalytes = (
  analytes: ParsedTableResult['analytes'],
  targetSystem: 'us' | 'si' = 'us'
): ParsedAnalyte[] =>
  analytes.map((entry) => {
    const conversion = convertValue({ value: entry.rawValue, unit: entry.unit, analyteKey: entry.key, targetSystem });
    return {
      key: entry.key,
      label: entry.label,
      value: {
        raw: entry.rawValue,
        normalized: conversion.value,
        unit: conversion.unit,
      },
      referenceRange: entry.referenceRange,
      flags: [],
      source: { page: 0 },
      confidence: entry.confidence,
    };
  });
