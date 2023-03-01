import OOReduxUtils, { Controller } from 'oo-redux-utils2';
import type { Chart } from '../chart/model/state/Chart';
import CopyChartAction from '../model/actions/chart/copypaste/CopyChartAction';
import PasteChartAction from '../model/actions/chart/copypaste/PasteChartAction';
import ClearChartAction from '../model/actions/chart/ClearChartAction';
import ChangeChartAreaLayoutAndStorePreviousLayoutAction from '../model/actions/layout/ChangeChartAreaLayoutAndStorePreviousLayoutAction';
import EnterChartAreaWithDraggedChartAction from '../model/actions/layout/EnterChartAreaWithDraggedChartAction';
import LeaveChartAreaWithDraggedChartAction from '../model/actions/layout/LeaveChartAreaWithDraggedChartAction';
import type { ChartAreaPageStateNamespace } from '../model/state/types/ChartAreaPageStateNamespace';
import type { Layout } from '../model/state/types/Layout';
import type { ChartType } from '../chart/model/state/types/ChartType';
import DropChartAction from '../model/actions/chart/DropChartAction';
import type { DragType } from '../../../../header/model/state/types/DragType';
import ShowDeleteChartConfirmationInChartMenuAction from '../model/actions/chart/menu/confirm/ShowDeleteChartConfirmationInChartMenuAction';
import store from '../../../../../store/store';
import { AppState } from '../../../../../store/AppState';
import { OwnProps } from '../view/ChartAreaView';
import SelectChartAction from '../model/actions/chart/SelectChartAction';

class ChartAreaController extends Controller<ChartAreaPageStateNamespace> {
  getState(appState: AppState, { pageStateNamespace }: OwnProps) {
    return OOReduxUtils.mergeOwnAndForeignState(appState[pageStateNamespace].chartAreaState, {
      isLayoutLocked: appState.dataExplorerPage.layoutSelectorState.isLayoutLocked,
      lastDragType: appState.headerState.lastDragType
    });
  }

  getActionDispatchers = (pageStateNamespace: ChartAreaPageStateNamespace) => ({
    selectChart: (chart: Chart) => this.dispatch(new SelectChartAction(pageStateNamespace, chart)),
    dropChart: (chartType: ChartType) => this.dispatch(new DropChartAction(pageStateNamespace, chartType)),
    leaveChartAreaWithDraggedChart: () => this.dispatch(new LeaveChartAreaWithDraggedChartAction(pageStateNamespace)),
    copyChart: (chart: Chart) => this.dispatch(new CopyChartAction(pageStateNamespace, chart)),
    pasteChart: (chart: Chart) => this.dispatch(new PasteChartAction(pageStateNamespace, chart)),
    clearChart: (chart: Chart) => this.dispatch(new ClearChartAction(pageStateNamespace, chart)),

    changeLayout: (layout: Layout) =>
      this.dispatch(new ChangeChartAreaLayoutAndStorePreviousLayoutAction(pageStateNamespace, layout)),

    enterChartAreaWithDraggedChart: (dragType: DragType) =>
      this.dispatch(new EnterChartAreaWithDraggedChartAction(pageStateNamespace, dragType)),

    confirmDeleteChart: (chart: Chart) =>
      this.dispatch(new ShowDeleteChartConfirmationInChartMenuAction(pageStateNamespace, chart))
  });
}

export const controller = new ChartAreaController(store.dispatch);
export type State = ReturnType<typeof controller.getState>;
export type ActionDispatchers = ReturnType<typeof controller.getActionDispatchers>;
