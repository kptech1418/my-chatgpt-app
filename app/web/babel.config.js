module.exports = function (api) {
  api.cache(true); // Cache the configuration for faster rebuilds

  return {
    presets: [
      '@babel/preset-env', // Transpile modern JavaScript based on target environments
      '@babel/preset-react' // Handle React-specific syntax like JSX
    ],
    plugins: []
  };
};
