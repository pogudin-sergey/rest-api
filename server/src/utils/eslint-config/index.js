module.exports = {
  plugins: ['unicorn'],
  extends: ['airbnb-base'],
  rules: {
    'unicorn/prefer-includes': 'warn',
    'arrow-parens': ["error", "as-needed"],
    'unicorn/filename-case': ['error', { case: 'snakeCase' }],
    camelcase: 'off',
    'max-len': [
      'error',
      {
        code: 170,
        tabWidth: 2,
        ignoreComments: true,
      },
    ],
    'no-underscore-dangle': 'off',
    'no-param-reassign': 'warn',
    'class-methods-use-this': 'warn',
    indent: ['error', 2,{
        "ignoredNodes": [
            `FunctionExpression > .params[decorators.length > 0]`,
            `FunctionExpression > .params > :matches(Decorator, :not(:first-child))`,
            `ClassBody.body > PropertyDefinition[decorators.length > 0] > .key`,
        ],
        "SwitchCase": 1,
    },],
    radix: ['error', 'as-needed'],
    'no-await-in-loop': 'warn',
    'arrow-body-style': 'warn',
    'no-plusplus': [
      'error',
      {
        allowForLoopAfterthoughts: true,
      },
    ],
    'no-restricted-syntax': [
      'error',
      {
        selector: 'ForInStatement',
        message:
          'for..in loops iterate over the entire prototype chain, which is virtually never what you want. Use Object.{keys,values,entries}, and iterate over the resulting array.',
      },
      {
        selector: 'LabeledStatement',
        message:
          'Labels are a form of GOTO; using them makes code confusing and hard to maintain and understand.',
      },
      {
        selector: 'WithStatement',
        message:
          '`with` is disallowed in strict mode because it makes code impossible to predict and optimize.',
      },
    ],
  },
  overrides: [
    {
      files: ['**/migrations/**/*.js'],
      rules: {
        'unicorn/filename-case': 'off',
      },
    },
    {
      files: ['**/migrations_*/**/*.js'],
      rules: {
        'unicorn/filename-case': 'off',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 9,
    sourceType: 'script',
    ecmaFeatures: {
      impliedStrict: true,
    },
  },
  env: {
    mocha: true,
    es6: true,
    node: true,
    jest: true,
  },
};
