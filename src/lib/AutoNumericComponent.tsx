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

import AutoNumeric, { CallbackOptions } from "autonumeric";
import { type JSX, createElement, useEffect, useRef } from "react";

/** The base React component integrated with {@link !AutoNumeric}.
 *
 * This component is used as a base to construct higher-level React component that integrates with
 * AutoNumeric. See {@link AutoNumericInput} for a live example. For some elements, you would also
 * need to set the
 * [`contenteditable`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/contenteditable)
 * attribute to true.
 *
 * @param options - Options of the component.
 * @param options.element - The element of the component, such as `"input"`.
 * @param options.refKey - The name of the attribute that refers the underlying DOM element. This is
 * typically [`"ref"`](https://react.dev/learn/manipulating-the-dom-with-refs).
 * @param options.props - Options passed to the underlying element `options.element`.
 * @param options.autoNumericOptions - Options passed to {@link !AutoNumeric}. Same as {@link
 * AutoNumeric!Options}.
 * @param options.state - The React state that controls and is controlled by {@link !AutoNumeric}.
 * If absent, this component will not interact with its parent via React states.
 *
 * @see [AutoNumeric: On which elements can it be
 * used?](https://docs.autonumeric.org/Documentation/on%20which%20elements%20can%20it%20be%20used/)
 */
export function AutoNumericComponent({
  element,
  refKey,
  props,
  autoNumericOptions,
  state,
}: {
  element: Parameters<typeof createElement>[0];
  refKey: Readonly<string>;
  props?: Readonly<Parameters<typeof createElement>[1]>;
  autoNumericOptions?: Readonly<CallbackOptions>;
  state?: Readonly<NonNullable<Parameters<typeof AutoNumeric.set>[1]>>;
}): JSX.Element {
  const htmlElement = useRef<HTMLElement>(null);
  const autoNumeric = useRef<AutoNumeric | null>(null);
  useEffect(() => {
    /* c8 ignore start */
    if (htmlElement.current === null) {
      // Do nothing if HTML element isn't ready.
      // This block should not be entered upon normally, because htmlElement.current is initially
      // null and this function is only called when htmlElement.current has changed. Still, having
      // this block here in case of some unusual behavior created by some customized component,
      // e.g., htmlElement.current is changed from null to something and then back to null.
      return;
    }
    /* c8 ignore end */

    if (
      autoNumeric.current !== null &&
      Object.is(autoNumeric.current.node(), htmlElement.current)
    ) {
      // Already managed by the current autoNumeric object. Do nothing.
      return;
    }

    autoNumeric.current = new AutoNumeric(
      htmlElement.current,
      autoNumericOptions ?? {},
    );
  }, [htmlElement.current]);

  if (state !== undefined) {
    useEffect(() => {
      if (autoNumeric.current === null) {
        return;
      }
      autoNumeric.current.set(state);
    }, [state]);
  }

  return createElement(element, { ...(props ?? {}), [refKey]: htmlElement });
}
