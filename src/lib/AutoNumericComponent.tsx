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
import { ReactHTML, createElement, useEffect, useRef } from "react";

export default function AutoNumericComponent({
  element,
  refKey,
  props,
  autoNumericOptions,
  state,
}: {
  element: keyof ReactHTML;
  refKey: string;
  props?: Parameters<typeof createElement>[1];
  autoNumericOptions?: CallbackOptions;
  state?: NonNullable<Parameters<typeof AutoNumeric.set>[1]>;
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
  }, [htmlElement.current, autoNumericOptions]);

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
