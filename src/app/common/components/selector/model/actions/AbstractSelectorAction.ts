import { AbstractAction } from 'oo-redux-utils2';
import type { SelectorState } from '../state/SelectorState';
import type { SelectorStateNamespace } from '../state/types/SelectorStateNamespace';

export default abstract class AbstractSelectorAction extends AbstractAction<SelectorState, SelectorStateNamespace> {}
