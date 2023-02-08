import NotifyDragStartAction from '../../../../header/model/actions/NotifyDragStartAction';
import type { ChartType } from '../../../../common/components/chartarea/chart/model/state/types/ChartType';
import ChangeChartTypeForSelectedChartAction from '../../../../common/components/chartarea/model/actions/chart/selected/change/charttype/ChangeChartTypeForSelectedChartAction';
import Controller from '../../../../../Controller';
import { ChartAreaPageStateNamespace } from '../../../../common/components/chartarea/model/state/types/ChartAreaPageStateNamespace';
import { AppState } from '../../../../../store/AppState';
import store from '../../../../../store/store';

export default class ChartTypeSelectorController extends Controller<ChartAreaPageStateNamespace | ''> {
  getState(appState: AppState) {
    return {
      selectedChart: appState.dataExplorerPage.chartAreaState.selectedChart
    };
  }

  getActionDispatchers() {
    return {
      selectChartType: (chartType: ChartType) =>
        this.dispatch(new ChangeChartTypeForSelectedChartAction('dataExplorerPage', chartType)),

      notifyDragStart: () => this.dispatch(new NotifyDragStartAction('chartType')),
      notifyDragEnd: () => this.dispatch(new NotifyDragStartAction(''))
    };
  }
}

export const controller = new ChartTypeSelectorController(store.dispatch);
export type State = ReturnType<typeof controller.getState>;
export type ActionDispatchers = ReturnType<typeof controller.getActionDispatchers>;
