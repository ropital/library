const loaders = (options = {}) => [
  { loader: 'style-loader' },
  {
    loader: 'css-loader',
    options: {
      importLoaders: 1,
      ...options,
    },
  },
  { loader: 'postcss-loader' },
];

module.exports = {
  stories: ['../src/components/**/*.stories.@(tsx|mdx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-actions',
    '@storybook/addon-knobs',
    '@storybook/addon-docs',
    '@storybook/addon-a11y',
  ],
  webpackFinal: async (config) => ({
    ...config,
    module: {
      ...config.module,
      rules: config.module.rules.reduce(
        (acc, cur) => [
          ...acc,
          ...cur.test.toString() === /\.css$/.toString()
            ? [
              { test: /\.module\.css$/, use: loaders({ modules: true }) },
              { test: /^.*(?<!\.module)\.css$/, use: loaders() },
            ]
            : [cur],
        ],
        [],
      ),
    },
  }),
};
