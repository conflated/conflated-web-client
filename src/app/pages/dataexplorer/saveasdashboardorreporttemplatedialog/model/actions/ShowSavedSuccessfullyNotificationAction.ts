import type { SaveAsDashboardOrReportTemplateDialogState } from '../state/SaveAsDashboardOrReportTemplateDialogState';
import AbstractSaveAsDashboardOrReportTemplateDialogAction from './AbstractSaveAsDashboardOrReportTemplateDialogAction';

export default class ShowSavedSuccessfullyNotificationAction extends AbstractSaveAsDashboardOrReportTemplateDialogAction {
  perform(currentState: SaveAsDashboardOrReportTemplateDialogState): SaveAsDashboardOrReportTemplateDialogState {
    const newState = {
      ...currentState,
      shouldShowSavedSuccessfullyNotification: true
    };

    return newState;
  }
}
