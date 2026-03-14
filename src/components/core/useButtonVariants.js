import { computed } from 'vue'

/**
 * Shared variant × color class resolution for Button and IconButton.
 */
export function useButtonVariants(props, { isDisabled }) {
  const variantClasses = computed(() => {
    if (isDisabled.value) {
      return 'bg-action-disabled text-action-content-disabled opacity-disabled cursor-not-allowed pointer-events-none'
    }

    const isRed = props.color === 'red'

    const variants = {
      solid: isRed ? 'bg-red-solid text-white' : 'bg-blue-solid text-white',

      soft: isRed ? 'bg-red-ui text-red-normal' : 'bg-blue-ui text-blue-normal',

      surface: isRed
        ? 'bg-red-subtle border border-red-dim text-red-normal'
        : 'bg-blue-subtle border border-blue-dim text-blue-normal',

      outline: isRed
        ? 'border border-red-normal text-red-normal hover:bg-red-ui'
        : 'border border-base-normal text-base-normal hover:bg-base-ui',

      ghost: isRed ? 'bg-red-ghost text-red-normal' : 'bg-base-ghost text-base-normal'
    }

    return variants[props.variant]
  })

  return { variantClasses }
}
