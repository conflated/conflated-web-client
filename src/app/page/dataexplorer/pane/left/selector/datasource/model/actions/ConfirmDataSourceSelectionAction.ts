import type { DataSourceSelectorState } from '../state/DataSourceSelectorState';
import AbstractDataSourceSelectorAction from './AbstractDataSourceSelectorAction';
import { DataSource } from '../../../../../../../../common/components/chartarea/chart/model/state/datasource/DataSource';
import ChangeDataSourceForSelectedChartAction from '../../../../../../../../common/components/chartarea/model/actions/chart/ChangeDataSourceForSelectedChartAction';
import StartFetchDimensionsAction from '../../../dimension/model/actions/StartFetchDimensionsAction';
import diContainer from '../../../../../../../../../di/diContainer';
import StartFetchMeasuresAction from '../../../measure/model/actions/StartFetchMeasuresAction';
import { Chart } from '../../../../../../../../common/components/chartarea/chart/model/state/Chart';

export default class ConfirmDataSourceSelectionAction extends AbstractDataSourceSelectorAction {
  constructor(private readonly dataSource: DataSource | null, private readonly selectedChart: Chart) {
    super();
  }

  perform(currentState: DataSourceSelectorState): DataSourceSelectorState {
    if (this.dataSource) {
      this.dispatch(new ChangeDataSourceForSelectedChartAction('dataExplorerPage', this.dataSource));
      this.dispatchWithDi(StartFetchDimensionsAction, diContainer, { selectedChart: this.selectedChart });
      this.dispatchWithDi(StartFetchMeasuresAction, diContainer, { selectedChart: this.selectedChart });

      return {
        ...currentState,
        selectedDataSourceToConfirm: null,
        isDataSourceChangeConfirmationShown: false
      };
    }

    return currentState;
  }
}
