import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useToast } from '../useToast.js'

describe('useToast', () => {
  beforeEach(() => {
    const { clear } = useToast()
    clear()
  })

  it('add() returns a numeric id', () => {
    const { add } = useToast()
    const id = add()
    expect(typeof id).toBe('number')
  })

  it('add() creates a toast in the toasts array', () => {
    const { add, toasts } = useToast()
    add({ title: 'Hello' })
    expect(toasts.value).toHaveLength(1)
    expect(toasts.value[0].title).toBe('Hello')
  })

  it('toast has correct default values', () => {
    const { add, toasts } = useToast()
    add()
    const toast = toasts.value[0]
    expect(toast.variant).toBe('info')
    expect(toast.title).toBe('')
    expect(toast.description).toBe('')
    expect(toast.dismissible).toBe(true)
  })

  it('custom options are preserved', () => {
    const { add, toasts } = useToast()
    add({ variant: 'error', title: 'Oops', description: 'Something broke' })
    const toast = toasts.value[0]
    expect(toast.variant).toBe('error')
    expect(toast.title).toBe('Oops')
    expect(toast.description).toBe('Something broke')
  })

  it('dismiss(id) removes a specific toast', () => {
    const { add, dismiss, toasts } = useToast()
    const id1 = add({ title: 'First' })
    add({ title: 'Second' })
    expect(toasts.value).toHaveLength(2)
    dismiss(id1)
    expect(toasts.value).toHaveLength(1)
    expect(toasts.value[0].title).toBe('Second')
  })

  it('dismiss() with invalid id does nothing', () => {
    const { add, dismiss, toasts } = useToast()
    add({ title: 'Only' })
    expect(toasts.value).toHaveLength(1)
    dismiss(-999)
    expect(toasts.value).toHaveLength(1)
  })

  it('clear() removes all toasts', () => {
    const { add, clear, toasts } = useToast()
    add({ title: 'One' })
    add({ title: 'Two' })
    add({ title: 'Three' })
    expect(toasts.value).toHaveLength(3)
    clear()
    expect(toasts.value).toHaveLength(0)
  })

  it('max 5 toasts — adding a 6th auto-dismisses the oldest', () => {
    const { add, toasts } = useToast()
    const ids = []
    for (let i = 0; i < 6; i++) {
      ids.push(add({ title: `Toast ${i}` }))
    }
    expect(toasts.value).toHaveLength(5)
    expect(toasts.value[0].title).toBe('Toast 1')
    expect(toasts.value[4].title).toBe('Toast 5')
  })

  it('auto-dismisses after duration', () => {
    vi.useFakeTimers()
    const { add, toasts } = useToast()
    add({ duration: 1000 })
    expect(toasts.value).toHaveLength(1)
    vi.advanceTimersByTime(1000)
    expect(toasts.value).toHaveLength(0)
    vi.useRealTimers()
  })

  it('duration: 0 does not auto-dismiss', () => {
    vi.useFakeTimers()
    const { add, toasts } = useToast()
    add({ duration: 0 })
    expect(toasts.value).toHaveLength(1)
    vi.advanceTimersByTime(10000)
    expect(toasts.value).toHaveLength(1)
    vi.useRealTimers()
  })

  it('returned ids are unique', () => {
    const { add } = useToast()
    const id1 = add()
    const id2 = add()
    const id3 = add()
    expect(id1).not.toBe(id2)
    expect(id2).not.toBe(id3)
    expect(id1).not.toBe(id3)
  })

  it('toasts is readonly', () => {
    const { add, toasts } = useToast()
    add({ title: 'test' })
    const lengthBefore = toasts.value.length
    toasts.value = []
    expect(toasts.value.length).toBe(lengthBefore)
  })
})
