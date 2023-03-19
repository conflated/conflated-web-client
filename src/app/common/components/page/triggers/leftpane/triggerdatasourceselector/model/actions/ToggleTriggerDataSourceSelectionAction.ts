import _ from 'lodash';
import AbstractTriggerDataSourceSelectorAction from './AbstractTriggerDataSourceSelectorAction';
import type { TriggerDataSourceSelectorState } from '../state/TriggerDataSourceSelectorState';
import type { TriggersPageStateNamespace } from '../../../../model/state/TriggersPageStateNamespace';
import type { DataSource } from '../../../../../../chartarea/chart/model/state/datasource/DataSource';

export default class ToggleTriggerDataSourceSelectionAction extends AbstractTriggerDataSourceSelectorAction {
  constructor(stateNamespace: TriggersPageStateNamespace, private readonly dataSource: DataSource) {
    super(stateNamespace);
  }

  perform(currentState: TriggerDataSourceSelectorState): TriggerDataSourceSelectorState {
    const { selectedDataSources } = currentState;
    let newState;

    if (selectedDataSources.includes(this.dataSource)) {
      newState = {
        ...currentState,
        selectedDataSources: _.without(selectedDataSources, this.dataSource)
      };
    } else {
      newState = {
        ...currentState,
        selectedDataSources: [...selectedDataSources, this.dataSource]
      };
    }

    return newState;
  }
}
