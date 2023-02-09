import type { SelectorStateNamespace } from '../../../../selector/model/state/types/SelectorStateNamespace';

export type SelectorOpenStatus = {
  readonly isOpen: boolean;
  readonly stateNamespace: SelectorStateNamespace;
};
