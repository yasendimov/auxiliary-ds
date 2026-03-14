import Layout from './Layout.vue'
import '@aux/style.css'

import * as components from '@aux/components/index.js'

export default {
  Layout,
  enhanceApp({ app }) {
    // Register all AUX library components globally for use in markdown
    for (const [name, component] of Object.entries(components)) {
      // Skip non-component exports (composables, etc.)
      if (typeof component === 'object' && component.__name) {
        app.component(name, component)
      }
    }
  }
}
