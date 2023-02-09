import { AbstractDispatchingAction, createActionDispatcher } from 'oo-redux-utils2';
import type { SaveAsDashboardOrReportTemplateDialogState } from '../state/SaveAsDashboardOrReportTemplateDialogState';
import store from '../../../../../../store/store';

export default abstract class AbstractSaveAsDashboardOrReportTemplateDialogAction extends AbstractDispatchingAction<SaveAsDashboardOrReportTemplateDialogState> {
  constructor() {
    super('', createActionDispatcher(store.dispatch));
  }
}
