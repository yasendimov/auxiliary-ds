import { ref } from 'vue'

export function useFloating() {
  return {
    floatingStyles: ref({ position: 'absolute', top: '0', left: '0' }),
    placement: ref('bottom'),
    x: ref(0),
    y: ref(0),
    strategy: ref('absolute'),
    middlewareData: ref({}),
    isPositioned: ref(true),
    update: () => {}
  }
}

export const offset = () => ({})
export const flip = () => ({})
export const shift = () => ({})
export const size = () => ({})
export const autoUpdate = () => () => {}
