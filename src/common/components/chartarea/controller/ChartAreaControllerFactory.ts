import { NamespacedControllerFactory } from 'oo-redux-utils';
import type { Chart } from '../chart/model/state/Chart';
import CopyChartAction from '../model/actions/chart/copypaste/CopyChartAction';
import PasteChartAction from '../model/actions/chart/copypaste/PasteChartAction';
import ClearChartAction from '../model/actions/chart/ClearChartAction';
import ChangeChartAreaLayoutAndStorePreviousLayoutAction from '../model/actions/layout/ChangeChartAreaLayoutAndStorePreviousLayoutAction';
import EnterChartAreaWithDraggedChartAction from '../model/actions/layout/EnterChartAreaWithDraggedChartAction';
import LeaveChartAreaWithDraggedChartAction from '../model/actions/layout/LeaveChartAreaWithDraggedChartAction';
import type { ChartAreaPageStateNamespace } from '../model/state/namespace/ChartAreaPageStateNamespace';
import type { Layout } from '../model/state/types/Layout';
import type { ChartType } from '../chart/model/state/types/ChartType';
import DropChartAction from '../model/actions/chart/DropChartAction';
import type { DragType } from '../../../../header/model/state/types/DragType';
import ShowDeleteChartConfirmationInChartMenuAction from '../model/actions/chart/menu/confirm/ShowDeleteChartConfirmationInChartMenuAction';

export default class ChartAreaControllerFactory extends NamespacedControllerFactory<ChartAreaPageStateNamespace> {
  changeLayout(layout: Layout) {
    this.dispatchAction(new ChangeChartAreaLayoutAndStorePreviousLayoutAction(this.stateNamespace, layout));
  }

  dropChart(chartType: ChartType) {
    this.dispatchAction(new DropChartAction(this.stateNamespace, chartType));
  }

  enterChartAreaWithDraggedChart(dragType: DragType) {
    this.dispatchAction(new EnterChartAreaWithDraggedChartAction(this.stateNamespace, dragType));
  }

  leaveChartAreaWithDraggedChart() {
    this.dispatchAction(new LeaveChartAreaWithDraggedChartAction(this.stateNamespace));
  }

  copyChart(chart: Chart) {
    this.dispatchAction(new CopyChartAction(this.stateNamespace, chart));
  }

  pasteChart(chart: Chart) {
    this.dispatchAction(new PasteChartAction(this.stateNamespace, chart));
  }

  clearChart(chart: Chart) {
    this.dispatchAction(new ClearChartAction(this.stateNamespace, chart));
  }

  confirmDeleteChart(chart: Chart) {
    this.dispatchAction(new ShowDeleteChartConfirmationInChartMenuAction(this.stateNamespace, chart));
  }

  createController() {
    return {
      changeLayout: this.changeLayout,
      dropChart: this.dropChart,
      enterChartAreaWithDraggedChart: this.enterChartAreaWithDraggedChart,
      leaveChartAreaWithDraggedChart: this.leaveChartAreaWithDraggedChart,
      copyChart: this.copyChart,
      pasteChart: this.pasteChart,
      clearChart: this.clearChart,
      confirmDeleteChart: this.confirmDeleteChart
    };
  }
}
