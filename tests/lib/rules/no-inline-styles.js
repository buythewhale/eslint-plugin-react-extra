/**
 * @fileoverview Disallow inline styles in JSX
 * @author Dmitriy Startsev
 */
/* eslint-disable no-template-curly-in-string */

const { RuleTester } = require('eslint');
const rule = require('../../../lib/rules/no-inline-styles');

const parserOptions = {
  ecmaVersion: 6,
  ecmaFeatures: {
    experimentalObjectRestSpread: true,
    jsx: true,
  },
};

const ruleTester = new RuleTester();
const errorMessage = 'Inline styles are not allowed';
ruleTester.run('no-inline-styles', rule, {
  valid: [
    {
      code: [
        'function foo() {',
        '  const height = 50 + "%";',
        '  const styles = { height: height };',
        '  return <div style={styles} />;',
        '}',
      ].join('\n'),
      parserOptions,
    },
    {
      code: [
        'function foo() {',
        '  const height = 50 + "%";',
        '  return <div style={{ height: height }} />;',
        '}',
      ].join('\n'),
      parserOptions,
    },
    {
      code: [
        'function foo() {',
        '  const height = 50 + "%";',
        '  const key = "height";',
        '  return <div style={{ [key]: height }} />;',
        '}',
      ].join('\n'),
      parserOptions,
    },
    {
      code: [
        'function foo() {',
        '  const height = 50 + "%";',
        '  return <div style={`height: ${height}`} />;',
        '}',
      ].join('\n'),
      parserOptions,
    },
  ],
  invalid: [
    {
      code: '<div style="color: red" />',
      errors: [{
        message: errorMessage,
        line: 1,
        column: 6,
        type: 'JSXAttribute',
      }],
      parserOptions,
    },
    {
      code: '<div style={"color: red;"} />',
      errors: [{
        message: errorMessage,
        line: 1,
        column: 6,
        type: 'JSXAttribute',
      }],
      parserOptions,
    },
    {
      code: '<div style={`color: red;`} />',
      errors: [{
        message: errorMessage,
        line: 1,
        column: 6,
        type: 'JSXAttribute',
      }],
      parserOptions,
    },
    {
      code: '<div style={{ "height": 100 }} />',
      errors: [{
        message: errorMessage,
        line: 1,
        column: 6,
        type: 'JSXAttribute',
      }],
      parserOptions,
    },
    {
      code: '<div style={{ height: 100 }} />',
      errors: [{
        message: errorMessage,
        line: 1,
        column: 6,
        type: 'JSXAttribute',
      }],
      parserOptions,
    },
  ],
});
