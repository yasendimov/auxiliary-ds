import { describe, it, expect } from 'vitest'
import { reactive, ref } from 'vue'
import { useButtonVariants } from '../useButtonVariants.js'

function setup(variant = 'solid', color = 'blue', disabled = false) {
  const props = reactive({ variant, color })
  const isDisabled = ref(disabled)
  const { variantClasses } = useButtonVariants(props, { isDisabled })
  return { props, isDisabled, variantClasses }
}

describe('useButtonVariants', () => {
  describe('solid variant', () => {
    it('blue solid returns bg-blue-solid text-white', () => {
      const { variantClasses } = setup('solid', 'blue')
      expect(variantClasses.value).toBe('bg-blue-solid text-white')
    })

    it('red solid returns bg-red-solid text-white', () => {
      const { variantClasses } = setup('solid', 'red')
      expect(variantClasses.value).toBe('bg-red-solid text-white')
    })
  })

  describe('soft variant', () => {
    it('blue soft returns bg-blue-ui text-blue-normal', () => {
      const { variantClasses } = setup('soft', 'blue')
      expect(variantClasses.value).toBe('bg-blue-ui text-blue-normal')
    })

    it('red soft returns bg-red-ui text-red-normal', () => {
      const { variantClasses } = setup('soft', 'red')
      expect(variantClasses.value).toBe('bg-red-ui text-red-normal')
    })
  })

  describe('surface variant', () => {
    it('blue surface contains bg-blue-subtle and border-blue-dim', () => {
      const { variantClasses } = setup('surface', 'blue')
      expect(variantClasses.value).toContain('bg-blue-subtle')
      expect(variantClasses.value).toContain('border-blue-dim')
    })

    it('red surface contains bg-red-subtle and border-red-dim', () => {
      const { variantClasses } = setup('surface', 'red')
      expect(variantClasses.value).toContain('bg-red-subtle')
      expect(variantClasses.value).toContain('border-red-dim')
    })
  })

  describe('outline variant', () => {
    it('blue outline contains border-base-normal and text-base-normal', () => {
      const { variantClasses } = setup('outline', 'blue')
      expect(variantClasses.value).toContain('border-base-normal')
      expect(variantClasses.value).toContain('text-base-normal')
    })

    it('red outline contains border-red-normal and text-red-normal', () => {
      const { variantClasses } = setup('outline', 'red')
      expect(variantClasses.value).toContain('border-red-normal')
      expect(variantClasses.value).toContain('text-red-normal')
    })
  })

  describe('ghost variant', () => {
    it('blue ghost contains bg-base-ghost and text-base-normal', () => {
      const { variantClasses } = setup('ghost', 'blue')
      expect(variantClasses.value).toContain('bg-base-ghost')
      expect(variantClasses.value).toContain('text-base-normal')
    })

    it('red ghost contains bg-red-ghost and text-red-normal', () => {
      const { variantClasses } = setup('ghost', 'red')
      expect(variantClasses.value).toContain('bg-red-ghost')
      expect(variantClasses.value).toContain('text-red-normal')
    })
  })

  describe('variant x color matrix', () => {
    it.each([
      ['solid', 'blue', 'bg-blue-solid'],
      ['solid', 'red', 'bg-red-solid'],
      ['soft', 'blue', 'bg-blue-ui'],
      ['soft', 'red', 'bg-red-ui'],
      ['surface', 'blue', 'bg-blue-subtle'],
      ['surface', 'red', 'bg-red-subtle'],
      ['outline', 'blue', 'border-base-normal'],
      ['outline', 'red', 'border-red-normal'],
      ['ghost', 'blue', 'bg-base-ghost'],
      ['ghost', 'red', 'bg-red-ghost']
    ])('%s %s contains %s', (variant, color, expected) => {
      const { variantClasses } = setup(variant, color)
      expect(variantClasses.value).toContain(expected)
    })
  })

  describe('disabled state', () => {
    it('disabled overrides all variants', () => {
      const { variantClasses } = setup('solid', 'blue', true)
      expect(variantClasses.value).toContain('cursor-not-allowed')
      expect(variantClasses.value).toContain('pointer-events-none')
      expect(variantClasses.value).toContain('opacity-disabled')
      expect(variantClasses.value).not.toContain('bg-blue-solid')
    })

    it.each([
      ['solid', 'blue'],
      ['soft', 'red'],
      ['surface', 'blue'],
      ['outline', 'red'],
      ['ghost', 'blue']
    ])('disabled overrides %s %s variant', (variant, color) => {
      const { variantClasses } = setup(variant, color, true)
      expect(variantClasses.value).toBe(
        'bg-action-disabled text-action-content-disabled opacity-disabled cursor-not-allowed pointer-events-none'
      )
    })
  })

  describe('reactivity', () => {
    it('updates when props.variant changes', () => {
      const { props, variantClasses } = setup('solid', 'blue')
      expect(variantClasses.value).toBe('bg-blue-solid text-white')
      props.variant = 'ghost'
      expect(variantClasses.value).toContain('bg-base-ghost')
      expect(variantClasses.value).toContain('text-base-normal')
    })

    it('updates when isDisabled changes from false to true', () => {
      const { isDisabled, variantClasses } = setup('solid', 'blue', false)
      expect(variantClasses.value).toBe('bg-blue-solid text-white')
      isDisabled.value = true
      expect(variantClasses.value).toContain('cursor-not-allowed')
      expect(variantClasses.value).not.toContain('bg-blue-solid')
    })
  })
})
