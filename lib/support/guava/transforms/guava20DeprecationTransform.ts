/*
 * Copyright © 2019 Atomist, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
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

import {
    anySatisfied,
    AutofixRegistration,
    CodeTransform,
} from "@atomist/sdm";
import {
    IsGradle,
    IsMaven,
} from "@atomist/sdm-pack-spring";
import { createRefactoringKotlinScriptTransform } from "./baseTransforms";

export const Guava20DeprecationTransform: CodeTransform = async (p, papi) => {
    const script = `
val transformers = listOf()
ExecuteTransformCommand(transformers).main(args)
    `;
    await (await createRefactoringKotlinScriptTransform(script))(p, papi);
    return p;
};

export const Guava20DeprecationAutofix: AutofixRegistration = {
    name: "guava-20-deprecation-transform",
    pushTest: anySatisfied(IsMaven, IsGradle),
    transform: Guava20DeprecationTransform,
};
