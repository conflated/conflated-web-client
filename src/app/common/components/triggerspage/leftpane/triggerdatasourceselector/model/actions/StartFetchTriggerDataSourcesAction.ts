import { Inject } from 'noicejs';
import AbstractTriggerDataSourceSelectorAction from './AbstractTriggerDataSourceSelectorAction';
import AlertDataSourceService from '../service/AlertDataSourceService';
import type { TriggerDataSourceSelectorState } from '../state/TriggerDataSourceSelectorState';
import type { TriggersPageStateNamespace } from '../../../../model/state/TriggersPageStateNamespace';
import type { DataSource } from '../../../../../../model/state/datasource/DataSource';

class FinishFetchTriggerDataSourcesAction extends AbstractTriggerDataSourceSelectorAction {
  alertDataSources: DataSource[];

  constructor(stateNamespace: TriggersPageStateNamespace, alertDataSources: DataSource[]) {
    super(stateNamespace);
    this.alertDataSources = alertDataSources;
  }

  perform(currentState: TriggerDataSourceSelectorState): TriggerDataSourceSelectorState {
    return {
      ...currentState,
      dataSources: this.alertDataSources,
      isFetchingDataSources: false
    };
  }
}

type ConstructorArgs = {
  alertDataSourceService: AlertDataSourceService;
  stateNamespace: TriggersPageStateNamespace;
};

Inject('alertDataSourceService');
class StartFetchTriggerDataSourcesAction extends AbstractTriggerDataSourceSelectorAction {
  private readonly alertDataSourceService: AlertDataSourceService;

  constructor({ alertDataSourceService, stateNamespace }: ConstructorArgs) {
    super(stateNamespace);
    this.alertDataSourceService = alertDataSourceService;
  }

  perform(currentState: TriggerDataSourceSelectorState): TriggerDataSourceSelectorState {
    this.alertDataSourceService
      .fetchDataSources()
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
