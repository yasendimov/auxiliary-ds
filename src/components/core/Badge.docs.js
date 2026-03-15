export default {
  description: 'Small status indicator for labels, counts, and categories.',
  props: [
    {
      name: 'variant',
      type: 'String',
      default: "'default'",
      values: ['default', 'info', 'success', 'warning', 'danger'],
      description: 'Semantic color variant.'
    },
    {
      name: 'size',
      type: 'String',
      default: "'md'",
      values: ['sm', 'md'],
      description: 'Badge size.'
    },
    {
      name: 'dot',
      type: 'Boolean',
      default: 'false',
      description: 'Shows a colored status dot before the label.'
    },
    {
      name: 'dismissible',
      type: 'Boolean',
      default: 'false',
      description: 'Shows a dismiss button after the label.'
    }
  ],
  events: [
    {
      name: 'dismiss',
      payload: 'void',
      description: 'Emitted when the dismiss button is clicked.'
    }
  ],
  slots: [
    {
      name: 'default',
      description: 'Badge label text.'
    }
  ]
}
