import { Controller } from 'oo-redux-utils2';
import type { ChartAreaPageStateNamespace } from '../../model/state/types/ChartAreaPageStateNamespace';
import type { Chart } from '../model/state/Chart';
import OpenChartExportMenuAction from '../../model/actions/chart/menu/export/OpenChartExportMenuAction';
import UpdateChartExportMenuCloseTimeoutIdAction from '../../model/actions/chart/menu/export/UpdateChartExportMenuCloseTimeoutIdAction';
import CloseChartExportMenuAction from '../../model/actions/chart/menu/export/CloseChartExportMenuAction';
import CopyChartAction from '../../model/actions/chart/copypaste/CopyChartAction';
import PasteChartAction from '../../model/actions/chart/copypaste/PasteChartAction';
import ClearChartAction from '../../model/actions/chart/ClearChartAction';
import ShowClearChartConfirmationInChartMenuAction from '../../model/actions/chart/menu/confirm/ShowClearChartConfirmationInChartMenuAction';
import ShowDeleteChartConfirmationInChartMenuAction from '../../model/actions/chart/menu/confirm/ShowDeleteChartConfirmationInChartMenuAction';
import ClearOrRemoveChartAction from '../../model/actions/chart/ClearOrRemoveChartAction';
import HideChartMenuClearOrDeleteConfirmationAction from '../../model/actions/chart/menu/confirm/HideChartMenuClearOrDeleteConfirmationAction';
import AllowChartMenuToBeOpenedAction from '../../model/actions/chart/menu/AllowChartMenuToBeOpenedAction';
import store from '../../../../../../store/store';

class ChartMenuController extends Controller<ChartAreaPageStateNamespace> {
  getActionDispatchers(stateNamespace: ChartAreaPageStateNamespace) {
    return {
      openChartExportMenu: (chart: Chart) => this.dispatch(new OpenChartExportMenuAction(stateNamespace, chart)),
      closeChartExportMenu: (chart: Chart) => this.dispatch(new CloseChartExportMenuAction(stateNamespace, chart)),
      copyChart: (chart: Chart) => this.dispatch(new CopyChartAction(stateNamespace, chart)),
      pasteChart: (chart: Chart) => this.dispatch(new PasteChartAction(stateNamespace, chart)),
      clearChart: (chart: Chart) => this.dispatch(new ClearChartAction(stateNamespace, chart)),
      clearOrRemoveChart: (chart: Chart) => this.dispatch(new ClearOrRemoveChartAction(stateNamespace, chart)),

      updateChartExportMenuCloseTimeoutId: (chart: Chart, timeoutID: ReturnType<typeof setTimeout>) =>
        this.dispatch(new UpdateChartExportMenuCloseTimeoutIdAction(stateNamespace, chart, timeoutID)),

      showClearChartConfirmationInChartMenu: (chart: Chart) =>
        this.dispatch(new ShowClearChartConfirmationInChartMenuAction(stateNamespace, chart)),

      showDeleteChartConfirmationInChartMenu: (chart: Chart) =>
        this.dispatch(new ShowDeleteChartConfirmationInChartMenuAction(stateNamespace, chart)),

      hideChartMenuActionConfirmation: (chart: Chart) =>
        this.dispatch(new HideChartMenuClearOrDeleteConfirmationAction(stateNamespace, chart)),

      allowChartMenuToBeOpened: (chart: Chart) =>
        this.dispatch(new AllowChartMenuToBeOpenedAction(stateNamespace, chart))
    };
  }
}

export const controller = new ChartMenuController(store.dispatch);
export type ActionDispatchers = ReturnType<typeof controller.getActionDispatchers>;
