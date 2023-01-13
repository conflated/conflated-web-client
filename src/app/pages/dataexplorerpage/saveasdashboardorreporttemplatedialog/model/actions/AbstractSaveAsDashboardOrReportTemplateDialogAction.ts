import { AbstractAction } from 'oo-redux-utils';
import type { SaveAsDashboardOrReportTemplateDialogState } from '../state/SaveAsDashboardOrReportTemplateDialogState';

export default class AbstractSaveAsDashboardOrReportTemplateDialogAction extends AbstractAction<SaveAsDashboardOrReportTemplateDialogState> {
  constructor() {
    super('');
  }
}
