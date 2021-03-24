module.exports = {
    "env": {
        "es2021": true,
        "browser": true,
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:sonarjs/recommended"
    ],
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 12,
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "sonarjs"
    ],
    "rules": {
    },
    "ignorePatterns": [".eslintrc.js"]
};
