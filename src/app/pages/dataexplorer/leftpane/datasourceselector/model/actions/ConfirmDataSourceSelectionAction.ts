import type { DataSourceSelectorState } from '../state/DataSourceSelectorState';
import AbstractDataSourceSelectorAction from './AbstractDataSourceSelectorAction';

export default class ConfirmDataSourceSelectionAction extends AbstractDataSourceSelectorAction {
  perform(currentState: DataSourceSelectorState): DataSourceSelectorState {
    const newState = {
      ...currentState,
      selectedDataSourceToConfirm: null,
      isDataSourceChangeConfirmationShown: false
    };

    return newState;
  }
}
