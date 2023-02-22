import { AbstractCompositeAction, createActionDispatcher } from 'oo-redux-utils2';
import type { DataSourceSelectorState } from '../state/DataSourceSelectorState';
import store from '../../../../../../../store/store';

export default abstract class AbstractDataSourceSelectorAction extends AbstractCompositeAction<DataSourceSelectorState> {
  constructor() {
    super('', createActionDispatcher(store.dispatch));
  }
}
