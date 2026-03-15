import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Badge from '../Badge.vue'
import { expectAccessible } from '../../../test/helpers.js'

describe('Badge', () => {
  it('renders default slot content', () => {
    const wrapper = mount(Badge, {
      slots: { default: 'New' }
    })
    expect(wrapper.text()).toContain('New')
  })

  it.each([
    ['default', 'bg-base-ui', 'text-base-dim'],
    ['info', 'bg-indigo-ui', 'text-indigo-dim'],
    ['success', 'bg-green-ui', 'text-green-dim'],
    ['warning', 'bg-amber-ui', 'text-amber-dim'],
    ['danger', 'bg-red-ui', 'text-red-dim']
  ])('variant "%s" applies %s and %s classes', (variant, bgClass, textClass) => {
    const wrapper = mount(Badge, {
      props: { variant },
      slots: { default: 'Label' }
    })
    const el = wrapper.element
    expect(el.classList.contains(bgClass)).toBe(true)
    expect(el.classList.contains(textClass)).toBe(true)
  })

  it.each([
    ['sm', 'px-1.5', 'py-0.5'],
    ['md', 'px-2', 'py-1']
  ])('size "%s" applies %s and %s classes', (size, pxClass, pyClass) => {
    const wrapper = mount(Badge, {
      props: { size },
      slots: { default: 'Label' }
    })
    const el = wrapper.element
    expect(el.classList.contains(pxClass)).toBe(true)
    expect(el.classList.contains(pyClass)).toBe(true)
  })

  it('shows dot when dot prop is true', () => {
    const wrapper = mount(Badge, {
      props: { dot: true },
      slots: { default: 'Label' }
    })
    const dot = wrapper.find('.rounded-full')
    expect(dot.exists()).toBe(true)
  })

  it.each([
    ['default', 'bg-base-dim'],
    ['info', 'bg-indigo-solid'],
    ['success', 'bg-green-solid'],
    ['warning', 'bg-amber-solid'],
    ['danger', 'bg-red-solid']
  ])('dot has correct color class for variant "%s"', (variant, dotClass) => {
    const wrapper = mount(Badge, {
      props: { variant, dot: true },
      slots: { default: 'Label' }
    })
    const dot = wrapper.find('.rounded-full')
    expect(dot.classes()).toContain(dotClass)
  })

  it('does not render dot when dot prop is false', () => {
    const wrapper = mount(Badge, {
      slots: { default: 'Label' }
    })
    expect(wrapper.find('.rounded-full').exists()).toBe(false)
  })

  it('shows dismiss button when dismissible is true', () => {
    const wrapper = mount(Badge, {
      props: { dismissible: true },
      slots: { default: 'Label' }
    })
    expect(wrapper.find('button').exists()).toBe(true)
  })

  it('emits dismiss on dismiss button click', async () => {
    const wrapper = mount(Badge, {
      props: { dismissible: true },
      slots: { default: 'Label' }
    })
    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted('dismiss')).toHaveLength(1)
  })

  it('does not render dismiss button when dismissible is false', () => {
    const wrapper = mount(Badge, {
      slots: { default: 'Label' }
    })
    expect(wrapper.find('button').exists()).toBe(false)
  })

  it('dismiss button has aria-label="Dismiss"', () => {
    const wrapper = mount(Badge, {
      props: { dismissible: true },
      slots: { default: 'Label' }
    })
    expect(wrapper.find('button').attributes('aria-label')).toBe('Dismiss')
  })

  it('passes axe accessibility audit', async () => {
    const wrapper = mount(Badge, {
      slots: { default: 'Status' }
    })
    await expectAccessible(wrapper)
  })
})
