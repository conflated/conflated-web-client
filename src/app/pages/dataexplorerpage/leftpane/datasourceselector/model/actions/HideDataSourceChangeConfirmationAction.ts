import AbstractDataSourceSelectorAction from './AbstractDataSourceSelectorAction';
import type { DataSourceSelectorState } from '../state/DataSourceSelectorState';

export default class HideDataSourceChangeConfirmationAction extends AbstractDataSourceSelectorAction {
  performActionAndReturnNewState(currentState: DataSourceSelectorState): DataSourceSelectorState {
    const newState = {
      ...currentState,
      isDataSourceChangeConfirmationShown: false
    };

    return newState;
  }
}
