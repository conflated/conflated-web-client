import type { DataSourceSelectorState } from '../state/DataSourceSelectorState';
import AbstractDataSourceSelectorAction from './AbstractDataSourceSelectorAction';
import { DataSource } from '../../../../../../common/components/chartarea/chart/model/state/datasource/DataSource';
import ChangeDataSourceForSelectedChartAction from '../../../../../../common/components/chartarea/model/actions/chart/selected/change/datasource/ChangeDataSourceForSelectedChartAction';
import StartFetchDimensionsAction from '../../../dimensionselector/model/actions/StartFetchDimensionsAction';
import diContainer from '../../../../../../../di/diContainer';
import StartFetchMeasuresAction from '../../../measureselector/model/actions/StartFetchMeasuresAction';

export default class ConfirmDataSourceSelectionAction extends AbstractDataSourceSelectorAction {
  constructor(private readonly dataSource: DataSource | null) {
    super();
  }

  perform(currentState: DataSourceSelectorState): DataSourceSelectorState {
    if (this.dataSource) {
      this.dispatch(new ChangeDataSourceForSelectedChartAction('dataExplorerPage', this.dataSource));
      this.dispatchWithDi(StartFetchDimensionsAction, diContainer, { dataSource: this.dataSource });
      this.dispatchWithDi(StartFetchMeasuresAction, diContainer, { dataSource: this.dataSource });

      const newState = {
        ...currentState,
        selectedDataSourceToConfirm: null,
        isDataSourceChangeConfirmationShown: false
      };

      return newState;
    }

    return currentState;
  }
}
