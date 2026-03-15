import { mount } from '@vue/test-utils'
import { axe } from 'vitest-axe'
import { expect } from 'vitest'

/**
 * Mount a component with data-theme set on the document root.
 */
export function mountWithTheme(component, options = {}, theme = 'dark') {
  document.documentElement.dataset.theme = theme
  return mount(component, options)
}

/**
 * Mount a component with a provide/inject key.
 * Generic helper for RadioGroup, ButtonGroup, Tabs, etc.
 */
export function mountWithProvider(component, key, value, options = {}) {
  return mount(component, {
    ...options,
    global: {
      ...options.global,
      provide: {
        ...options.global?.provide,
        [key]: value
      }
    }
  })
}

/**
 * Run axe accessibility audit on a wrapper's element.
 * Asserts zero violations.
 */
export async function expectAccessible(wrapper) {
  const results = await axe(wrapper.element, {
    rules: {
      // Isolated component tests never have landmark wrappers
      region: { enabled: false }
    }
  })
  expect(results).toHaveNoViolations()
}
