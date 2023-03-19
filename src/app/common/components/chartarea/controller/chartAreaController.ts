import OOReduxUtils, { Controller } from 'oo-redux-utils2';
import type { Chart } from '../chart/model/state/Chart';
import CopyChartAction from '../model/actions/chart/copypaste/CopyChartAction';
import PasteChartAction from '../model/actions/chart/copypaste/PasteChartAction';
import ClearChartAction from '../model/actions/chart/ClearChartAction';
import ChangeChartAreaLayoutAndStorePreviousLayoutAction from '../model/actions/layout/ChangeChartAreaLayoutAndStorePreviousLayoutAction';
import EnterChartAreaWithDraggedChartAction from '../model/actions/layout/EnterChartAreaWithDraggedChartAction';
import LeaveChartAreaWithDraggedChartAction from '../model/actions/layout/LeaveChartAreaWithDraggedChartAction';
import type { ChartAreaStateNamespace } from '../model/state/types/ChartAreaStateNamespace';
import type { Layout } from '../model/state/types/Layout';
import type { ChartType } from '../chart/model/state/types/ChartType';
import DropChartAction from '../model/actions/chart/DropChartAction';
import type { DragType } from '../../../../header/model/state/types/DragType';
import ShowDeleteChartConfirmationInChartMenuAction from '../model/actions/chart/menu/confirm/ShowDeleteChartConfirmationInChartMenuAction';
import store from '../../../../../store/store';
import { AppState } from '../../../../../store/AppState';
import { OwnProps } from '../view/ChartAreaView';
import SelectChartAction from '../model/actions/chart/SelectChartAction';

class ChartAreaController extends Controller<ChartAreaStateNamespace> {
  getState(appState: AppState, { stateNamespace }: OwnProps) {
    return OOReduxUtils.mergeOwnAndForeignState(appState[stateNamespace].chartAreaState, {
      isLayoutLocked: appState.dataExplorerPage.layoutSelectorState.isLayoutLocked,
      lastDragType: appState.headerState.lastDragType
    });
  }

  getActionDispatchers = (stateNamespace: ChartAreaStateNamespace) => ({
    selectChart: (chart: Chart) => this.dispatch(new SelectChartAction(stateNamespace, chart)),
    dropChart: (chartType: ChartType) => this.dispatch(new DropChartAction(stateNamespace, chartType)),
    leaveChartAreaWithDraggedChart: () => this.dispatch(new LeaveChartAreaWithDraggedChartAction(stateNamespace)),
    copyChart: (chart: Chart) => this.dispatch(new CopyChartAction(stateNamespace, chart)),
    pasteChart: (chart: Chart) => this.dispatch(new PasteChartAction(stateNamespace, chart)),
    clearChart: (chart: Chart) => this.dispatch(new ClearChartAction(stateNamespace, chart)),

    changeLayout: (layout: Layout) =>
      this.dispatch(new ChangeChartAreaLayoutAndStorePreviousLayoutAction(stateNamespace, layout)),

    enterChartAreaWithDraggedChart: (dragType: DragType) =>
      this.dispatch(new EnterChartAreaWithDraggedChartAction(stateNamespace, dragType)),

    confirmDeleteChart: (chart: Chart) =>
      this.dispatch(new ShowDeleteChartConfirmationInChartMenuAction(stateNamespace, chart))
  });
}

export const controller = new ChartAreaController(store.dispatch);
export type State = ReturnType<typeof controller.getState>;
export type ActionDispatchers = ReturnType<typeof controller.getActionDispatchers>;
