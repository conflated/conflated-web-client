import type { DispatchAction } from 'oo-redux-utils';
import { AbstractDispatchingAction } from 'oo-redux-utils';
import type { DataSourceSelectorState } from '../state/DataSourceSelectorState';

export default class AbstractDataSourceSelectorDispatchingAction extends AbstractDispatchingAction<DataSourceSelectorState> {
  constructor(dispatchAction: DispatchAction) {
    super('', dispatchAction);
  }
}
