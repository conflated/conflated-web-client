import { AbstractDispatchingAction, createActionDispatcher } from 'oo-redux-utils2';
import type { DataSourceSelectorState } from '../state/DataSourceSelectorState';
import store from '../../../../../../../store/store';

export default abstract class AbstractDataSourceSelectorAction extends AbstractDispatchingAction<DataSourceSelectorState> {
  constructor() {
    super('', createActionDispatcher(store.dispatch));
  }
}
