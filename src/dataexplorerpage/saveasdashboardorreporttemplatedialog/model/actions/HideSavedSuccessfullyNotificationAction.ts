import type { SaveAsDashboardOrReportTemplateDialogState } from '../state/SaveAsDashboardOrReportTemplateDialogState';
import AbstractSaveAsDashboardOrReportTemplateDialogAction from './AbstractSaveAsDashboardOrReportTemplateDialogAction';

export default class HideSavedSuccessfullyNotificationAction extends AbstractSaveAsDashboardOrReportTemplateDialogAction {
  performActionAndReturnNewState(
    currentState: SaveAsDashboardOrReportTemplateDialogState
  ): SaveAsDashboardOrReportTemplateDialogState {
    const newState = {
      ...currentState,
      shouldShowSavedSuccessfullyNotification: false
    };

    return newState;
  }
}
