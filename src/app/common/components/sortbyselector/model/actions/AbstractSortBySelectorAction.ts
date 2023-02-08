import { AbstractAction } from 'oo-redux-utils2';
import type { SortBySelectorState } from '../state/SortBySelectorState';
import type { SortBySelectorPageStateNamespace } from '../state/namespace/SortBySelectorPageStateNamespace';

export default class AbstractSortBySelectorAction extends AbstractAction<
  SortBySelectorState,
  SortBySelectorPageStateNamespace
> {}
