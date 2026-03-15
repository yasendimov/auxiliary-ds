export default {
  description: 'Primary interactive element for actions and form submissions.',
  props: [
    {
      name: 'variant',
      type: 'String',
      default: "'solid'",
      values: ['solid', 'soft', 'surface', 'outline', 'ghost'],
      description: 'Visual weight of the button.'
    },
    {
      name: 'color',
      type: 'String',
      default: "'blue'",
      values: ['blue', 'red'],
      description: 'Semantic color. Blue for actions, red for destructive.'
    },
    {
      name: 'size',
      type: 'String',
      default: 'null',
      values: ['sm', 'md', 'lg', 'xl'],
      description:
        'Button height and text size. Defaults to md, inherits from ButtonGroup if nested.'
    },
    {
      name: 'disabled',
      type: 'Boolean',
      default: 'false',
      description: 'Prevents interaction and applies disabled styling.'
    },
    {
      name: 'loading',
      type: 'Boolean',
      default: 'false',
      description: 'Shows a spinner and disables interaction.'
    },
    {
      name: 'block',
      type: 'Boolean',
      default: 'false',
      description: 'Expands to full container width.'
    },
    {
      name: 'type',
      type: 'String',
      default: "'button'",
      description: 'HTML button type attribute.'
    }
  ],
  events: [
    {
      name: 'click',
      payload: 'MouseEvent',
      description: 'Fired on click when not disabled or loading.'
    }
  ],
  slots: [
    {
      name: 'default',
      description: 'Button label text and optional icons via data-slot="icon" children.'
    }
  ]
}
