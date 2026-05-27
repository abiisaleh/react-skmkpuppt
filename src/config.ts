export const APP_CONFIG = {
  // Google Form ID
  GOOGLE_FORM_ID: "1FAIpQLScbryATdTvtrrvpgWbwcW7xaveLbw156SUQAXEhWdmk07AJEQ",

  // Google Form Action Response URL
  get GOOGLE_FORM_URL() {
    return `https://docs.google.com/forms/d/e/${this.GOOGLE_FORM_ID}/formResponse`;
  },

  // Active service period year
  ACTIVE_YEAR: 2026,

  // Text configuration for header / welcome screen
  SURVEY_TITLE: "SKM",
  SUB_TITLE: "Survei Kepuasan Masyarakat",
  PROVINCE: "Provinsi Papua Tengah",
};
