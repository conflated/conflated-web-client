import { Controller } from 'oo-redux-utils2';
import type { ChartAreaPageStateNamespace } from '../../../model/state/types/ChartAreaPageStateNamespace';
import type { Chart } from '../../model/state/Chart';
import OpenChartExportMenuAction from '../../../model/actions/chart/menu/export/OpenChartExportMenuAction';
import UpdateChartExportMenuCloseTimeoutIdAction from '../../../model/actions/chart/menu/export/UpdateChartExportMenuCloseTimeoutIdAction';
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
import { OwnProps } from '../view/ChartMenuView';

class ChartMenuController extends Controller<ChartAreaPageStateNamespace> {
  getActionDispatchers = (_: unknown, { pageStateNamespace }: OwnProps) => ({
    openChartExportMenu: (chart: Chart) => this.dispatch(new OpenChartExportMenuAction(pageStateNamespace, chart)),
    closeChartExportMenu: (chart: Chart) => this.dispatch(new CloseChartExportMenuAction(pageStateNamespace, chart)),
    copyChart: (chart: Chart) => this.dispatch(new CopyChartAction(pageStateNamespace, chart)),
    pasteChart: (chart: Chart) => this.dispatch(new PasteChartAction(pageStateNamespace, chart)),
    clearChart: (chart: Chart) => this.dispatch(new ClearChartAction(pageStateNamespace, chart)),
    clearOrRemoveChart: (chart: Chart) => this.dispatch(new ClearOrRemoveChartAction(pageStateNamespace, chart)),

    updateChartExportMenuCloseTimeoutId: (chart: Chart, timeoutID: ReturnType<typeof setTimeout>) =>
      this.dispatch(new UpdateChartExportMenuCloseTimeoutIdAction(pageStateNamespace, chart, timeoutID)),

    showClearChartConfirmationInChartMenu: (chart: Chart) =>
      this.dispatch(new ShowClearChartConfirmationInChartMenuAction(pageStateNamespace, chart)),

    showDeleteChartConfirmationInChartMenu: (chart: Chart) =>
      this.dispatch(new ShowDeleteChartConfirmationInChartMenuAction(pageStateNamespace, chart)),

    hideChartMenuActionConfirmation: (chart: Chart) =>
      this.dispatch(new HideChartMenuClearOrDeleteConfirmationAction(pageStateNamespace, chart)),

    allowChartMenuToBeOpened: (chart: Chart) =>
      this.dispatch(new AllowChartMenuToBeOpenedAction(pageStateNamespace, chart))
  });
}

export const controller = new ChartMenuController(store.dispatch);
export type ActionDispatchers = ReturnType<typeof controller.getActionDispatchers>;
