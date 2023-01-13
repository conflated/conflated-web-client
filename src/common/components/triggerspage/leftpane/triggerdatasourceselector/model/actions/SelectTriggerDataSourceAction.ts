import AbstractTriggerDataSourceSelectorAction from './AbstractTriggerDataSourceSelectorAction';
import type { TriggerDataSourceSelectorState } from '../state/TriggerDataSourceSelectorState';
import type { TriggersPageStateNamespace } from '../../../../model/state/namespace/TriggersPageStateNamespace';
import type { DataSource } from '../../../../../../model/state/datasource/DataSource';

export default class SelectTriggerDataSourceAction extends AbstractTriggerDataSourceSelectorAction {
  constructor(stateNamespace: TriggersPageStateNamespace, private readonly dataSource: DataSource) {
    super(stateNamespace);
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
