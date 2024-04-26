# React-AutoNumeric: React Components that Wrap [AutoNumeric][]

[AutoNumeric][] is a powerful library that automatically format numbers and currencies.
React-AutoNumeric brings that power to React.

## Install

```
npm install --save react-autonumeric
```

## Usage

### Most basic usage

```tsx
<AutoNumericInput />
```

creates an [input component][] that is automatically formatted by AutoNumeric.

### Customize the input

```tsx
<AutoNumericInput
  inputProps={{ defaultValue: "99.99" }}
  autoNumericOptions={{ suffixText: "%" }}
/>
```

### Use predefined AutoNumeric options

```tsx
<AutoNumericInput
  inputProps={{ defaultValue: "10000" }}
  autoNumericOptions={
    AutoNumeric.getPredefinedOptions().commaDecimalCharDotSeparator
  }
/>
```

### Interact with `AutoNumericInput` via a React state

```tsx
const [controlledInputState, setControlledInputState] = useState("100");

<AutoNumericInput
  valueState={{
    state: controlledInputState,
    stateSetter: setControlledInputState,
  }}
/>
<button
  onClick={() => {
    setControlledInputState(
      (Number(controlledInputState) + 1).toString(),
    );
  }}
>
  Add one
</button>
```

### API References

For more detailed usage, check out the {@link AutoNumericInput} API references.

### Non-Input Usage

If you would like a component other than input that is automatically formatted by AutoNumeric,
please consult {@link AutoNumericComponent}.

[AutoNumeric]: https://autonumeric.org/
[input component]: https://react.dev/reference/react-dom/components/input
