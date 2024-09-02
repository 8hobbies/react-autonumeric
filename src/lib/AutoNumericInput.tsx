/** @license Apache-2.0
 *
 * Copyright 2024 8 Hobbies, LLC <hong@8hobbies.com>
 *
 * Licensed under the Apache License, Version 2.0(the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import type {
  ChangeEvent,
  ClassAttributes,
  InputHTMLAttributes,
  JSX,
} from "react";
import { AutoNumericComponent } from "./AutoNumericComponent.js";
import type { CallbackOptions } from "autonumeric";

/** Same as {@link JSX!IntrinsicElements.input.props} excluding the `ref` property. */
export type InputProps = InputHTMLAttributes<HTMLInputElement> &
  ClassAttributes<HTMLInputElement> & { ref?: undefined };

/** React {@link JSX!IntrinsicElements.input} component integrated with {@link !AutoNumeric} and
 * permits interaction with a React state.
 *
 * @param options - Options of the component.
 * @param options.inputProps - Options passed to {@link JSX!IntrinsicElements.input}. Same as {@link
 * JSX!IntrinsicElements.input.props}.
 * @param options.autoNumericOptions - Options passed to {@link !AutoNumeric}. Same as {@link
 * AutoNumeric!Options}.
 * @param options.valueState - The state and state setter from the parent component to be passed
 * into this component.
 * @param options.valueState.state - The state from the parent component to be passed in.
 * @param options.valueState.stateSetter - The callback function that sets
 * `options.valueState.state`.
 * @returns The React component.
 */
export function AutoNumericInput({
  inputProps,
  autoNumericOptions,
  valueState,
}: {
  inputProps?: Readonly<InputProps>;
  autoNumericOptions?: Readonly<CallbackOptions>;
  valueState?: {
    state: Readonly<string>;
    stateSetter: React.Dispatch<React.SetStateAction<string>>;
  };
}): JSX.Element {
  const stateProps =
    valueState !== undefined
      ? ({
          value: valueState.state,
          // For input, it is required set value in onChange.
          onChange: (e: ChangeEvent<HTMLInputElement>): void => {
            valueState.stateSetter(e.currentTarget.value);
            if (inputProps?.onChange !== undefined) {
              inputProps.onChange(e);
            }
          },
          // Some autoNumeric options such as emptyInputBehavior='zero' would not function properly
          // without onBlur.
          onBlur: (e): void => {
            valueState.stateSetter(e.currentTarget.value);
            if (inputProps?.onBlur !== undefined) {
              inputProps.onBlur(e);
            }
          },
        } as const satisfies InputProps)
      : ({} as const);
  return (
    <AutoNumericComponent
      element="input"
      refKey="ref"
      props={{ ...inputProps, ...stateProps }}
      autoNumericOptions={autoNumericOptions}
      state={valueState?.state}
    />
  );
}
