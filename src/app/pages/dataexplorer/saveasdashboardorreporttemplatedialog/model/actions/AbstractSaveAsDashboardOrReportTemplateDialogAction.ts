import { AbstractAction } from 'oo-redux-utils2';
import type { SaveAsDashboardOrReportTemplateDialogState } from '../state/SaveAsDashboardOrReportTemplateDialogState';

export default class AbstractSaveAsDashboardOrReportTemplateDialogAction extends AbstractAction<SaveAsDashboardOrReportTemplateDialogState> {
  constructor() {
    super('');
  }
}
