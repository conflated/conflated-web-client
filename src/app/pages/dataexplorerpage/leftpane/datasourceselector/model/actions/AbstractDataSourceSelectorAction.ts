import { AbstractAction } from 'oo-redux-utils';
import type { DataSourceSelectorState } from '../state/DataSourceSelectorState';

export default class AbstractDataSourceSelectorAction extends AbstractAction<DataSourceSelectorState> {
  constructor() {
    super('');
  }
}
