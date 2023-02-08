import OOReduxUtils from 'oo-redux-utils2';
import type { SaveAsDashboardOrReportTemplateDialogState } from './SaveAsDashboardOrReportTemplateDialogState';
import AbstractSaveAsDashboardOrReportTemplateDialogAction from '../actions/AbstractSaveAsDashboardOrReportTemplateDialogAction';

const initialSaveAsDashboardOrReportTemplateDialogState: SaveAsDashboardOrReportTemplateDialogState = {
  isOpen: false,
  shouldShowSavedSuccessfullyNotification: false
};

export default OOReduxUtils.createStateReducer<SaveAsDashboardOrReportTemplateDialogState>(
  initialSaveAsDashboardOrReportTemplateDialogState,
  AbstractSaveAsDashboardOrReportTemplateDialogAction
);
