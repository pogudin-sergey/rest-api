module.exports = {
  "root": true,
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "project": ["./tsconfig.json", "./server/tsconfig.json"]
  },
  "settings": {
    "import/resolver": {
      "node": {
        "extensions": [
          ".ts"
        ]
      }
    }
  },
  "plugins": [
    "@typescript-eslint"
  ],
  "overrides": [
    {
      "files": [
        "**/*.test.ts"
      ],
      "plugins": [
        "jest"
      ],
      "rules": {
        "@typescript-eslint/unbound-method": "off",
        "jest/unbound-method": "error"
      }
    },
    {
      "files": [
        "legacy/**/*.ts"
      ],
      "rules": {
        "unicorn/filename-case": "off"
      }
    }
  ],
  "extends": [
    "./src/utils/eslint-config",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking"
  ],
  "ignorePatterns": [
    "test/**/*.ts",
    "dist/*",
    "**/*.js"
  ],
  "rules": {
    "no-console": "error",
    "no-shadow": "off",
    "@typescript-eslint/no-shadow": "error",
    "import/prefer-default-export": "off",
    "no-useless-constructor": "off",
    "lines-between-class-members": "off",
    "@typescript-eslint/no-useless-constructor": [
      "error"
    ],
    "@typescript-eslint/naming-convention": [
      "error",
      {
        "selector": [
          "typeProperty"
        ],
        "format": [
          "snake_case",
          "camelCase",
          "PascalCase"
        ]
      },
      {
        "selector": [
          "variable"
        ],
        "modifiers": [
          "global",
          "exported"
        ],
        "format": [
          "camelCase",
          "UPPER_CASE"
        ]
      },
      {
        "selector": [
          "variable"
        ],
        "modifiers": [
          "global"
        ],
        "format": [
          "camelCase",
          "UPPER_CASE"
        ]
      },
      {
        "selector": [
          "variable",
          "parameter"
        ],
        "format": [
          "camelCase"
        ]
      },
      {
        "selector": [
          "parameter"
        ],
        "modifiers": [
          "unused"
        ],
        "format": [
          "camelCase"
        ],
        // "leadingUnderscore": "require"
      }
    ],
    "import/no-extraneous-dependencies": ["error", {"devDependencies": true}],
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        "js": "never",
        "ts": "never"
      }
    ],
    "unicorn/filename-case": [
      "error",
      {
        "case": "kebabCase"
      }
    ]
  }
}
