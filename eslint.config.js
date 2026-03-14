import pluginVue from 'eslint-plugin-vue'
import configPrettier from 'eslint-config-prettier'

export default [
  {
    ignores: ['dist/**', 'node_modules/**', 'src/tokens/colors.css', 'docs/.vitepress/dist/**', 'docs/.vitepress/cache/**']
  },
  ...pluginVue.configs['flat/recommended'],
  configPrettier,
  {
    rules: {
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      'vue/multi-word-component-names': 'off',
      'vue/require-default-prop': 'off'
    }
  }
]
