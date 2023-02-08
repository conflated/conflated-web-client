import type { DispatchAction } from 'oo-redux-utils2';
import { AbstractDispatchingAction } from 'oo-redux-utils2';
import type { DataSourceSelectorState } from '../state/DataSourceSelectorState';

export default class AbstractDataSourceSelectorDispatchingAction extends AbstractDispatchingAction<DataSourceSelectorState> {
  constructor(dispatchAction: DispatchAction) {
    super('', dispatchAction);
  }
}
