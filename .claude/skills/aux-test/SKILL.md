---
name: aux-test
description: Generate a test file skeleton for an AUX component, pre-filled with the correct structure and variant matrices
user_invocable: true
---

# Generate Component Test

Create a test file for an AUX component following all testing conventions.

## Process

### Step 1: Identify Component

If the user provides a component name, resolve to `src/components/core/{Name}.vue`. Search other category folders if not found in core.

### Step 2: Read Test Infrastructure

Read these files to understand the testing patterns:
- `src/test/helpers.js` — mountWithTheme, mountWithProvider, expectAccessible
- `src/test/mocks/floating-ui.js` — mock for positioned components
- At least one existing test file (e.g., `src/components/core/__tests__/Badge.test.js`) as a pattern reference

### Step 3: Analyze Component

Read the component file and extract:
- All props (with their types, defaults, and validators)
- All emits
- Slot names (default and named)
- Whether it uses provide/inject (look for `inject()` calls or `*Key.js` imports)
- Whether it imports `@floating-ui/vue`
- Constrained props that need `it.each` matrices (variant, size, color — any prop with a validator array)

### Step 4: Generate Test File

Create `src/components/core/__tests__/{Name}.test.js` with:

1. **Imports** — `describe`, `it`, `expect` from vitest; `mount` from @vue/test-utils; the component; `expectAccessible` from helpers. If uses provide/inject: also import `mountWithProvider` and the Symbol key.

2. **Rendering tests** — default slot content renders, conditional elements appear/hide based on props

3. **Prop/variant tests** — `it.each` block for each constrained prop:
   ```js
   it.each(['solid', 'soft', 'surface', 'outline', 'ghost'])('applies %s variant classes', (variant) => {
     const wrapper = mount(Component, { props: { variant } })
     expect(wrapper.classes().join(' ')).toBeTruthy()
   })
   ```

4. **Event tests** — for each emit, trigger the action and assert `wrapper.emitted()`

5. **Keyboard tests** — if the component is interactive, test Enter, Space, Escape, Arrow keys as appropriate

6. **Accessibility test** — ALWAYS last:
   ```js
   it('passes accessibility audit', async () => {
     const wrapper = mount(Component)
     await expectAccessible(wrapper)
   })
   ```

### Step 5: Run Tests

Execute `pnpm test -- --run src/components/core/__tests__/{Name}.test.js` to verify the skeleton passes.

If tests fail, read the error output and fix the test file. Common issues:
- Component requires certain props to render (add required props to mount)
- Component requires provide context (switch to mountWithProvider)
- Accessibility violations (may indicate a real component issue — report to user)

### Step 6: Report

List the generated file path, test count, and any issues found.
