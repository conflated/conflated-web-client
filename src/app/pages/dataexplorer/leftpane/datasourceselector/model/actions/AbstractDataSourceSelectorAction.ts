import { AbstractDispatchingAction } from 'oo-redux-utils2';
import type { DataSourceSelectorState } from '../state/DataSourceSelectorState';
import dispatch from '../../../../../../../store/dispatch';

export default abstract class AbstractDataSourceSelectorAction extends AbstractDispatchingAction<DataSourceSelectorState> {
  constructor() {
    super('', dispatch);
  }
}
