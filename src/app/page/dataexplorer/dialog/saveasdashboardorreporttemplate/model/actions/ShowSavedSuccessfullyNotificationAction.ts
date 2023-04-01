import type { SaveAsDashboardOrReportTemplateDialogState } from '../state/SaveAsDashboardOrReportTemplateDialogState';
import AbstractSaveAsDashboardOrReportTemplateDialogAction from './AbstractSaveAsDashboardOrReportTemplateDialogAction';
import HideSavedSuccessfullyNotificationAction from './HideSavedSuccessfullyNotificationAction';

export default class ShowSavedSuccessfullyNotificationAction extends AbstractSaveAsDashboardOrReportTemplateDialogAction {
  perform(currentState: SaveAsDashboardOrReportTemplateDialogState): SaveAsDashboardOrReportTemplateDialogState {
    setTimeout(() => this.dispatch(new HideSavedSuccessfullyNotificationAction()), 4500);

    return {
      ...currentState,
      shouldShowSavedSuccessfullyNotification: true
    };
  }
}
