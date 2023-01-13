import type { SelectorStateNamespace } from '../../../../selector/model/state/namespace/SelectorStateNamespace';

export type SelectorOpenStatus = {
  readonly isOpen: boolean,
  readonly stateNamespace: SelectorStateNamespace
};
