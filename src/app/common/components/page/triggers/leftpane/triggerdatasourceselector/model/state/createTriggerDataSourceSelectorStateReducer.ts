import OOReduxUtils from 'oo-redux-utils2';
import type { TriggerDataSourceSelectorState } from './TriggerDataSourceSelectorState';
import AbstractTriggerDataSourceSelectorAction from '../actions/AbstractTriggerDataSourceSelectorAction';
import type { TriggersPageStateNamespace } from '../../../../model/state/TriggersPageStateNamespace';
import emptyDataSource from '../../../../../../chartarea/chart/model/state/datasource/emptyDataSource';

const initialAlertDataSourceSelectorState: TriggerDataSourceSelectorState = {
  selectedDataSources: [emptyDataSource],
  dataSources: [],
  isFetchingDataSources: false
};

export default (stateNamespace: TriggersPageStateNamespace) =>
  OOReduxUtils.createNamespacedStateReducer<TriggerDataSourceSelectorState, TriggersPageStateNamespace>(
    initialAlertDataSourceSelectorState,
    AbstractTriggerDataSourceSelectorAction,
    stateNamespace
  );
