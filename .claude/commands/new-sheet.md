Create a new bottom sheet following the project's BottomSheet architecture.

Arguments: $ARGUMENTS
(Expected: <SheetName> [description of props, e.g. "charterDetails – charterId: number, title: string"])

---

## Architecture overview

The project uses `@gorhom/bottom-sheet` v5 with a typed registry + global provider pattern.

**Files involved:**

| File | Role |
|------|------|
| `src/bottom-sheet/registry.ts` | Maps sheet names → component types. Both `SheetRegistry` type and `sheetRegistry` value must be updated here. |
| `src/bottom-sheet/BottomSheetProvider.tsx` | Hosts the stack of open sheets and exposes `useBottomSheet()` with `present / dismiss / dismissAll`. |
| `src/bottom-sheet/SheetSlot.tsx` | Renders each `BottomSheetModal`. Uses `enableDynamicSizing` + `maxDynamicContentSize={height * 0.92}` so sheets never exceed 92% screen height. |

Sheet content components live in `src/components/molecules/<SheetName>/index.tsx` — they are regular React components; the bottom-sheet infrastructure is separate.

**How `present` is typed:**
```ts
const { present } = useBottomSheet()
present('sheetName', { /* props enforced by SheetRegistry */ })
```
TypeScript derives the allowed prop shape from `SheetRegistry`, so adding a new sheet automatically gives callers correct autocomplete and error checking.

---

## Steps to create the new sheet

### 1. Sheet content component

Create `src/components/molecules/<SheetName>/index.tsx`.

Rules:
- Use `BottomSheetScrollView` from `@gorhom/bottom-sheet` as the root element (handles sheet gesture conflicts correctly).
- Add safe-area bottom padding: `useSafeAreaInsets()` from `react-native-safe-area-context`, then `paddingBottom: Math.max(bottom, 16) + 16` on the scroll view's `contentContainerStyle`.
- Export the component as default and the props interface as a named export: `export type { <SheetName>Props }`.

Example skeleton:
```tsx
import { BottomSheetScrollView } from '@gorhom/bottom-sheet'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { StyleSheet, View } from 'react-native'
import Typography from '@/components/atoms/Typography'

interface <SheetName>Props {
  // props here
}

const <SheetName> = (props: <SheetName>Props) => {
  const { bottom } = useSafeAreaInsets()
  return (
    <BottomSheetScrollView contentContainerStyle={[styles.content, { paddingBottom: Math.max(bottom, 16) + 16 }]}>
      {/* content */}
    </BottomSheetScrollView>
  )
}

const styles = StyleSheet.create({
  content: { paddingHorizontal: 20, paddingTop: 8 },
})

export default <SheetName>
export type { <SheetName>Props }
```

### 2. Register the sheet

In `src/bottom-sheet/registry.ts`, add to **both** the type map and the value map:

```ts
import <SheetName> from '@/components/molecules/<SheetName>'
import type { <SheetName>Props } from '@/components/molecules/<SheetName>'

export type SheetRegistry = {
  // existing entries...
  camelCaseName: React.ComponentType<<SheetName>Props>
}

export const sheetRegistry = {
  // existing entries...
  camelCaseName: <SheetName>,
}
```

### 3. Wire up a trigger (if requested)

Call `present` from any component inside `<BottomSheetProvider>`:
```ts
const { present } = useBottomSheet()
present('camelCaseName', { /* typed props */ })
```

### 4. Type-check

Run `npx tsc --noEmit` and confirm zero errors before finishing.

---

Now implement the sheet described in the arguments above. If no specific props were given, infer reasonable ones from the sheet name and ask if anything is unclear.
