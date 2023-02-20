import { AbstractAction } from 'oo-redux-utils2';
import type { SelectorWithDefaultActionsState } from '../state/SelectorWithDefaultActionsState';
import type { SelectorWithActionsStateNamespace } from '../state/types/SelectorWithActionsStateNamespace';

export default abstract class AbstractSelectorWithActionsAction extends AbstractAction<
  SelectorWithDefaultActionsState,
  SelectorWithActionsStateNamespace
> {}
