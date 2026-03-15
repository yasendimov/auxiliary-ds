import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Input from '../Input.vue'
import { expectAccessible } from '../../../test/helpers.js'

describe('Input', () => {
  it('renders input element with correct type', () => {
    const wrapper = mount(Input, {
      props: { type: 'email' }
    })
    expect(wrapper.find('input').attributes('type')).toBe('email')
  })

  it('emits update:modelValue on input', async () => {
    const wrapper = mount(Input)
    const input = wrapper.find('input')
    await input.setValue('hello')
    expect(wrapper.emitted('update:modelValue')[0]).toEqual(['hello'])
  })

  it.each([
    ['default', 'border-base-normal'],
    ['error', 'border-red-dim'],
    ['success', 'border-green-dim']
  ])('variant "%s" applies class containing %s', (variant, expectedClass) => {
    const wrapper = mount(Input, {
      props: { variant }
    })
    expect(wrapper.find('input').classes()).toContain(expectedClass)
  })

  it('error prop auto-promotes variant to error', () => {
    const wrapper = mount(Input, {
      props: { variant: 'default', error: 'Oops' }
    })
    expect(wrapper.find('input').classes()).toContain('border-red-dim')
    expect(wrapper.find('input').classes()).not.toContain('border-base-normal')
  })

  it.each([
    ['sm', 'h-7'],
    ['md', 'h-9'],
    ['lg', 'h-11']
  ])('size "%s" applies %s class', (size, heightClass) => {
    const wrapper = mount(Input, {
      props: { size }
    })
    expect(wrapper.find('input').classes()).toContain(heightClass)
  })

  it('renders label when provided and label for matches input id', () => {
    const wrapper = mount(Input, {
      props: { label: 'Email' }
    })
    const label = wrapper.find('label')
    const input = wrapper.find('input')
    expect(label.exists()).toBe(true)
    expect(label.text()).toBe('Email')
    expect(label.attributes('for')).toBe(input.attributes('id'))
  })

  it('renders hint text with matching aria-describedby', () => {
    const wrapper = mount(Input, {
      props: { hint: 'Enter your email' }
    })
    const hint = wrapper.find('p')
    const input = wrapper.find('input')
    expect(hint.text()).toBe('Enter your email')
    expect(input.attributes('aria-describedby')).toBe(hint.attributes('id'))
  })

  it('renders error text with matching aria-describedby', () => {
    const wrapper = mount(Input, {
      props: { error: 'Required field' }
    })
    const errorEl = wrapper.find('p')
    const input = wrapper.find('input')
    expect(errorEl.text()).toBe('Required field')
    expect(input.attributes('aria-describedby')).toBe(errorEl.attributes('id'))
  })

  it('sets aria-invalid when variant resolves to error', () => {
    const wrapper = mount(Input, {
      props: { error: 'Bad value' }
    })
    expect(wrapper.find('input').attributes('aria-invalid')).toBe('true')
  })

  it('does not set aria-invalid in default variant', () => {
    const wrapper = mount(Input)
    expect(wrapper.find('input').attributes('aria-invalid')).toBeUndefined()
  })

  it('disabled state sets disabled attribute', () => {
    const wrapper = mount(Input, {
      props: { disabled: true }
    })
    expect(wrapper.find('input').attributes('disabled')).toBeDefined()
  })

  it('readonly state sets readonly attribute', () => {
    const wrapper = mount(Input, {
      props: { readonly: true }
    })
    expect(wrapper.find('input').attributes('readonly')).toBeDefined()
  })

  it('renders prefix text when provided', () => {
    const wrapper = mount(Input, {
      props: { prefix: 'https://' }
    })
    const spans = wrapper.findAll('span')
    const prefixSpan = spans.find((s) => s.text() === 'https://')
    expect(prefixSpan).toBeTruthy()
  })

  it('renders suffix text when provided', () => {
    const wrapper = mount(Input, {
      props: { suffix: '.com' }
    })
    const spans = wrapper.findAll('span')
    const suffixSpan = spans.find((s) => s.text() === '.com')
    expect(suffixSpan).toBeTruthy()
  })

  it('passes axe accessibility audit', async () => {
    const wrapper = mount(Input, {
      props: { label: 'Username' }
    })
    await expectAccessible(wrapper)
  })
})
