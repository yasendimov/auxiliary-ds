export const navConfig = [
  {
    label: 'BRAND',
    items: [
      {
        number: '01',
        title: 'Identity',
        path: '/brand/identity',
        children: [
          { name: 'Mission', hash: 'mission' },
          { name: 'Brand Idea', hash: 'brand-idea' },
          { name: 'Visual Language', hash: 'visual-language' }
        ]
      },
      {
        number: '02',
        title: 'Logo',
        path: '/brand/logo',
        children: [
          { name: 'Intro', hash: 'intro' },
          { name: 'Construction', hash: 'construction' },
          { name: 'Usage', hash: 'usage' },
          { name: 'Color', hash: 'color' }
        ]
      },
      {
        number: '03',
        title: 'Typography',
        path: '/brand/typography',
        children: [
          { name: 'Type Scale', hash: 'type-scale' },
          { name: 'Using Type', hash: 'using-type' },
          { name: 'Formatting', hash: 'formatting' }
        ]
      },
      {
        number: '04',
        title: 'Color',
        path: '/brand/color',
        children: [
          { name: 'Introduction', hash: 'introduction' },
          { name: 'Primitives', hash: 'primitives' },
          { name: 'Semantic Tokens', hash: 'semantic-tokens' },
          { name: 'Themes', hash: 'themes' }
        ]
      },
      {
        number: '05',
        title: 'Iconography',
        path: '/brand/iconography',
        children: [
          { name: 'Overview', hash: 'overview' },
          { name: 'Product Symbols', hash: 'product-symbols' },
          { name: 'Functional Icons', hash: 'functional-icons' }
        ]
      },
      {
        number: '06',
        title: 'Photography',
        path: '/brand/photography',
        children: [
          { name: 'Style', hash: 'style' },
          { name: 'Product', hash: 'product' },
          { name: 'People', hash: 'people' },
          { name: 'Places', hash: 'places' }
        ]
      },
      {
        number: '07',
        title: 'Language',
        path: '/brand/language',
        children: [
          { name: 'Voice & Tone', hash: 'voice-and-tone' },
          { name: 'Writing Style', hash: 'writing-style' },
          { name: 'Product Names', hash: 'product-names' }
        ]
      },
      {
        number: '08',
        title: 'Gallery',
        path: '/brand/gallery',
        children: [
          { name: 'Theme', path: 'theme' },
          { name: 'Marketing', path: 'marketing' },
          { name: 'Applications', path: 'applications' },
          { name: 'Operations', path: 'operations' },
          { name: 'Special', path: 'special' }
        ]
      }
    ]
  },
  {
    label: 'SYSTEM',
    items: [
      {
        number: '09',
        title: 'Tokens',
        path: '/system/tokens',
        children: [
          { name: 'Colors', hash: 'colors' },
          { name: 'Typography', hash: 'typography' },
          { name: 'Spacing', hash: 'spacing' },
          { name: 'Border Radius', hash: 'border-radius' },
          { name: 'Shadows', hash: 'shadows' },
          { name: 'Motion', hash: 'motion' },
          { name: 'Opacity', hash: 'opacity' },
          { name: 'Z-Index', hash: 'z-index' }
        ]
      },
      {
        number: '10',
        title: 'Core',
        path: '/system/core',
        children: [
          { name: 'Button', path: 'button' },
          { name: 'Link', path: 'link' },
          { name: 'Checkbox', path: 'checkbox' },
          { name: 'CheckboxGroup', path: 'checkbox-group' },
          { name: 'Combobox', path: 'combobox' },
          { name: 'FormField', path: 'form-field' },
          { name: 'Input', path: 'input' },
          { name: 'Radio', path: 'radio' },
          { name: 'Select', path: 'select' },
          { name: 'Textarea', path: 'textarea' },
          { name: 'Toggle', path: 'toggle' },
          { name: 'Alert', path: 'alert' },
          { name: 'Spinner', path: 'spinner' },
          { name: 'Toast', path: 'toast' },
          { name: 'Dialog', path: 'dialog' },
          { name: 'Dropdown', path: 'dropdown' },
          { name: 'Popover', path: 'popover' },
          { name: 'Tooltip', path: 'tooltip' },
          { name: 'Avatar', path: 'avatar' },
          { name: 'Badge', path: 'badge' },
          { name: 'Identicon', path: 'identicon' },
          { name: 'Separator', path: 'separator' },
          { name: 'VisuallyHidden', path: 'visually-hidden' },
          { name: 'Tabs', path: 'tabs' }
        ]
      },
      {
        number: '11',
        title: 'Marketing',
        path: '/system/marketing',
        children: [
          { name: 'Hero', path: 'hero' },
          { name: 'Header', path: 'header' },
          { name: 'Section', path: 'section' }
        ]
      },
      {
        number: '12',
        title: 'Applications',
        path: '/system/applications'
      },
      {
        number: '13',
        title: 'Operations',
        path: '/system/operations'
      }
    ]
  }
]
