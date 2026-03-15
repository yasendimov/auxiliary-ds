import { describe, it, expect, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import Combobox from '../Combobox.vue'
import { expectAccessible } from '../../../test/helpers.js'

const stringOptions = ['Apple', 'Banana', 'Cherry']
const objectOptions = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' }
]

let wrapper

function mountCombobox(props = {}, options = {}) {
  return mount(Combobox, {
    attachTo: document.body,
    props: { options: stringOptions, label: 'Fruit', ...props },
    ...options
  })
}

function getInput(w) {
  return w.find('input[role="combobox"]')
}

function getListbox() {
  return document.body.querySelector('[role="listbox"]')
}

function getOptions() {
  return document.body.querySelectorAll('[role="option"]')
}

afterEach(() => {
  if (wrapper) {
    wrapper.unmount()
    wrapper = null
  }
})

describe('Combobox', () => {
  it('input has role="combobox"', () => {
    wrapper = mountCombobox()
    expect(getInput(wrapper).exists()).toBe(true)
  })

  it('aria-expanded is "false" initially', () => {
    wrapper = mountCombobox()
    expect(getInput(wrapper).attributes('aria-expanded')).toBe('false')
  })

  it('opens on focus — aria-expanded becomes "true"', async () => {
    wrapper = mountCombobox()
    await getInput(wrapper).trigger('focus')
    expect(getInput(wrapper).attributes('aria-expanded')).toBe('true')
  })

  it('listbox appears in document.body when open (Teleport)', async () => {
    wrapper = mountCombobox()
    expect(getListbox()).toBeNull()
    await getInput(wrapper).trigger('focus')
    expect(getListbox()).not.toBeNull()
  })

  it('listbox has role="listbox"', async () => {
    wrapper = mountCombobox()
    await getInput(wrapper).trigger('focus')
    const listbox = getListbox()
    expect(listbox).not.toBeNull()
    expect(listbox.getAttribute('role')).toBe('listbox')
  })

  it('each option has role="option"', async () => {
    wrapper = mountCombobox()
    await getInput(wrapper).trigger('focus')
    const options = getOptions()
    expect(options.length).toBe(3)
    options.forEach((opt) => {
      expect(opt.getAttribute('role')).toBe('option')
    })
  })

  it('filters options based on typed query', async () => {
    wrapper = mountCombobox()
    const input = getInput(wrapper)
    await input.trigger('focus')
    await input.setValue('ban')
    await nextTick()
    const options = getOptions()
    expect(options.length).toBe(1)
    expect(options[0].textContent).toContain('Banana')
  })

  it('ArrowDown moves activeIndex — aria-activedescendant updates', async () => {
    wrapper = mountCombobox()
    const input = getInput(wrapper)
    await input.trigger('focus')
    await input.trigger('keydown', { key: 'ArrowDown' })
    await nextTick()
    const activedescendant = input.attributes('aria-activedescendant')
    expect(activedescendant).toBeDefined()
    expect(activedescendant).toContain('option-0')
  })

  it('ArrowUp moves activeIndex backward', async () => {
    wrapper = mountCombobox()
    const input = getInput(wrapper)
    await input.trigger('focus')
    // ArrowUp with no active index wraps to last
    await input.trigger('keydown', { key: 'ArrowUp' })
    await nextTick()
    const activedescendant = input.attributes('aria-activedescendant')
    expect(activedescendant).toBeDefined()
    expect(activedescendant).toContain('option-2')
  })

  it('Enter selects the active option and emits update:modelValue', async () => {
    wrapper = mountCombobox()
    const input = getInput(wrapper)
    await input.trigger('focus')
    await input.trigger('keydown', { key: 'ArrowDown' })
    await nextTick()
    await input.trigger('keydown', { key: 'Enter' })
    expect(wrapper.emitted('update:modelValue')).toEqual([['Apple']])
  })

  it('Escape closes the dropdown', async () => {
    wrapper = mountCombobox()
    const input = getInput(wrapper)
    await input.trigger('focus')
    expect(getListbox()).not.toBeNull()
    await input.trigger('keydown', { key: 'Escape' })
    await nextTick()
    expect(getListbox()).toBeNull()
  })

  it('clicking an option emits update:modelValue', async () => {
    wrapper = mountCombobox()
    await getInput(wrapper).trigger('focus')
    await nextTick()
    const options = getOptions()
    options[1].click()
    await nextTick()
    expect(wrapper.emitted('update:modelValue')).toEqual([['Banana']])
  })

  it('disabled option click does not emit', async () => {
    wrapper = mountCombobox({
      options: [
        { value: 'a', label: 'Apple' },
        { value: 'b', label: 'Banana', disabled: true },
        { value: 'c', label: 'Cherry' }
      ]
    })
    await getInput(wrapper).trigger('focus')
    await nextTick()
    const options = getOptions()
    options[1].click()
    await nextTick()
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
  })

  it('selected option has aria-selected="true"', async () => {
    wrapper = mountCombobox({ modelValue: 'Banana' })
    await getInput(wrapper).trigger('focus')
    await nextTick()
    const options = getOptions()
    expect(options[0].getAttribute('aria-selected')).toBe('false')
    expect(options[1].getAttribute('aria-selected')).toBe('true')
    expect(options[2].getAttribute('aria-selected')).toBe('false')
  })

  it('shows emptyText when no matches', async () => {
    wrapper = mountCombobox({ emptyText: 'Nothing here.' })
    const input = getInput(wrapper)
    await input.trigger('focus')
    await input.setValue('zzzzz')
    await nextTick()
    const options = getOptions()
    expect(options.length).toBe(0)
    const listbox = getListbox()
    expect(listbox.textContent).toContain('Nothing here.')
  })

  it('disabled combobox does not open on focus', async () => {
    wrapper = mountCombobox({ disabled: true })
    await getInput(wrapper).trigger('focus')
    await nextTick()
    expect(getListbox()).toBeNull()
    expect(getInput(wrapper).attributes('aria-expanded')).toBe('false')
  })

  it('string options are normalized correctly', async () => {
    wrapper = mountCombobox({ options: ['Red', 'Green', 'Blue'] })
    await getInput(wrapper).trigger('focus')
    await nextTick()
    const options = getOptions()
    expect(options.length).toBe(3)
    expect(options[0].textContent).toContain('Red')
    expect(options[1].textContent).toContain('Green')
    expect(options[2].textContent).toContain('Blue')
  })

  it('object options with { value, label } work correctly', async () => {
    wrapper = mountCombobox({ options: objectOptions })
    await getInput(wrapper).trigger('focus')
    await nextTick()
    const options = getOptions()
    expect(options.length).toBe(3)
    expect(options[0].textContent).toContain('Apple')
    expect(options[1].textContent).toContain('Banana')
    expect(options[2].textContent).toContain('Cherry')
  })

  it('input has aria-autocomplete="list"', () => {
    wrapper = mountCombobox()
    expect(getInput(wrapper).attributes('aria-autocomplete')).toBe('list')
  })

  it('disabled option has aria-disabled', async () => {
    wrapper = mountCombobox({
      options: [
        { value: 'a', label: 'Apple' },
        { value: 'b', label: 'Banana', disabled: true }
      ]
    })
    await getInput(wrapper).trigger('focus')
    await nextTick()
    const options = getOptions()
    expect(options[1].getAttribute('aria-disabled')).toBe('true')
  })

  it('passes axe accessibility audit', async () => {
    wrapper = mountCombobox()
    await expectAccessible(wrapper)
  })
})
