import { AbstractAction } from 'oo-redux-utils2';
import type { SelectorWithDefaultActionsState } from '../state/SelectorWithDefaultActionsState';
import type { SelectorWithDefaultActionsStateNamespace } from '../state/types/SelectorWithDefaultActionsStateNamespace';

export default abstract class AbstractSelectorWithDefaultActionsAction extends AbstractAction<
  SelectorWithDefaultActionsState,
  SelectorWithDefaultActionsStateNamespace
> {}
