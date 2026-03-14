export const navConfig = [
  {
    label: 'BRAND',
    items: [
      {
        number: '01',
        title: 'Identity',
        path: 'brand/identity',
        component: () => import('./pages/identity/IdentityPage.vue'),
        children: [
          { name: 'Mission', hash: 'mission' },
          { name: 'Brand Idea', hash: 'brand-idea' },
          { name: 'Visual Language', hash: 'visual-language' }
        ]
      },
      {
        number: '02',
        title: 'Logo',
        path: 'brand/logo',
        component: () => import('./pages/StubPage.vue'),
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
        path: 'brand/typography',
        component: () => import('./pages/StubPage.vue'),
        children: [
          { name: 'Type Scale', hash: 'type-scale' },
          { name: 'Using Type', hash: 'using-type' },
          { name: 'Formatting', hash: 'formatting' }
        ]
      },
      {
        number: '04',
        title: 'Color',
        path: 'brand/color',
        component: () => import('./pages/StubPage.vue'),
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
        path: 'brand/iconography',
        component: () => import('./pages/StubPage.vue'),
        children: [
          { name: 'Overview', hash: 'overview' },
          { name: 'Product Symbols', hash: 'product-symbols' },
          { name: 'Functional Icons', hash: 'functional-icons' }
        ]
      },
      {
        number: '06',
        title: 'Photography',
        path: 'brand/photography',
        component: () => import('./pages/StubPage.vue'),
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
        path: 'brand/language',
        component: () => import('./pages/StubPage.vue'),
        children: [
          { name: 'Voice & Tone', hash: 'voice-and-tone' },
          { name: 'Writing Style', hash: 'writing-style' },
          { name: 'Product Names', hash: 'product-names' }
        ]
      },
      {
        number: '08',
        title: 'Gallery',
        path: 'brand/gallery',
        children: [
          {
            name: 'Theme',
            path: 'theme',
            component: () => import('./pages/gallery/ThemePage.vue')
          },
          {
            name: 'Marketing',
            path: 'marketing',
            component: () => import('./pages/gallery/MarketingPage.vue')
          },
          {
            name: 'Applications',
            path: 'applications',
            component: () => import('./pages/gallery/ApplicationsPage.vue')
          },
          {
            name: 'Operations',
            path: 'operations',
            component: () => import('./pages/gallery/OperationsPage.vue')
          },
          {
            name: 'Special',
            path: 'special',
            component: () => import('./pages/gallery/SpecialPage.vue')
          }
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
        path: 'system/tokens',
        component: () => import('./pages/TokensPage.vue'),
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
        path: 'system/core',
        children: [
          // -- Actions
          {
            name: 'Button',
            path: 'button',
            component: () => import('./pages/ButtonPage.vue')
          },
          {
            name: 'Link',
            path: 'link',
            component: () => import('./pages/LinkPage.vue')
          },

          // -- Forms
          {
            name: 'Checkbox',
            path: 'checkbox',
            component: () => import('./pages/CheckboxPage.vue')
          },
          {
            name: 'CheckboxGroup',
            path: 'checkbox-group',
            component: () => import('./pages/CheckboxGroupPage.vue')
          },
          {
            name: 'Combobox',
            path: 'combobox',
            component: () => import('./pages/ComboboxPage.vue')
          },
          {
            name: 'FormField',
            path: 'form-field',
            component: () => import('./pages/FormFieldPage.vue')
          },
          {
            name: 'Input',
            path: 'input',
            component: () => import('./pages/InputPage.vue')
          },
          {
            name: 'Radio',
            path: 'radio',
            component: () => import('./pages/RadioPage.vue')
          },
          {
            name: 'Select',
            path: 'select',
            component: () => import('./pages/SelectPage.vue')
          },
          {
            name: 'Textarea',
            path: 'textarea',
            component: () => import('./pages/TextareaPage.vue')
          },
          {
            name: 'Toggle',
            path: 'toggle',
            component: () => import('./pages/TogglePage.vue')
          },

          // -- Feedback
          {
            name: 'Alert',
            path: 'alert',
            component: () => import('./pages/AlertPage.vue')
          },
          {
            name: 'Spinner',
            path: 'spinner',
            component: () => import('./pages/SpinnerPage.vue')
          },
          {
            name: 'Toast',
            path: 'toast',
            component: () => import('./pages/ToastPage.vue')
          },

          // -- Overlays
          {
            name: 'Dialog',
            path: 'dialog',
            component: () => import('./pages/DialogPage.vue')
          },
          {
            name: 'Dropdown',
            path: 'dropdown',
            component: () => import('./pages/DropdownPage.vue')
          },
          {
            name: 'Popover',
            path: 'popover',
            component: () => import('./pages/PopoverPage.vue')
          },
          {
            name: 'Tooltip',
            path: 'tooltip',
            component: () => import('./pages/TooltipPage.vue')
          },

          // -- Data Display
          {
            name: 'Avatar',
            path: 'avatar',
            component: () => import('./pages/AvatarPage.vue')
          },
          {
            name: 'Badge',
            path: 'badge',
            component: () => import('./pages/BadgePage.vue')
          },
          {
            name: 'Identicon',
            path: 'identicon',
            component: () => import('./pages/IdenticonPage.vue')
          },

          // -- Layout
          {
            name: 'Separator',
            path: 'separator',
            component: () => import('./pages/SeparatorPage.vue')
          },
          {
            name: 'VisuallyHidden',
            path: 'visually-hidden',
            component: () => import('./pages/VisuallyHiddenPage.vue')
          },
          {
            name: 'Tabs',
            path: 'tabs',
            component: () => import('./pages/TabsPage.vue')
          }
        ]
      },
      {
        number: '11',
        title: 'Marketing',
        path: 'system/marketing',
        children: [
          {
            name: 'Hero',
            path: 'hero',
            component: () => import('./pages/HeroPage.vue')
          },
          {
            name: 'Header',
            path: 'header',
            component: () => import('./pages/HeaderPage.vue')
          },
          {
            name: 'Section',
            path: 'section',
            component: () => import('./pages/SectionPage.vue')
          }
        ]
      },
      {
        number: '12',
        title: 'Applications',
        path: 'system/applications',
        component: () => import('./pages/StubPage.vue')
      },
      {
        number: '13',
        title: 'Operations',
        path: 'system/operations',
        component: () => import('./pages/StubPage.vue')
      }
    ]
  }
]

/**
 * Generates Vue Router route objects from the nav config.
 * - Hash-based items (children have `hash`) → single parent route
 * - Route-based items (children have `path` + `component`) → one route per child
 * - Items without children → single route (stub pages)
 */
export function buildRoutes(config) {
  const routes = []

  for (const section of config) {
    for (const item of section.items) {
      const firstChild = item.children?.[0]

      if (!firstChild) {
        routes.push({
          path: item.path,
          name: item.path.replace(/\//g, '-'),
          component: item.component
        })
      } else if (firstChild.hash) {
        routes.push({
          path: item.path,
          name: item.path.replace(/\//g, '-'),
          component: item.component
        })
      } else {
        for (const child of item.children) {
          routes.push({
            path: item.path + '/' + child.path,
            name: item.path.replace(/\//g, '-') + '-' + child.path,
            component: child.component
          })
        }
      }
    }
  }

  return routes
}
