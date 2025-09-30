const config = {
  i18n: {
    defaultLocale: "en",
    locales: ["en", "de", "lt"],
  },
  reloadOnPrerender: process.env.NODE_ENV === "development",
};

export default config;
