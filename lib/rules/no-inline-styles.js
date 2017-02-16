/**
 * @fileoverview Disallow inline styles in JSX
 * @author Dmitriy Startsev
 */
/* eslint-disable object-shorthand */
/* eslint-disable func-names */
const StateMachine = require('javascript-state-machine');

module.exports = {
  meta: {
    docs: {
      description: 'Disallow inline styles in JSX',
      category: '',
      recommended: true,
    },
    schema: [],
  },
  create: function (context) {
    const fsm = StateMachine.create({
      initial: 'outsideStyle',
      events: [
        { name: 'enterStyle', from: 'outsideStyle', to: 'insideStyle' },
        { name: 'findIdentifier', from: ['insideStyle', 'identifierFound'], to: 'identifierFound' },
        { name: 'findIdentifier', from: 'outsideStyle', to: 'outsideStyle' },
        { name: 'exitStyle', from: ['insideStyle', 'identifierFound'], to: 'outsideStyle' },
      ],
      callbacks: {
        onexitStyle: function (event, from, to, node) {
          if (from !== 'identifierFound') {
            context.report(node, 'Inline styles are not allowed');
          }
        },
      },
    });
    return {
      JSXAttribute: function (node) {
        if (node.name.name === 'style') {
          fsm.enterStyle(node);
        }
      },
      'JSXAttribute:exit': function (node) {
        if (node.name.name === 'style') {
          fsm.exitStyle(node);
        }
      },
      Identifier: function (node) {
        if (node.parent.type === 'Property'
          && node.parent.key === node) {
          return;
        }

        fsm.findIdentifier();
      },
    };
  },
};
