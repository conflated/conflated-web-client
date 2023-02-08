import { AbstractDispatchingAction } from 'oo-redux-utils2';
import type { SaveAsDashboardOrReportTemplateDialogState } from '../state/SaveAsDashboardOrReportTemplateDialogState';
import dispatch from '../../../../../../store/dispatch';

export default abstract class AbstractSaveAsDashboardOrReportTemplateDialogAction extends AbstractDispatchingAction<SaveAsDashboardOrReportTemplateDialogState> {
  constructor() {
    super('', dispatch);
  }
}
