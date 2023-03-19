import { Inject } from 'noicejs';
import AbstractTriggerDataSourceSelectorAction from './AbstractTriggerDataSourceSelectorAction';
import TriggerDataSourceService from '../service/TriggerDataSourceService';
import type { TriggerDataSourceSelectorState } from '../state/TriggerDataSourceSelectorState';
import type { TriggersPageStateNamespace } from '../../../../model/state/TriggersPageStateNamespace';
import type { DataSource } from '../../../../../../chartarea/chart/model/state/datasource/DataSource';

class FinishFetchTriggerDataSourcesAction extends AbstractTriggerDataSourceSelectorAction {
  triggerDataSources: DataSource[];

  constructor(stateNamespace: TriggersPageStateNamespace, triggerDataSources: DataSource[]) {
    super(stateNamespace);
    this.triggerDataSources = triggerDataSources;
  }

  perform(currentState: TriggerDataSourceSelectorState): TriggerDataSourceSelectorState {
    return {
      ...currentState,
      dataSources: this.triggerDataSources,
      isFetchingDataSources: false
    };
  }
}

type ConstructorArgs = {
  triggerDataSourceService: TriggerDataSourceService;
  stateNamespace: TriggersPageStateNamespace;
};

@Inject('triggerDataSourceService')
class StartFetchTriggerDataSourcesAction extends AbstractTriggerDataSourceSelectorAction {
  private readonly triggerDataSourceService: TriggerDataSourceService;

  constructor({ triggerDataSourceService, stateNamespace }: ConstructorArgs) {
    super(stateNamespace);
    this.triggerDataSourceService = triggerDataSourceService;
  }

  perform(currentState: TriggerDataSourceSelectorState): TriggerDataSourceSelectorState {
    this.triggerDataSourceService
      .fetchTriggerDataSources(this.stateNamespace)
      .then((dataSources: DataSource[]) =>
        this.dispatch(new FinishFetchTriggerDataSourcesAction(this.stateNamespace, dataSources))
      );

    return {
      ...currentState,
      isFetchingDataSources: true
    };
  }
}

export default StartFetchTriggerDataSourcesAction;
