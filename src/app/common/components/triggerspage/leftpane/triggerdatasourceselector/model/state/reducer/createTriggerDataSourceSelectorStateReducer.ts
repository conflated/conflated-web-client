import OOReduxUtils from 'oo-redux-utils2';
import type { TriggerDataSourceSelectorState } from '../TriggerDataSourceSelectorState';
import AbstractTriggerDataSourceSelectorAction from '../../actions/AbstractTriggerDataSourceSelectorAction';
import type { TriggersPageStateNamespace } from '../../../../../model/state/namespace/TriggersPageStateNamespace';
import emptyDataSource from '../../../../../../../model/state/datasource/emptyDataSource';

const initialAlertDataSourceSelectorState: TriggerDataSourceSelectorState = {
  selectedDataSources: [emptyDataSource],
  dataSources: [],
  isFetchingDataSources: false
};

export default (stateNamespace: TriggersPageStateNamespace) =>
  OOReduxUtils.createNamespacedStateReducer<TriggerDataSourceSelectorState, TriggersPageStateNamespace>(
    initialAlertDataSourceSelectorState,
    [AbstractTriggerDataSourceSelectorAction, undefined],
    stateNamespace
  );
