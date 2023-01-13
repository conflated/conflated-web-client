import { ControllerFactory } from 'oo-redux-utils';
import StartFetchDataSourcesAction from '../model/actions/StartFetchDataSourcesAction';
import ConfirmDataSourceSelectionAction from '../model/actions/ConfirmDataSourceSelectionAction';
import HideDataSourceChangeConfirmationAction from '../model/actions/HideDataSourceChangeConfirmationAction';
import SelectDataSourceToBeConfirmedAction from '../model/actions/SelectDataSourceToBeConfirmedAction';
import diContainer from '../../../../../../di/diContainer';
import type { DataSource } from '../../../../../common/model/state/datasource/DataSource';
import ChangeDataSourceForSelectedChartAction from '../../../../../common/components/chartarea/model/actions/chart/selected/change/datasource/ChangeDataSourceForSelectedChartAction';
import StartFetchDimensionsAction from '../../dimensionselector/model/actions/StartFetchDimensionsAction';
import StartFetchMeasuresAction from '../../measureselector/model/actions/StartFetchMeasuresAction';

export default class DataSourceSelectorControllerFactory extends ControllerFactory {
  async startFetchDataSources() {
    this.dispatchActionWithDi(diContainer, StartFetchDataSourcesAction, {});
  }

  selectDataSourceToBeConfirmed(dataSource: DataSource) {
    this.dispatchAction(new SelectDataSourceToBeConfirmedAction(dataSource));
  }

  hideDataSourceChangeConfirmation() {
    this.dispatchAction(new HideDataSourceChangeConfirmationAction());
  }

  confirmDataSourceSelection(dataSource: DataSource | null) {
    if (dataSource) {
      this.dispatchAction(new ConfirmDataSourceSelectionAction());
      this.dispatchAction(new ChangeDataSourceForSelectedChartAction('dataExplorerPage', dataSource));
      this.dispatchActionWithDi(diContainer, StartFetchDimensionsAction, { dataSource });
      this.dispatchActionWithDi(diContainer, StartFetchMeasuresAction, { dataSource });
    }
  }

  createController() {
    return {
      startFetchDataSources: this.startFetchDataSources,
      selectDataSourceToBeConfirmed: this.selectDataSourceToBeConfirmed,
      hideDataSourceChangeConfirmation: this.hideDataSourceChangeConfirmation,
      confirmDataSourceSelection: this.confirmDataSourceSelection
    };
  }
}
