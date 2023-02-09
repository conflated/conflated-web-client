import { AbstractAction } from 'oo-redux-utils2';
import type { SortBySelectorState } from '../state/SortBySelectorState';
import type { SortBySelectorPageStateNamespace } from '../state/types/SortBySelectorPageStateNamespace';

export default abstract class AbstractSortBySelectorAction extends AbstractAction<
  SortBySelectorState,
  SortBySelectorPageStateNamespace
> {}
