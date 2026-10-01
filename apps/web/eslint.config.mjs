import reactConfig from '@c-ride/eslint-config/react';

export default [
  ...reactConfig,
  {
    files: ['src/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['@/pages/*', '@/features/*', '@/entities/*'],
              importNames: ['*'],
              message: 'Shared code must not import from higher application layers.',
            },
          ],
        },
      ],
    },
  },
  {
    files: ['src/entities/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['@/features/*', '@/pages/*'],
              message: 'Entity code must not import from features or pages.',
            },
          ],
        },
      ],
    },
  },
  {
    files: ['src/features/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['@/pages/*'],
              message: 'Feature code must not import from pages.',
            },
          ],
        },
      ],
    },
  },
];
