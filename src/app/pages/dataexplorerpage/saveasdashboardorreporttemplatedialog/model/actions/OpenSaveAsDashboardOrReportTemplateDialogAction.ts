import type { SaveAsDashboardOrReportTemplateDialogState } from '../state/SaveAsDashboardOrReportTemplateDialogState';
import AbstractSaveAsDashboardOrReportTemplateDialogAction from './AbstractSaveAsDashboardOrReportTemplateDialogAction';

export default class OpenSaveAsDashboardOrReportTemplateDialogAction extends AbstractSaveAsDashboardOrReportTemplateDialogAction {
  performActionAndReturnNewState(
    currentState: SaveAsDashboardOrReportTemplateDialogState
  ): SaveAsDashboardOrReportTemplateDialogState {
    const newState = {
      ...currentState,
      isOpen: true
    };

    return newState;
  }
}
