import { NamespacedControllerFactory } from 'oo-redux-utils';
import type { ChartAreaPageStateNamespace } from '../../../model/state/namespace/ChartAreaPageStateNamespace';
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

export default class ChartMenuControllerFactory extends NamespacedControllerFactory<ChartAreaPageStateNamespace> {
  openChartExportMenu(chart: Chart) {
    this.dispatchAction(new OpenChartExportMenuAction(this.stateNamespace, chart));
  }

  updateChartExportMenuCloseTimeoutId(chart: Chart, timeoutID: ReturnType<typeof setTimeout>) {
    this.dispatchAction(new UpdateChartExportMenuCloseTimeoutIdAction(this.stateNamespace, chart, timeoutID));
  }

  closeChartExportMenu(chart: Chart) {
    this.dispatchAction(new CloseChartExportMenuAction(this.stateNamespace, chart));
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

  showClearChartConfirmationInChartMenu(chart: Chart) {
    this.dispatchAction(new ShowClearChartConfirmationInChartMenuAction(this.stateNamespace, chart));
  }

  showDeleteChartConfirmationInChartMenu(chart: Chart) {
    this.dispatchAction(new ShowDeleteChartConfirmationInChartMenuAction(this.stateNamespace, chart));
  }

  clearOrRemoveChart(chart: Chart) {
    this.dispatchAction(new ClearOrRemoveChartAction(this.stateNamespace, chart));
  }

  hideChartMenuActionConfirmation(chart: Chart) {
    this.dispatchAction(new HideChartMenuClearOrDeleteConfirmationAction(this.stateNamespace, chart));
  }

  allowChartMenuToBeOpened(chart: Chart) {
    this.dispatchAction(new AllowChartMenuToBeOpenedAction(this.stateNamespace, chart));
  }

  createController() {
    return {
      openChartExportMenu: this.openChartExportMenu,
      updateChartExportMenuCloseTimeoutId: this.updateChartExportMenuCloseTimeoutId,
      closeChartExportMenu: this.closeChartExportMenu,
      copyChart: this.copyChart,
      pasteChart: this.pasteChart,
      clearChart: this.clearChart,
      showClearChartConfirmationInChartMenu: this.showClearChartConfirmationInChartMenu,
      showDeleteChartConfirmationInChartMenu: this.showDeleteChartConfirmationInChartMenu,
      clearOrRemoveChart: this.clearOrRemoveChart,
      hideChartMenuActionConfirmation: this.hideChartMenuActionConfirmation,
      allowChartMenuToBeOpened: this.allowChartMenuToBeOpened
    };
  }
}
