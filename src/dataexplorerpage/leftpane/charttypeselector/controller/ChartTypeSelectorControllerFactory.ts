import { ControllerFactory } from 'oo-redux-utils';
import NotifyDragStartAction from '../../../../header/model/actions/NotifyDragStartAction';
import type { ChartType } from '../../../../common/components/chartarea/chart/model/state/types/ChartType';
import ChangeChartTypeForSelectedChartAction from '../../../../common/components/chartarea/model/actions/chart/selected/change/charttype/ChangeChartTypeForSelectedChartAction';

export default class ChartTypeSelectorControllerFactory extends ControllerFactory {
  createController() {
    return {
      selectChartType: (chartType: ChartType) =>
        this.dispatchAction(new ChangeChartTypeForSelectedChartAction('dataExplorerPage', chartType)),

      notifyDragStart: () => this.dispatchAction(new NotifyDragStartAction('chartType')),
      notifyDragEnd: () => this.dispatchAction(new NotifyDragStartAction(''))
    };
  }
}
