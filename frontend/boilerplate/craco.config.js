const CracoLessPlugin = require('craco-less');

// Define theme variables directly to avoid ES6 import issues
const theme = {
  'primary-color': '#8231D3',
  'primary-hover': '#6726A8',
  'secondary-color': '#5840FF',
  'secondary-hover': '#3520C8',
  'link-color': '#1890ff',
  'success-color': '#52c41a',
  'warning-color': '#faad14',
  'error-color': '#f5222d',
  'font-size-base': '14px',
  'heading-color': 'rgba(0, 0, 0, 0.85)',
  'text-color': '#666D92',
  'text-color-secondary': 'rgba(0, 0, 0, 0.45)',
  'disabled-color': 'rgba(0, 0, 0, 0.25)',
  'border-radius-base': '6px',
  'box-shadow-base': '0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 9px 28px 8px rgba(0, 0, 0, 0.05)',
};

module.exports = {
  eslint: {
    enable: false,
  },
  babel: {
    presets: [
      [
        '@babel/preset-env',
        {
          targets: {
            node: 'current',
          },
        },
      ],
      [
        '@babel/preset-react',
        {
          runtime: 'automatic',
        },
      ],
    ],
  },
  webpack: {
    configure: (webpackConfig) => {
      // Ignore source map warnings for @adobe/css-tools
      webpackConfig.ignoreWarnings = [
        /Failed to parse source map/,
        /@adobe\/css-tools/,
      ];
      
      webpackConfig.resolve = {
        ...webpackConfig.resolve,
        fallback: {
          path: false,
        },
      };
      
      return webpackConfig;
    },
  },
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              ...theme,
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
