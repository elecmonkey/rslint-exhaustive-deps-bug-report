# rslint exhaustive-deps shorthand dependency bug

Minimal reproduction for a `react-hooks/exhaustive-deps` false positive in rslint.

`src/App.tsx` uses a component-scope value inside a `useMemo` callback through an
object shorthand property:

```tsx
const isAdmin = useAuthStore((state) => state.isAdmin);

const roles = useMemo(
  () =>
    getEffectiveRoles({
      teacherType: user?.teacherType,
      isAdmin,
    }),
  [user?.teacherType, isAdmin],
);
```

`isAdmin` is a real dependency. ESLint's official `eslint-plugin-react-hooks`
rule accepts it, while rslint currently reports it as unnecessary.

## Install

```bash
pnpm install
```

## Reproduce

```bash
pnpm run lint:eslint
```

Expected: no warnings.

```bash
pnpm run lint:rslint
```

Expected current rslint behavior: reports `isAdmin` as an unnecessary dependency.

```text
React Hook useMemo has an unnecessary dependency: 'isAdmin'.
Either exclude it or remove the dependency array.
```
