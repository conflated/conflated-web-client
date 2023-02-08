import { AbstractAction } from 'oo-redux-utils2';
import type { SelectorState } from '../state/SelectorState';
import type { SelectorStateNamespace } from '../state/namespace/SelectorStateNamespace';

export default class AbstractSelectorAction extends AbstractAction<SelectorState, SelectorStateNamespace> {}
