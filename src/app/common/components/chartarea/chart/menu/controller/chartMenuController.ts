import { Controller } from 'oo-redux-utils2';
import type { ChartAreaStateNamespace } from '../../../model/state/types/ChartAreaStateNamespace';
import type { Chart } from '../../model/state/Chart';
import OpenChartExportMenuAction from '../../../model/actions/chart/menu/export/OpenChartExportMenuAction';
import CloseChartExportMenuAction from '../../../model/actions/chart/menu/export/CloseChartExportMenuAction';
import CopyChartAction from '../../../model/actions/chart/copypaste/CopyChartAction';
import PasteChartAction from '../../../model/actions/chart/copypaste/PasteChartAction';
import ClearChartAction from '../../../model/actions/chart/ClearChartAction';
import ShowClearChartConfirmationInChartMenuAction from '../../../model/actions/chart/menu/confirm/ShowClearChartConfirmationInChartMenuAction';
import ShowDeleteChartConfirmationInChartMenuAction from '../../../model/actions/chart/menu/confirm/ShowDeleteChartConfirmationInChartMenuAction';
import ClearOrRemoveChartAction from '../../../model/actions/chart/ClearOrRemoveChartAction';
import HideChartMenuClearOrDeleteConfirmationAction from '../../../model/actions/chart/menu/confirm/HideChartMenuClearOrDeleteConfirmationAction';
import AllowChartMenuToBeOpenedAction from '../../../model/actions/chart/menu/AllowChartMenuToBeOpenedAction';
import store from '../../../../../../../store/store';

class ChartMenuController extends Controller<ChartAreaStateNamespace> {
  getActionDispatchers = (stateNamespace: ChartAreaStateNamespace) => ({
    openExportMenu: (chart: Chart) => this.dispatch(new OpenChartExportMenuAction(stateNamespace, chart)),
    closeExportMenu: (chart: Chart) => this.dispatch(new CloseChartExportMenuAction(stateNamespace, chart)),
    copy: (chart: Chart) => this.dispatch(new CopyChartAction(stateNamespace, chart)),
    paste: (chart: Chart) => this.dispatch(new PasteChartAction(stateNamespace, chart)),
    clear: (chart: Chart) => this.dispatch(new ClearChartAction(stateNamespace, chart)),
    clearOrRemove: (chart: Chart) => this.dispatch(new ClearOrRemoveChartAction(stateNamespace, chart)),

    showClearConfirmation: (chart: Chart) =>
      this.dispatch(new ShowClearChartConfirmationInChartMenuAction(stateNamespace, chart)),

    showDeleteConfirmation: (chart: Chart) =>
      this.dispatch(new ShowDeleteChartConfirmationInChartMenuAction(stateNamespace, chart)),

    hideConfirmation: (chart: Chart) =>
      this.dispatch(new HideChartMenuClearOrDeleteConfirmationAction(stateNamespace, chart)),

    allowMenuToBeOpened: (chart: Chart) => this.dispatch(new AllowChartMenuToBeOpenedAction(stateNamespace, chart))
  });
}

export const controller = new ChartMenuController(store.dispatch);
export type ActionDispatchers = ReturnType<typeof controller.getActionDispatchers>;
