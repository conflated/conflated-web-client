import type { DispatchAction } from 'oo-redux-utils2';
import { AbstractDispatchingAction } from 'oo-redux-utils2';
import type { SaveAsDashboardOrReportTemplateDialogState } from '../state/SaveAsDashboardOrReportTemplateDialogState';

export default class AbstractSaveAsDashboardOrReportTemplateDialogDispatchingAction extends AbstractDispatchingAction<SaveAsDashboardOrReportTemplateDialogState> {
  constructor(dispatchAction: DispatchAction) {
    super('', dispatchAction);
  }
}
