export const languages = ['en', 'de', 'lt'] as const;
export type Language = (typeof languages)[number];
