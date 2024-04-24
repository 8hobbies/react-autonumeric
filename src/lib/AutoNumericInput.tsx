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

import type { ChangeEvent, ClassAttributes, InputHTMLAttributes } from "react";
import AutoNumericComponent from "./AutoNumericComponent";

type InputProps = Omit<
  InputHTMLAttributes<HTMLInputElement> & ClassAttributes<HTMLInputElement>,
  "ref"
>;

export function AutoNumericInput({
  inputProps,
  autoNumericOptions,
  valueState,
  valueStateSetter,
}:
  | {
      inputProps?: InputProps;
      autoNumericOptions?: Parameters<
        typeof AutoNumericComponent
      >[0]["autoNumericOptions"];
      valueState: string;
      valueStateSetter: React.Dispatch<React.SetStateAction<string>>;
    }
  | {
      inputProps?: InputProps;
      autoNumericOptions?: Parameters<
        typeof AutoNumericComponent
      >[0]["autoNumericOptions"];
      valueState?: undefined;
      valueStateSetter?: undefined;
    }): JSX.Element {
  const stateProps =
    valueState !== undefined
      ? {
          value: valueState,
          onChange: (e: ChangeEvent<HTMLInputElement>): void => {
            // For input, it is required set value in onChange.
            valueStateSetter(e.currentTarget.value);
            if (inputProps?.onChange !== undefined) {
              inputProps.onChange(e);
            }
          },
        }
      : {};
  return (
    <AutoNumericComponent
      element="input"
      refKey="ref"
      props={{ ...inputProps, ...stateProps }}
      autoNumericOptions={autoNumericOptions}
      state={valueState}
    />
  );
}
