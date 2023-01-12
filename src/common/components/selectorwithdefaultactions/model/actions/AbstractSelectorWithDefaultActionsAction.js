// @flow

import { AbstractAction } from 'oo-redux-utils';
import type { SelectorWithDefaultActionsState } from '../state/SelectorWithDefaultActionsState';
import type { SelectorWithDefaultActionsStateNamespace } from '../state/namespace/SelectorWithDefaultActionsStateNamespace';

export default class AbstractSelectorWithDefaultActionsAction extends AbstractAction<
  SelectorWithDefaultActionsState,
  SelectorWithDefaultActionsStateNamespace
> {}
