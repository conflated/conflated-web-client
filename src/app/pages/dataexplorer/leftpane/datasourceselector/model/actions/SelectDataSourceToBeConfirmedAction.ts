import type { DataSourceSelectorState } from '../state/DataSourceSelectorState';
import type { DataSource } from '../../../../../../common/model/state/datasource/DataSource';
import AbstractDataSourceSelectorAction from './AbstractDataSourceSelectorAction';

export default class SelectDataSourceToBeConfirmedAction extends AbstractDataSourceSelectorAction {
  constructor(private readonly dataSource: DataSource) {
    super();
  }

  perform(currentState: DataSourceSelectorState): DataSourceSelectorState {
    const newState = {
      ...currentState,
      selectedDataSourceToConfirm: this.dataSource,
      isDataSourceChangeConfirmationShown: true
    };

    return newState;
  }
}
