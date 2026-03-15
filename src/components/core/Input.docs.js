export default {
  description: 'Text input with label, hint, error state, icons, and prefix/suffix support.',
  props: [
    {
      name: 'modelValue',
      type: 'String',
      default: "''",
      description: 'Bound input value (v-model).'
    },
    {
      name: 'type',
      type: 'String',
      default: "'text'",
      description: 'HTML input type attribute.'
    },
    {
      name: 'variant',
      type: 'String',
      default: "'default'",
      values: ['default', 'error', 'success'],
      description: 'Visual variant. Error variant auto-applies when error prop is set.'
    },
    {
      name: 'size',
      type: 'String',
      default: "'md'",
      values: ['sm', 'md', 'lg'],
      description: 'Input height and text size.'
    },
    {
      name: 'placeholder',
      type: 'String',
      default: "''",
      description: 'Placeholder text shown when empty.'
    },
    {
      name: 'disabled',
      type: 'Boolean',
      default: 'false',
      description: 'Prevents interaction and applies disabled styling.'
    },
    {
      name: 'readonly',
      type: 'Boolean',
      default: 'false',
      description: 'Makes the input read-only.'
    },
    {
      name: 'label',
      type: 'String',
      default: 'null',
      description: 'Visible label text rendered above the input.'
    },
    {
      name: 'hint',
      type: 'String',
      default: 'null',
      description: 'Helper text below the input. Hidden when error is set.'
    },
    {
      name: 'error',
      type: 'String',
      default: 'null',
      description: 'Error message below the input. Overrides hint and forces error variant.'
    },
    {
      name: 'leadingIcon',
      type: 'Component',
      default: 'null',
      description: 'Icon component rendered inside the input on the left.'
    },
    {
      name: 'trailingIcon',
      type: 'Component',
      default: 'null',
      description: 'Icon component rendered inside the input on the right.'
    },
    {
      name: 'prefix',
      type: 'String',
      default: 'null',
      description: 'Text prefix attached to the left of the input.'
    },
    {
      name: 'suffix',
      type: 'String',
      default: 'null',
      description: 'Text suffix attached to the right of the input.'
    }
  ],
  events: [
    {
      name: 'update:modelValue',
      payload: 'String',
      description: 'Emitted on input for v-model binding.'
    },
    {
      name: 'focus',
      payload: 'FocusEvent',
      description: 'Emitted when the input receives focus.'
    },
    {
      name: 'blur',
      payload: 'FocusEvent',
      description: 'Emitted when the input loses focus.'
    }
  ],
  slots: []
}
