import { Inject } from 'noicejs';
import type { DispatchAction } from 'oo-redux-utils';
import AbstractDataSourceSelectorAction from './AbstractDataSourceSelectorAction';
import type { DataSourceSelectorState } from '../state/DataSourceSelectorState';
import DataSourceService from '../service/DataSourceService';
import type { DataSource } from '../../../../../../common/model/state/datasource/DataSource';
import AbstractDataSourceSelectorDispatchingAction from './AbstractDataSourceSelectorDispatchingAction';

class FinishFetchDataSourcesAction extends AbstractDataSourceSelectorAction {
  constructor(private readonly dataSources: DataSource[]) {
    super();
  }

  performActionAndReturnNewState(currentState: DataSourceSelectorState): DataSourceSelectorState {
    const newState = {
      ...currentState,
      dataSources: this.dataSources,
      isFetchingDataSources: false
    };

    return newState;
  }
}

type ConstructorArgs = {
  dataSourceService: DataSourceService;
  dispatchAction: DispatchAction;
};

@Inject('dataSourceService')
class StartFetchDataSourcesAction extends AbstractDataSourceSelectorDispatchingAction {
  readonly dataSourceService: DataSourceService;

  constructor({ dataSourceService, dispatchAction }: ConstructorArgs) {
    super(dispatchAction);
    this.dataSourceService = dataSourceService;
  }

  performActionAndReturnNewState(currentState: DataSourceSelectorState): DataSourceSelectorState {
    this.dataSourceService
      .fetchDataSources()
      .then((dataSources: DataSource[]) => this.dispatchAction(new FinishFetchDataSourcesAction(dataSources)));

    const newState = {
      ...currentState,
      isFetchingDataSources: true
    };

    return newState;
  }
}

export default StartFetchDataSourcesAction;
