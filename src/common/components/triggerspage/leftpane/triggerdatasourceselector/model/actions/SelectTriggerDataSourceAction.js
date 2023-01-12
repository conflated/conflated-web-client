// @flow

import AbstractTriggerDataSourceSelectorAction from './AbstractTriggerDataSourceSelectorAction';
import type { TriggerDataSourceSelectorState } from '../state/TriggerDataSourceSelectorState';
import type { TriggersPageStateNamespace } from '../../../../model/state/namespace/TriggersPageStateNamespace';
import type { DataSource } from '../../../../../../model/state/datasource/DataSource';

export default class SelectTriggerDataSourceAction extends AbstractTriggerDataSourceSelectorAction {
  +dataSource: DataSource;

  constructor(stateNamespace: TriggersPageStateNamespace, dataSource: DataSource) {
    super(stateNamespace);
    this.dataSource = dataSource;
  }

  performActionAndReturnNewState(
    currentState: TriggerDataSourceSelectorState
  ): TriggerDataSourceSelectorState {
    return {
      ...currentState,
      selectedDataSources: [...currentState.selectedDataSources, this.dataSource]
    };
  }
}
