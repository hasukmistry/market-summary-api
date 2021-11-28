module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 12,
  },
  parser: "@babel/eslint-parser",
  rules: {
    "indent": ["error", 4],
    "comma-dangle": ["error", "never"],
    "strict": "off",
    "global-require": "off",
    "no-restricted-imports": "off",
    "import/no-unresolved": "off",
    "import/prefer-default-export": "off",
    "import/no-dynamic-require": "off",
    "prefer-arrow-callback": "off",
    "arrow-body-style": "off",
    "prefer-const": "off",
    "prefer-destructuring": "off",
    "no-console": "off",    
    "func-names": "off",
    "import/first": "off",
    "import/order": "off",
    "no-unused-vars": "off",
    "import/newline-after-import": "off",
    "camelcase": "off",
    "no-trailing-spaces": ["error", 
      { 
        "skipBlankLines": true,
        "ignoreComments": true
      }
    ]
  },
};
