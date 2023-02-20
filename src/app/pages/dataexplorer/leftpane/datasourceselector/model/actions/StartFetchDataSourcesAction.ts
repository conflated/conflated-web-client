import { Inject } from 'noicejs';
import AbstractDataSourceSelectorAction from './AbstractDataSourceSelectorAction';
import type { DataSourceSelectorState } from '../state/DataSourceSelectorState';
import type { DataSourceService } from '../service/DataSourceService';
import type { DataSource } from '../../../../../../common/components/chartarea/chart/model/state/datasource/DataSource';

class FinishFetchDataSourcesAction extends AbstractDataSourceSelectorAction {
  constructor(private readonly dataSources: DataSource[]) {
    super();
  }

  perform(currentState: DataSourceSelectorState): DataSourceSelectorState {
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
};

@Inject('dataSourceService')
class StartFetchDataSourcesAction extends AbstractDataSourceSelectorAction {
  readonly dataSourceService: DataSourceService;

  constructor({ dataSourceService }: ConstructorArgs) {
    super();
    this.dataSourceService = dataSourceService;
  }

  perform(currentState: DataSourceSelectorState): DataSourceSelectorState {
    this.dataSourceService
      .fetchDataSources()
      .then((dataSources: DataSource[]) => this.dispatch(new FinishFetchDataSourcesAction(dataSources)));

    const newState = {
      ...currentState,
      isFetchingDataSources: true
    };

    return newState;
  }
}

export default StartFetchDataSourcesAction;
