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

import { render, screen } from "@testing-library/react";
import AutoNumeric from "autonumeric";
import { AutoNumericInput } from "../lib/AutoNumericInput";
import { useState } from "react";
import { userEvent } from "@testing-library/user-event";

function ControlledAutoNumericInputWrapper({
  inputProps,
  autoNumericOptions,
}: {
  inputProps?: Parameters<typeof AutoNumericInput>[0]["inputProps"];
  autoNumericOptions?: Parameters<
    typeof AutoNumericInput
  >[0]["autoNumericOptions"];
}): JSX.Element {
  const [state, setState] = useState("");
  return (
    <AutoNumericInput
      inputProps={inputProps}
      autoNumericOptions={autoNumericOptions}
      valueState={state}
      valueStateSetter={setState}
    />
  );
}

for (const testCase of [
  { name: "AutoNumericInput", Component: AutoNumericInput },
  {
    name: "ControlledAutoNumericInputWrapper",
    Component: ControlledAutoNumericInputWrapper,
  },
] as const) {
  test(`No argument given to ${testCase.name}, format based on default`, async () => {
    const user = userEvent.setup();
    render(<testCase.Component />);

    const inputElement = screen.getByRole("textbox");
    await user.type(inputElement, "1111");
    expect(inputElement).toHaveDisplayValue("1,111");
  });

  test(`When ${testCase.name} onChange event registered, it is respected`, async () => {
    let counter = 0;

    const user = userEvent.setup();
    render(
      <testCase.Component
        inputProps={{
          onChange: () => {
            counter += 1;
          },
        }}
      />,
    );

    const inputElement = screen.getByRole("textbox");
    await user.type(inputElement, "1111");
    expect(counter).toBe(4);
  });

  test(`When Autonumeric options are given, they are respected in ${testCase.name}`, async () => {
    const user = userEvent.setup();
    render(
      <testCase.Component
        autoNumericOptions={AutoNumeric.getPredefinedOptions().NorthAmerican}
      />,
    );

    const inputElement = screen.getByRole("textbox");
    await user.type(inputElement, "1111");
    expect(inputElement).toHaveDisplayValue("$1,111");
  });
}

test("Controlled AutoNumericInput changes the input state", async () => {
  function ControlledAutoNumericInputWrapperWithState({
    stateParent,
  }: {
    stateParent: { state: string };
  }): JSX.Element {
    const [state, setState] = useState("");
    stateParent.state = state;
    return <AutoNumericInput valueState={state} valueStateSetter={setState} />;
  }

  const stateParent = { state: "" };
  const user = userEvent.setup();
  render(
    <ControlledAutoNumericInputWrapperWithState stateParent={stateParent} />,
  );

  const inputElement = screen.getByRole("textbox");
  await user.type(inputElement, "1111");
  expect(stateParent.state).toBe("1,111");
});

test("ControlledAutoNumericInput changes the input state", async () => {
  function ControlledAutoNumericInputWrapperWithState({
    stateParent,
  }: {
    stateParent: { state: string };
  }): JSX.Element {
    const [state, setState] = useState("");
    stateParent.state = state;
    return <AutoNumericInput valueState={state} valueStateSetter={setState} />;
  }

  const stateParent = { state: "" };
  const user = userEvent.setup();
  render(
    <ControlledAutoNumericInputWrapperWithState stateParent={stateParent} />,
  );

  const inputElement = screen.getByRole("textbox");
  await user.type(inputElement, "1111");
  expect(stateParent.state).toBe("1,111");
});

test("Changing the input state of AutoNumericInput changes the display value", async () => {
  function TestApp(): JSX.Element {
    const [state, setState] = useState("");
    return (
      <>
        <button
          onClick={() => {
            setState("1111");
          }}
        />
        <AutoNumericInput valueState={state} valueStateSetter={setState} />
      </>
    );
  }

  const user = userEvent.setup();
  render(<TestApp />);

  const inputElement = screen.getByRole("textbox");
  expect(inputElement).toHaveDisplayValue(""); // Ensure that initially there's no text.
  await user.click(screen.getByRole("button")); // Set the state.
  expect(inputElement).toHaveDisplayValue("1,111.00");
});
