# React-AutoNumeric: [AutoNumeric][]-Powered React Components

[![npm version](https://badge.fury.io/js/react-autonumeric.svg)](https://badge.fury.io/js/react-autonumeric)
[![Pipeline](https://github.com/8hobbies/react-autonumeric/actions/workflows/runtime.yml/badge.svg)](https://github.com/8hobbies/react-autonumeric/actions/workflows/runtime.yml)
[![GitLab Mirror](https://img.shields.io/badge/GitLab-mirror-blue?logo=gitlab)](https://gitlab.com/8hobbies/react-autonumeric)
[![Demo](https://img.shields.io/badge/Demo-blue)](https://react-autonumeric.8hob.io/demo)

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

For more detailed usage, check out the {@link AutoNumericInput} in the [API References][].

### Non-Input Usage

If you would like a component other than input that is automatically formatted by AutoNumeric,
please consult {@link AutoNumericComponent} in the [API References][].

## Demo

There is a publicly available [live demo](https://react-autonumeric.8hob.io/demo).

## License

```text
Copyright 2024 8 Hobbies, LLC <hong@8hobbies.com>

Licensed under the Apache License, Version 2.0(the "License");
you may not use files in this project except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
```

[AutoNumeric]: https://autonumeric.org/
[input component]: https://react.dev/reference/react-dom/components/input
[API References]: https://react-autonumeric.8hob.io
