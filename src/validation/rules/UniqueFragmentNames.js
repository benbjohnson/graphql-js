/* @flow */
/**
 *  Copyright (c) 2015, Facebook, Inc.
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree. An additional grant
 *  of patent rights can be found in the PATENTS file in the same directory.
 */

import type { ValidationContext } from '../index';
import { GraphQLError } from '../../error';


export function duplicateFragmentNameMessage(fragName: any): string {
  return `There can only be one fragment named "${fragName}".`;
}

/**
 * Unique fragment names
 *
 * A GraphQL document is only valid if all defined fragments have unique names.
 */
export function UniqueFragmentNames(context: ValidationContext): any {
  var knownFragmentNames = Object.create(null);
  return {
    OperationDefinition: () => false,
    FragmentDefinition(node) {
      var fragmentName = node.name.value;
      if (knownFragmentNames[fragmentName]) {
        context.reportError(new GraphQLError(
          duplicateFragmentNameMessage(fragmentName),
          [ knownFragmentNames[fragmentName], node.name ]
        ));
      } else {
        knownFragmentNames[fragmentName] = node.name;
      }
      return false;
    }
  };
}
