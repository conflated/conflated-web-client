import type { SelectorStateNamespace } from '../../../../model/state/types/SelectorStateNamespace';

export type SelectorOpenStatus = {
  readonly isOpen: boolean;
  readonly selectorStateNamespace: SelectorStateNamespace;
};
