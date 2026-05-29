Create TypeScript types for the following API response. Follow this pattern:

1. **`[Name]`** — clean domain model, camelCase, proper TS types (`boolean`, `number`, etc.). Defined first, standalone.

2. **`[Name]DTO`** — extends `Omit<[Name], ...>`, omitting every field whose **name or type** differs from the wire format. Re-declares those overrides inline, then adds all DTO-only fields below them in logical groups with section comments.

3. **Shared fields** (same name + same type in both) are NOT redeclared in the DTO — they're inherited via `extends`.

4. Use `StringBool` for string-encoded booleans, `NullableStringBool` when the field can also be null. Import both from `@/types/api` — do NOT redeclare them locally. Declare any nested `interface`s (e.g. for geopoint, nested objects) at the bottom of the file.

5. All types go in a single `[name].types.ts` file. No mappers, no barrel exports — just the types.

Paste the raw JSON response below:

$ARGUMENTS
