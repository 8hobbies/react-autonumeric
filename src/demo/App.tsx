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

import AutoNumeric from "autonumeric";
import { AutoNumericInput } from "../lib/AutoNumericInput";
import { useState } from "react";

export default function App(): JSX.Element {
  const [controlledInputState, setControlledInputState] = useState("100");
  return (
    <>
      <label>
        Most basic usage
        <AutoNumericInput />
      </label>

      <hr />

      <label>
        Customize the input
        <AutoNumericInput
          inputProps={{ defaultValue: "99.99" }}
          autoNumericOptions={{ suffixText: "%" }}
        />
      </label>

      <hr />

      <label>
        Use predefined AutoNumeric options
        <AutoNumericInput
          inputProps={{ defaultValue: "10000" }}
          autoNumericOptions={
            AutoNumeric.getPredefinedOptions().commaDecimalCharDotSeparator
          }
        />
      </label>

      <hr />

      <label>
        Interact with AutoNumericInput via a React state
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
      </label>
    </>
  );
}
