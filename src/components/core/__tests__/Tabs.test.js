import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Tabs from '../Tabs.vue'
import Tab from '../Tab.vue'
import { expectAccessible } from '../../../test/helpers.js'

function mountTabs(props = {}, tabSlots = '') {
  const defaultSlots =
    tabSlots || '<Tab value="a">Tab A</Tab><Tab value="b">Tab B</Tab><Tab value="c">Tab C</Tab>'

  return mount(Tabs, {
    props: { modelValue: 'a', ...props },
    slots: { default: defaultSlots },
    global: { components: { Tab } }
  })
}

describe('Tabs', () => {
  it('renders a div with role="tablist"', () => {
    const wrapper = mountTabs()
    expect(wrapper.attributes('role')).toBe('tablist')
  })

  it('Tab renders a button with role="tab" when inside Tabs', () => {
    const wrapper = mountTabs()
    const tabs = wrapper.findAll('[role="tab"]')
    expect(tabs.length).toBe(3)
    expect(tabs[0].element.tagName).toBe('BUTTON')
  })

  it('active tab has aria-selected="true", others have aria-selected="false"', () => {
    const wrapper = mountTabs({ modelValue: 'b' })
    const tabs = wrapper.findAll('[role="tab"]')
    expect(tabs[0].attributes('aria-selected')).toBe('false')
    expect(tabs[1].attributes('aria-selected')).toBe('true')
    expect(tabs[2].attributes('aria-selected')).toBe('false')
  })

  it('clicking a tab emits update:modelValue with that tab value', async () => {
    const wrapper = mountTabs({ modelValue: 'a' })
    const tabs = wrapper.findAll('[role="tab"]')
    await tabs[1].trigger('click')
    expect(wrapper.emitted('update:modelValue')).toEqual([['b']])
  })

  it('clicking a disabled tab does NOT emit', async () => {
    const wrapper = mountTabs(
      { modelValue: 'a' },
      '<Tab value="a">Tab A</Tab><Tab value="b" :disabled="true">Tab B</Tab>'
    )
    const tabs = wrapper.findAll('[role="tab"]')
    await tabs[1].trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
  })

  it('disabled tab has aria-disabled="true" and tabindex="-1"', () => {
    const wrapper = mountTabs(
      { modelValue: 'a' },
      '<Tab value="a">Tab A</Tab><Tab value="b" :disabled="true">Tab B</Tab>'
    )
    const disabledTab = wrapper.findAll('[role="tab"]')[1]
    expect(disabledTab.attributes('aria-disabled')).toBe('true')
    expect(disabledTab.attributes('tabindex')).toBe('-1')
  })

  it('keyboard Enter activates a tab', async () => {
    const wrapper = mountTabs({ modelValue: 'a' })
    const tabs = wrapper.findAll('[role="tab"]')
    await tabs[1].trigger('keydown', { key: 'Enter' })
    expect(wrapper.emitted('update:modelValue')).toEqual([['b']])
  })

  it('keyboard Space activates a tab', async () => {
    const wrapper = mountTabs({ modelValue: 'a' })
    const tabs = wrapper.findAll('[role="tab"]')
    await tabs[2].trigger('keydown', { key: ' ' })
    expect(wrapper.emitted('update:modelValue')).toEqual([['c']])
  })

  it('keyboard on disabled tab does not emit', async () => {
    const wrapper = mountTabs(
      { modelValue: 'a' },
      '<Tab value="a">Tab A</Tab><Tab value="b" :disabled="true">Tab B</Tab>'
    )
    const disabledTab = wrapper.findAll('[role="tab"]')[1]
    await disabledTab.trigger('keydown', { key: 'Enter' })
    await disabledTab.trigger('keydown', { key: ' ' })
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
  })

  it.each([
    ['sm', 'px-3'],
    ['md', 'px-4'],
    ['lg', 'px-5']
  ])('size "%s" propagates "%s" class to Tab', (size, expectedClass) => {
    const wrapper = mountTabs({ modelValue: 'a', size })
    const tab = wrapper.find('[role="tab"]')
    expect(tab.classes()).toContain(expectedClass)
  })

  it.each([
    ['sm', 'gap-0.5'],
    ['md', 'gap-1'],
    ['lg', 'gap-1.5']
  ])('Tabs with size "%s" has gap class "%s"', (size, expectedClass) => {
    const wrapper = mountTabs({ modelValue: 'a', size })
    expect(wrapper.classes()).toContain(expectedClass)
  })

  it('enabled tab has tabindex="0"', () => {
    const wrapper = mountTabs({ modelValue: 'a' })
    const tab = wrapper.find('[role="tab"]')
    expect(tab.attributes('tabindex')).toBe('0')
  })

  it('passes axe accessibility audit', async () => {
    const wrapper = mountTabs({ modelValue: 'a' })
    await expectAccessible(wrapper)
  })
})
