module.exports = function (api) { 
  api.cache(true); 
  return { 
    presets: ['babel-preset-expo'], 
    plugins: [
      [
        'module-resolver',
        {
          root: ['./'],
          alias: {
            assets: './assets',
            images: './assets/images',
            components: './src/components',
            screens: './src/screens',
          },
        },
      ],
      'react-native-reanimated/plugin', // must be last
    ],
  }; 
};
