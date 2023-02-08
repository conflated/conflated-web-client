import OOReduxUtils from 'oo-redux-utils2';
import type { DataSourceSelectorState } from '../DataSourceSelectorState';
import AbstractDataSourceSelectorAction from '../../actions/AbstractDataSourceSelectorAction';
import AbstractDataSourceSelectorDispatchingAction from '../../actions/AbstractDataSourceSelectorDispatchingAction';

const initialDataSourceSelectorState: DataSourceSelectorState = {
  dataSources: [],
  isFetchingDataSources: false,
  isDataSourceChangeConfirmationShown: false,
  selectedDataSourceToConfirm: null
};

export default OOReduxUtils.createStateReducer<DataSourceSelectorState>(initialDataSourceSelectorState, [
  AbstractDataSourceSelectorAction,
  AbstractDataSourceSelectorDispatchingAction
]);
