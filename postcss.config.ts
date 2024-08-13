module.exports = {
  plugins: [
    require('postcss-import'),
    require('tailwindcss'),
    require('autoprefixer'),
    require('@fullhuman/postcss-purgecss')({
      content: [
        './src/**/*.html',
        './src/**/*.js',
        './src/**/*.jsx',
        './src/**/*.ts',
        './src/**/*.tsx',
        // Add any other file types that include your HTML or JavaScript code
      ],
      defaultExtractor: (content:any) => content.match(/[\w-/:]+(?<!:)/g) || []
    }),
  ],
};
