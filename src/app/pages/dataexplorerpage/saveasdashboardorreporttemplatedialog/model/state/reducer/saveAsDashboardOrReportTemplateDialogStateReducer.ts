import OOReduxUtils from 'oo-redux-utils';
import type { SaveAsDashboardOrReportTemplateDialogState } from '../SaveAsDashboardOrReportTemplateDialogState';
import AbstractSaveAsDashboardOrReportTemplateDialogAction from '../../actions/AbstractSaveAsDashboardOrReportTemplateDialogAction';
import AbstractSaveAsDashboardOrReportTemplateDialogDispatchingAction from '../../actions/AbstractSaveAsDashboardOrReportTemplateDialogDispatchingAction';

const initialSaveAsDashboardOrReportTemplateDialogState: SaveAsDashboardOrReportTemplateDialogState = {
  isOpen: false,
  shouldShowSavedSuccessfullyNotification: false
};

export default OOReduxUtils.createStateReducer<SaveAsDashboardOrReportTemplateDialogState>(
  initialSaveAsDashboardOrReportTemplateDialogState,
  [AbstractSaveAsDashboardOrReportTemplateDialogAction, AbstractSaveAsDashboardOrReportTemplateDialogDispatchingAction]
);
