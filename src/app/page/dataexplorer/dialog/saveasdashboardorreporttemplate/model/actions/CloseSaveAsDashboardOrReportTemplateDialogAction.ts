import type { SaveAsDashboardOrReportTemplateDialogState } from '../state/SaveAsDashboardOrReportTemplateDialogState';
import AbstractSaveAsDashboardOrReportTemplateDialogAction from './AbstractSaveAsDashboardOrReportTemplateDialogAction';

export default class CloseSaveAsDashboardOrReportTemplateDialogAction extends AbstractSaveAsDashboardOrReportTemplateDialogAction {
  perform(currentState: SaveAsDashboardOrReportTemplateDialogState): SaveAsDashboardOrReportTemplateDialogState {
    const newState = {
      ...currentState,
      isOpen: false
    };

    return newState;
  }
}
