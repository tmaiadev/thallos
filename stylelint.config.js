import stylisticPlugin from '@stylistic/stylelint-plugin';

export default {
  plugins: [stylisticPlugin],
  extends: ['stylelint-config-standard'],
  rules: {
    '@stylistic/indentation': [2, { severity: 'error' }],
  },
};
