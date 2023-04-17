import OOReduxUtils, { Controller } from 'oo-redux-utils2';
import type { Chart } from '../chart/model/state/Chart';
import CopyChartAction from '../model/actions/chart/copypaste/CopyChartAction';
import PasteChartAction from '../model/actions/chart/copypaste/PasteChartAction';
import ClearChartAction from '../model/actions/chart/ClearChartAction';
import ChangeChartAreaLayoutAndStorePreviousLayoutAction from '../model/actions/layout/ChangeChartAreaLayoutAndStorePreviousLayoutAction';
import type { ChartAreaStateNamespace } from '../model/state/types/ChartAreaStateNamespace';
import DropChartAction from '../model/actions/chart/DropChartAction';
import ShowDeleteChartConfirmationInChartMenuAction from '../model/actions/chart/menu/confirm/ShowDeleteChartConfirmationInChartMenuAction';
import store from '../../../../../store/store';
import { AppState } from '../../../../../store/AppState';
import { OwnProps } from '../view/ChartAreaView';
import SelectChartAction from '../model/actions/chart/SelectChartAction';
import { ChartType } from '../chart/model/state/types/ChartType';
import { GridItem } from '../model/state/types/GridItem';

class ChartAreaController extends Controller<ChartAreaStateNamespace> {
  getState(appState: AppState, { stateNamespace }: OwnProps) {
    return OOReduxUtils.mergeOwnAndForeignState(appState[stateNamespace].chartAreaState, {
      isLayoutLocked: appState.dataExplorerPage.layoutSelectorState.isLayoutLocked,
      lastDragType: appState.headerState.lastDragType
    });
  }

  getActionDispatchers = (stateNamespace: ChartAreaStateNamespace) => ({
    select: (chart: Chart) => this.dispatch(new SelectChartAction(stateNamespace, chart)),
    copy: (chart: Chart) => this.dispatch(new CopyChartAction(stateNamespace, chart)),
    paste: (chart: Chart) => this.dispatch(new PasteChartAction(stateNamespace, chart)),
    clear: (chart: Chart) => this.dispatch(new ClearChartAction(stateNamespace, chart)),

    dropChart: (newLayout: GridItem[], chartType: ChartType) =>
      this.dispatch(new DropChartAction(stateNamespace, newLayout, chartType)),

    change: (layout: GridItem[]) =>
      this.dispatch(new ChangeChartAreaLayoutAndStorePreviousLayoutAction(stateNamespace, layout)),

    confirmDelete: (chart: Chart) =>
      this.dispatch(new ShowDeleteChartConfirmationInChartMenuAction(stateNamespace, chart))
  });
}

export const controller = new ChartAreaController(store.dispatch);
export type State = ReturnType<typeof controller.getState>;
export type ActionDispatchers = ReturnType<typeof controller.getActionDispatchers>;
