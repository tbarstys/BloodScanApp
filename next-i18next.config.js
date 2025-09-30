module.exports = {
  i18n: {
    defaultLocale: "en",
    locales: ["en", "de", "lt"],
    localeDetection: true
  },
  reloadOnPrerender: process.env.NODE_ENV === "development"
};
