import type { SaveAsDashboardOrReportTemplateDialogState } from '../state/SaveAsDashboardOrReportTemplateDialogState';
import AbstractSaveAsDashboardOrReportTemplateDialogAction from './AbstractSaveAsDashboardOrReportTemplateDialogAction';

export default class CloseSaveAsDashboardOrReportTemplateDialogAction extends AbstractSaveAsDashboardOrReportTemplateDialogAction {
  performActionAndReturnNewState(
    currentState: SaveAsDashboardOrReportTemplateDialogState
  ): SaveAsDashboardOrReportTemplateDialogState {
    const newState = {
      ...currentState,
      isOpen: false
    };

    return newState;
  }
}
