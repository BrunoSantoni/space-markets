module.exports = {
  env: {
    commonjs: true,
    es6: true,
    node: true,
  },
  extends: [
    'airbnb-base',
  ],
  plugins: [
    'prettier'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
  rules: {
    "prettier/prettier": "error",
    "class-methods-use-this": "off", /* Não coloca o this em todos os métodos */
    "no-param-reassign": "off", /* Redefinir o valor de um parâmetro */
    "camelcase": "off", /* Variáveis sempre definidas em camelCase */
    "no-unused-vars": [2, {"vars": "all", "args": "none"}], /* Caso declare a variável next e não a use, ele não corrigirá */
    "semi": 0,
    "consistent-return": "off"
  },
};
