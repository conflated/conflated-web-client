import { AbstractAction } from 'oo-redux-utils2';
import type { DataSourceSelectorState } from '../state/DataSourceSelectorState';

export default class AbstractDataSourceSelectorAction extends AbstractAction<DataSourceSelectorState> {
  constructor() {
    super('');
  }
}
