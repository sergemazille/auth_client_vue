/* eslint-disable-next-line */
const path = require('path');

const isExploreMode = process.env.NODE_ENV === 'explore';
const exploreModeEntryFilePath = 'explore/main.ts';
const defaultEntryFilePath = 'src/main.ts';

module.exports = {
  pages: {
    index: {
      entry: isExploreMode ? exploreModeEntryFilePath : defaultEntryFilePath,
    },
  },

  configureWebpack: {
    resolve: {
      alias: {
        '@fixtures': path.resolve(__dirname, 'fixtures'),
      },
    },
  },
};
