module.exports = {
  e2e: {
    baseUrl: 'https://www.demoblaze.com',
    viewportWidth: 1366,
    viewportHeight: 768,
    video: true,
    screenshotOnRunFailure: true,
    retries: { runMode: 2, openMode: 0 },
    defaultCommandTimeout: 10000,
    setupNodeEvents(on, config) {
      return config;
    }
  }
};
