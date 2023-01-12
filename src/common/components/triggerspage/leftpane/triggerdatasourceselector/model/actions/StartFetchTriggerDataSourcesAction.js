// @flow

import { Inject } from 'noicejs';
import type { DispatchAction } from 'oo-redux-utils';
import AbstractTriggerDataSourceSelectorAction from './AbstractTriggerDataSourceSelectorAction';
import AlertDataSourceService from '../service/AlertDataSourceService';
import type { TriggerDataSourceSelectorState } from '../state/TriggerDataSourceSelectorState';
import type { TriggersPageStateNamespace } from '../../../../model/state/namespace/TriggersPageStateNamespace';
import type { DataSource } from '../../../../../../model/state/datasource/DataSource';
import AbstractTriggerDataSourceSelectorDispatchingAction from './AbstractTriggerDataSourceSelectorDispatchingAction';

type ConstructorArgs = {
  alertDataSourceService: AlertDataSourceService,
  dispatchAction: DispatchAction,
  stateNamespace: TriggersPageStateNamespace,
};

class StartFetchTriggerDataSourcesAction extends AbstractTriggerDataSourceSelectorDispatchingAction {
  +alertDataSourceService: AlertDataSourceService;

  constructor({ alertDataSourceService, dispatchAction, stateNamespace }: ConstructorArgs) {
    super(stateNamespace, dispatchAction);
    this.alertDataSourceService = alertDataSourceService;
  }

  performActionAndReturnNewState(currentState: TriggerDataSourceSelectorState): TriggerDataSourceSelectorState {
    this.alertDataSourceService
      .fetchDataSources()
      .then((dataSources: DataSource[]) =>
        this.dispatchAction(new FinishFetchTriggerDataSourcesAction(this.stateNamespace, dataSources))
      );

    return {
      ...currentState,
      isFetchingDataSources: true,
    };
  }
}

class FinishFetchTriggerDataSourcesAction extends AbstractTriggerDataSourceSelectorAction {
  alertDataSources: DataSource[];

  constructor(stateNamespace: TriggersPageStateNamespace, alertDataSources: DataSource[]) {
    super(stateNamespace);
    this.alertDataSources = alertDataSources;
  }

  performActionAndReturnNewState(currentState: TriggerDataSourceSelectorState): TriggerDataSourceSelectorState {
    return {
      ...currentState,
      dataSources: this.alertDataSources,
      isFetchingDataSources: false,
    };
  }
}

export default Inject('alertDataSourceService')(StartFetchTriggerDataSourcesAction);
