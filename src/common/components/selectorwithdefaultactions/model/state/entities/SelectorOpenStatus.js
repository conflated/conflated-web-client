// @flow

import type { SelectorStateNamespace } from '../../../../selector/model/state/namespace/SelectorStateNamespace';

export type SelectorOpenStatus = $Exact<{
  +isOpen: boolean,
  +stateNamespace: SelectorStateNamespace
}>;
